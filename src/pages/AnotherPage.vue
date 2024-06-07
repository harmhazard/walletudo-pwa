<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    <q-btn color="primary" label="Primary" to="/" />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import {useCounterStore} from "stores/nats"

let store = useCounterStore()

export default defineComponent({
  name: 'AnotherPage',
  mounted() {
    console.log("value is", store.doubleCount)
  }
});
</script>
