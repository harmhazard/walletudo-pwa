import { defineStore } from 'pinia'
import {connect, StringCodec} from "nats.ws";
import { JSONRPCClient } from "json-rpc-2.0";

export const newNatsStore = defineStore('nats', {
  state: () => ({
    url: '',
    user: '',
    password: '',
    connection: null,
  }),
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
    async rpcRequest(method, params) {
      if(this.connection == null) {
        return
      }

      const sc = StringCodec()
      const rpcClient = new JSONRPCClient(async (jsonRPCRequest) =>{
        let reqData = JSON.stringify(jsonRPCRequest)
        console.log("request", reqData)
        // TODO: try catch!
        let resp = await this.connection.request("wallets.demo1.rpc", sc.encode(reqData))
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
    }
  }
})
