<template>
  <q-layout view="hhr lpr fFr">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Walletudo - pwa
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
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
      <q-separator  />
      <q-list>


        <AccountLink
          v-for="account in accounts"
          :key="account.id"
          v-bind="account"
        />
      </q-list>
      <q-separator  />

      <q-item
        clickable
      >
        <q-item-section
          avatar
        >
          <q-icon name="add" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Add a new account</q-item-label>
        </q-item-section>
      </q-item>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink from "components/EssentialLink.vue";
import AccountLink from "components/AccountLink.vue";

defineOptions({
  name: 'MainLayout'
});

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
    link: '/balance'
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
const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
