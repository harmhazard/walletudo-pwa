<template>
  <q-page class=" items-center justify-evenly ">
    <div class="q-gutter-y-md column col-auto" style="max-width: 600px; margin:auto;">

    <q-input filled v-model="text" label="Send to" class="" />

    <div class="text-subtitle2">amount:</div>
      <q-input
        filled
        v-model="amount"
        label="Amount"
        mask="#.############"
        fill-mask="0"
        reverse-fill-mask
        input-class="text-right"
        style="max-width: 200px"
        class="col"
      ></q-input>
      <q-btn  label="Send" color="primary" style="max-width: 100px"/>


    </div>

  </q-page>
</template>

<script setup lang="ts">

import {ref} from 'vue';

defineOptions({
  name: 'SentPage'
});
const text = ref('a');
const amount = ref('0.0')

</script>
