<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script setup>
import {natsStore} from "stores/nats";

defineOptions({
  name: 'IndexPage'
});
const store = natsStore();

store.user = 'username'
console.log(store.user);
// store.setUser('test');
// console.log(store.getUser());


</script>
