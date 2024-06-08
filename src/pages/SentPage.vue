<template>
  <q-page class=" items-center justify-evenly ">
    <div class="q-gutter-y-md column col-auto" style="max-width: 600px; margin:auto;">

    <q-input filled v-model="text" label="Send to" class="" />

      <q-input
        filled
        v-model="amount"
        label="Amount"
        input-class="text-right"
        style="max-width: 200px"
        class="col"
        :rules="[ val => isValidAmount(val) || 'Enter a valid value' ]"
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
const text = ref('');
const amount = ref('0.0')

function isValidAmount(str) {
  const floatRegex = /^(?:\d+(\.\d{1,12})?|\.\d{1,12})$/;
  return floatRegex.test(str);
}

</script>
