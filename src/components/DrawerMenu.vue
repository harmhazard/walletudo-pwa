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

defineOptions({
  name: 'DrawerMenu'
})
const selectedWallet = ref('')
var accountName = ref('');
var newAccount = ref(false);

const walletSubjects = computed(() =>
  wallets.value.map(wallet => ({ label: wallet.subject, value: wallet.subject }))
);
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
    link: '/connect'
  }
];
const wallets = ref([
  {
    subject: 'wallet1',
    accounts:[
      {
        address: '4AxM ... Ev7Z',
        balance: '5 XMR',
        name: 'Main Account',
        id: 1,
        active: true
      },
      {
        address: '4AxM ... Ev7Z',
        balance: '5 XMR',
        name: 'Side Account',
        id: 2
      }
    ]
  },
  {
    subject: 'wallet2',
    accounts:[
      {
        address: '4AxM ... Ev7Z',
        balance: '5 XMR',
        name: 'Main Account',
        id: 1,
        active: true
      },
      {
        address: '4AxM ... Ev7Z',
        balance: '5 XMR',
        name: 'Side Account',
        id: 2
      }
    ]
  },
  {
    subject: 'wallet3',
    accounts:[
      {
        address: '4AxM ... Ev7Z',
        balance: '5 XMR',
        name: 'Main Account',
        id: 1,
        active: true
      },
      {
        address: '4AxM ... Ev7Z',
        balance: '5 XMR',
        name: 'Side Account',
        id: 2
      }
    ]
  },
  {
    subject: 'wallet4',
    accounts:[
      {
        address: '4AxM ... Ev7Z',
        balance: '5 XMR',
        name: 'Main Account',
        id: 1,
        active: true
      },
      {
        address: '4AxM ... Ev7Z',
        balance: '5 XMR',
        name: 'Side Account',
        id: 2
      }
    ]
  },
  {
    subject: 'wallet5',
    accounts:[
      {
        address: '4AxM ... Ev7Z',
        balance: '5 XMR',
        name: 'Main Account',
        id: 1,
        active: true
      },
      {
        address: '4AxM ... Ev7Z',
        balance: '5 XMR',
        name: 'Side Account',
        id: 2
      }
    ]
  },
  {
    subject: 'wallet6',
    accounts:[
      {
        address: '4AxM ... Ev7Z',
        balance: '5 XMR',
        name: 'Main Account',
        id: 1,
        active: true
      },
      {
        address: '4AxM ... Ev7Z',
        balance: '5 XMR',
        name: 'Side Account',
        id: 2
      }
    ]
  }
])
</script>
<style scoped>

</style>
