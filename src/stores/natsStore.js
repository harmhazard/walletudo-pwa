import { defineStore } from 'pinia'
import {connect, StringCodec} from "nats.ws";
import { JSONRPCClient } from "json-rpc-2.0";

export const newNatsStore = defineStore('nats', {
  state: () => {
    return {
      url: '',
      user: '',
      password: '',
      subject: '',
      account: null,
      connection: null,
    }
  },
  getters: {
    getCredentials: (state)=>{
      return {
        url: state.url,
        user: state.user,
        password: state.password,
      }
    },
    getConnection: (state)=>{
      return state.connection
    },
  },
  actions: {
    async connect(url, user, password){
      this.url = url
      this.user = user
      this.password = password
      this.connection = await connect({
        servers: [this.url],
        user: this.user,
        pass: this.password,
        timeout: 10000,
        // TODO: reconnect
      });
    },
    setAccount(subject, account){
      this.subject = subject
      this.account = account
    },

    async walletRpcRequest(method, params) {
      return this.rpcRequest(this.subject, method, params)
    },

    async rpcRequest(subject, method, params) {
      if(this.connection == null) {
        return
      }

      const sc = StringCodec()
      const rpcClient = new JSONRPCClient(async (jsonRPCRequest) =>{
        let reqData = JSON.stringify(jsonRPCRequest)
        console.log("request", reqData)
        // TODO: try catch!
        let resp = await this.connection.request(subject, sc.encode(reqData))
        let respData = sc.decode(resp.data)
        console.log("response", respData)
        rpcClient.receive(JSON.parse(respData))
      })

      let resp = null
      try {
        resp = await rpcClient.request(method, params, {})
      } catch(err) {
        console.log("rpc request failed", err)
      }
      return resp
    },

    async rpcDiscover() {
      if(this.connection == null) {
        return new Promise((resolve, reject)=>{
          reject("connection not ready")
        })
      }
      const sc = StringCodec()
      let msgs = await this.connection.requestMany("wallets.discover", sc.encode(""), {
        maxWait: 4000,
        strategy: "sentinelMsg"
      })
      let subjects = []
      for await (const msg of msgs) {
        const subject = sc.decode(msg.data)
        console.log("rpc subject", subject)
        subjects.push(subject)
      }
      return subjects
    }
  }
})
