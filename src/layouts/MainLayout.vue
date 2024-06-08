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

    <DrawerMenu :leftDrawerOpen="leftDrawerOpen" @toggleDrawer="toggleLeftDrawer"/>
    <q-footer>
      <q-tabs
      >
        <q-route-tab to='/receive' name="receive" icon="file_download" label="Receive" />
        <q-route-tab to='/' name="balance" icon="account_balance_wallet" label="Balance" />
        <q-route-tab to='/send' name="send" icon="file_upload" label="Send" />
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
import DrawerMenu from "components/DrawerMenu.vue";

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
