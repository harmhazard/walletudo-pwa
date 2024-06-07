import { defineStore } from 'pinia'
import {connect, StringCodec} from "nats.ws";

export const natsStore = defineStore('nats', {
  state: () => ({
    initialized: false,
    user: '',
    password: '',
    url: '',
    subject: '',
    wallet: '',
    connection: null
  }),

  getters: {
    getCredentials: (state)=>{
      return {user:state.user, password:state.password, url:state.url, subject:state.subject, wallet:state.wallet}
    },
    getSubject: (state)=>{
      return state.subject
    },
    getWallet: (state)=>{
      return state.wallet
      },
    isInitialized: (state)=>{
      return state.initialized
    }
  },
  actions: {
    async connect(user, password, url, subject, wallet){
      this.user = user
      this.password = password
      this.url = url
      this.subject = subject
      this.wallet = wallet
      this.connection = await connect({servers: [this.url], user: this.user, pass: this.password, timeout: 10000 });
      this.initialized = true;
      const sc = StringCodec();

      this.connection.request(this.getSubject, sc.encode(`{"jsonrpc":"2.0","id":"${this.getWallet}","method":"wallet.listAccounts","params":{}}`), {timeout:10000}).then((m) => {
        console.log('connection initialized')
      })
      }
  }
})
