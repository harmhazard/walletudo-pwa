<template>
  <q-page class="items-center justify-evenly q-pt-lg">
    <q-list bordered separator v-for="address in addresses2" :key="address.fullAddress" class="q-mx-lg col" >
      <q-item clickable v-ripple @click="copyAddress(address.fullAddress)">
        <q-item-section avatar>
          <q-icon :name="address.used ? 'check' : 'remove'" />
        </q-item-section>
        <q-item-section>
          <q-item-label overline>{{ address.description}}</q-item-label>
          <q-item-label>{{ address.shortAddress}}</q-item-label>
          <q-item-label caption>{{address.used ? 'received' : ''}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-btn
      round
      dense
      color="primary"
      size="xl"
      icon="add"
      style="bottom: 80px; right: 10px; position: fixed;"
      @click = "alert=true"
    />
  </q-page>

  <q-dialog v-model="alert" persistent class="q-px-xl">
    <q-card class="q-px-lg">
      <q-card-section>
        <div class="text-h6">Create a new address</div>
      </q-card-section>
      <q-input filled v-model="text" label="Address description" />



      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Create" color="primary" v-close-popup @click="createAddress()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {copyToClipboard, Notify} from 'quasar'
import {newNatsStore} from "stores/natsStore";




defineOptions({
  name: 'IndexPage'
});

function copyAddress(fullAddr) {
  copyToClipboard(fullAddr)
    .then(() => {
      Notify.create('Address copied to clipboard!');
    })
    .catch(() => {
      Notify.create('Failed to copy address!');
    });
}
const addresses2 = ref([])
const store = newNatsStore ();
function getAddresses(){
  store.walletRpcRequest("wallet.account.listAddresses", {"accountID":1}).then((m) => {
    addresses2.value = [];
    m.forEach((address) => {
      addresses2.value.push({
        fullAddress: address.address,
        shortAddress: address.address.slice(0,3) + ' ... ' + address.address.slice(-3),
        description: address.label,
        used: address.used
      });
    });
  });
}
function createAddress(){

  store.walletRpcRequest("wallet.account.createAddress", {"accountID":1}).then((m) => {
    addresses2.value.push({
      fullAddress: m.address,
      shortAddress: m.address.slice(0,3) + ' ... ' + m.address.slice(-3),
      description: text.value,//todo add description to server
      used: false
    })
    text.value = '';
     });

  //getAddresses();
}

onMounted(() => {
  getAddresses();
});


var text = ref('');
var alert = ref(false);


</script>
