<template>
  <q-page class="items-center justify-evenly col">
    <div class="q-gutter-y-md column col-auto" style="max-width: 600px; margin:auto;">
      <q-input filled v-model="url" label="URL" class="" />
      <q-input filled v-model="user" label="User" class="" />
      <q-input filled v-model="password" label="Password" class="" type="password" />

      <div>
        <q-btn push color="primary" label="Connect" @click="connectFn"/>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import {ref} from 'vue'
import {NatsError} from "nats.ws"
import {newNatsStore} from "stores/natsStore"

const natsStore = newNatsStore()
const url = ref(natsStore.getCredentials.url)
const user = ref(natsStore.getCredentials.user)
const password = ref(natsStore.getCredentials.password)

async function connectFn(){
  try {
    await natsStore.connect(url, user, password)
  } catch(NatsError) {
    console.log("error connecting to nats server")
    return
  }
  console.log("connected!")
}

defineOptions({
  name: 'ConnectPage'
});
</script>
