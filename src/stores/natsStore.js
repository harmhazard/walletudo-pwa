import { defineStore } from 'pinia'
import {connect} from "nats.ws";

export const newNatsStore = defineStore('nats', {
  state: () => ({
    url: '',
    user: '',
    password: '',
    connection: null
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
    }
  }
})
