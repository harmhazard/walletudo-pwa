<template>
  <q-page class="items-center justify-evenly q-pt-lg">
    <q-list bordered separator v-for="address in addresses" :key="address.fullAddress" class="q-mx-lg col" >
      <q-item clickable v-ripple @click="copyAddress(address.fullAddress)" >
        <q-item-section>
          <q-item-label overline>{{ address.description}}</q-item-label>
          <q-item-label>{{ address.shortAddress}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-btn
      round
      dense
      color="primary"
      size="xl"
      icon="add"
      style="bottom: 80px; left: 10px; position: fixed;"
      @click = "alert=true"
    />
  </q-page>

  <q-dialog v-model="alert" persistent class="q-px-xl">
    <q-card class="q-px-lg">
      <q-card-section>
        <div class="text-h6">Create a new wallet</div>
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
import { ref } from 'vue';
import {copyToClipboard, Notify} from 'quasar'



defineOptions({
  name: 'IndexPage'
});
function createAddress(){
  addresses.value.push({
    fullAddress: text.value,
    shortAddress: text.value.slice(0,3) + ' ... ' + text.value.slice(-3),
    description: text.value
  });
  text.value = '';
}
function copyAddress(fullAddr) {
  copyToClipboard(fullAddr)
    .then(() => {
      Notify.create('Address copied to clipboard!');
    })
    .catch(() => {
      Notify.create('Failed to copy address!');
    });
}
const addresses = ref([
  {
    fullAddress: 'fdkjlsafjdsasldkfafljdls',
    shortAddress: 'fdk ... dls',
    description: 'Vexl'
  },
  {
    fullAddress: 'fdkjlsafjdsasldkfafljdls',
    shortAddress: 'fdk ... dls',
    description: 'KYC'
  },
  {
    fullAddress: 'fdkjlsafjdsasldkfafljdls',
    shortAddress: 'fdk ... dls',
    description: 'Vexl'
  },
  {
    fullAddress: 'fdkjlsafjdsasldkfafljdls',
    shortAddress: 'fdk ... dls',
    description: 'KYC'
  },
  {
    fullAddress: 'fdkjlsafjdsasldkfafljdls',
    shortAddress: 'fdk ... dls',
    description: 'Vexl'
  },
  {
    fullAddress: 'fdkjlsafjdsasldkfafljdls',
    shortAddress: 'fdk ... dls',
    description: 'KYC'
  },
  {
    fullAddress: 'fdkjlsafjdsasldkfafljdls',
    shortAddress: 'fdk ... dls',
    description: 'Vexl'
  },
  {
    fullAddress: 'fdkjlsafjdsasldkfafljdls',
    shortAddress: 'fdk ... dls',
    description: 'KYC'
  },
  {
    fullAddress: 'fdkjlsafjdsasldkfafljdls',
    shortAddress: 'fdk ... dls',
    description: 'ATM'
  }
])
var text = ref('');
var alert = ref(false);


</script>
