<template>
  <q-drawer
    :model-value="props.leftDrawerOpen"
    bordered
  >
    <q-list>

      <EssentialLink
        v-for="link in linksList"
      :key="link.title"
      v-bind="link"
      />
    </q-list>
    <q-separator/>
    <q-list>


      <WalletLink
        v-for="wallet in wallets"
      :key="wallet.subject"
      v-bind="wallet"
        @toggleDrawer="emitToggleDrawer"
      />
    </q-list>
    <q-separator/>

    <q-item
      clickable
    >
      <q-item-section
        avatar
      >
        <q-icon name="add"/>
      </q-item-section>

      <q-item-section @click="openDialog">
        <q-item-label>Add a new account</q-item-label>
      </q-item-section>
    </q-item>

  </q-drawer>
  <q-dialog v-model="newAccount" persistent class="q-px-xl">
    <q-card class="q-px-lg">
      <q-card-section>
        <div class="text-h6">Create a new Account</div>
      </q-card-section>
      <q-card-section>
        <q-input filled v-model="accountName" label="Account name" />
      </q-card-section>
      <q-card-section>
        <q-select filled :options="walletSubjects" v-model="selectedWallet" label="Wallet"></q-select>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Create" color="primary" v-close-popup @click="createAccount()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>

import {computed, ref} from 'vue';
import EssentialLink from "components/EssentialLink.vue";
import WalletLink from "components/WalletLink.vue";
import {newNatsStore} from "stores/natsStore"

defineOptions({
  name: 'DrawerMenu'
})
const selectedWallet = ref('')
var accountName = ref('');
var newAccount = ref(false);
const natsStore = newNatsStore()

const walletSubjects = computed(() =>
  wallets.value.map(wallet => ({ label: wallet.subject, value: wallet.subject }))
);
const emit = defineEmits(['toggleDrawer']);

function emitToggleDrawer() {
  emit('toggleDrawer');
}
function openDialog(){
  newAccount.value = true;
}
function createAccount(){
  selectedWallet.value = '';
  accountName.value= '';
}

const props = defineProps({
  leftDrawerOpen: {
    type: Boolean,
    required: true
  }
})
const linksList = [
  {
    title: 'Manage server connection',
    // caption: 'Connect to walletudo server',
    icon: 'login',
    link: '/'
  }
];

const wallets = ref([])

function doServiceDiscovery() {
  natsStore.rpcDiscover().then(async (rpcSubjects)=>{
    console.log("SERVICE DISCOVERY STARTED")
    let discovered = []
    for (const subject of rpcSubjects) {
      const resp = await natsStore.rpcRequest(subject, "wallet.listAccounts", {})
      discovered.push({
        subject: subject,
        accounts: resp,
      })
    }
    console.log("SERVICE DISCOVERY ENDED", discovered)
    wallets.value = discovered
  }).catch((err)=>{
    console.log("SERVICE DISCOVERY ERROR", err)
  })
}

doServiceDiscovery()

setInterval(()=>{
  doServiceDiscovery()
}, 4000)

</script>
<style scoped>

</style>
