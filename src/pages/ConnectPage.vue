<template>
  <q-page class="items-center justify-evenly col">
    <div class="q-gutter-y-md column col-auto" style="max-width: 600px; margin:auto;">

      <q-input filled v-model="url" label="Url address" class="" />
      <q-input filled v-model="user" label="Login" class="" />
      <q-input filled v-model="subject" label="Subject" class="" />
      <q-input filled v-model="wallet" label="Wallet name" class="" />
      <q-input filled v-model="password" label="Password" class="" type="password" />
      <div>
        <q-btn push color="primary" label="Connect" @click="connectFn"/>
        <q-btn push color="primary" label="Disconnect" class='float-right' @click="disconnectFn"/>
      </div>
    </div>
  </q-page>
</template>

<script setup>


import {computed, ref} from 'vue';
import {natsStore} from "stores/natsStore";

defineOptions({
  name: 'ConnectPage'
});

const countStore = natsStore();
function connectFn(){
  countStore.connect(user, password, url, subject, wallet);
}

function disconnectFn() {
  console.log(countStore.getCredentials);
}
const url = ref('');
const user = ref('');
const subject = ref('');
const wallet = ref('');
const password = ref('');






</script>
