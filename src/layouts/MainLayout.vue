<template>
  <q-layout view="hhr lpr ffr">
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
    </q-drawer>
    <q-footer>
      <q-tabs
      >
        <q-route-tab to='/receive' name="receive" icon="file_download" label="Receive" />
        <q-route-tab to='/' name="balance" icon="account_balance_wallet" label="Balance" />
        <q-route-tab to='/transactions' name="transactions" icon="timeline" label="Transactions" />
        <q-route-tab to='/sent' name="sent" icon="file_upload" label="Sent" />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink from "components/EssentialLink.vue";

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

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
