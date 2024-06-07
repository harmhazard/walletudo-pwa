<template>
  <q-drawer
    :model-value="props.leftDrawerOpen"
    bordered
  >
    <q-list>
      <q-item-label
        header>
      </q-item-label>

      <EssentialLink
        v-for="link in linksList"
      :key="link.title"
      v-bind="link"
      />
    </q-list>
    <q-separator/>
    <q-list>


      <AccountLink
        v-for="account in accounts"
      :key="account.id"
      v-bind="account"
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
      <q-input filled v-model="accountName" label="Wallet name" />



      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Create" color="primary" v-close-popup @click="createAccount()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>

import { ref } from 'vue';
import EssentialLink from "components/EssentialLink.vue";
import AccountLink from "components/AccountLink.vue";

defineOptions({
  name: 'DrawerMenu'
})

var accountName = ref('');
var newAccount = ref(false);
function openDialog(){
  newAccount.value = true;
}
function createAccount(){
  accounts.value.push({
    address: 'aa',
    balance: '0 XMR',
    name: accountName.value,
    id:10
  });
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
  },
  {
    title: 'Dashboard',
    // caption: 'Disconnect from current server',
    icon: 'wallet',
    link: '/'
  }
];
const accounts = ref([
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
  },
  {
    address: '4AxM ... Ev7Z',
    balance: '5 XMR',
    name: 'Side Account 2',
    id: 3
  },
  {
    address: '4AxM ... Ev7Z',
    balance: '5 XMR',
    name: 'Main Account',
    id: 4
  },
  {
    address: '4AxM ... Ev7Z',
    balance: '5 XMR',
    name: 'Main Account',
    id: 5
  }
])

</script>
<style scoped>

</style>
