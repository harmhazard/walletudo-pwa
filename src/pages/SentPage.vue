<template>
  <q-page class=" items-center justify-evenly ">
    <div class="q-gutter-y-md column col-auto" style="max-width: 600px; margin:auto;">

    <q-input filled v-model="text" label="Sent to" class="" />
    <q-badge color="secondary">
      Priority:
    </q-badge>
    <q-slider v-model="standard" :min="0" :max="50"  class=""/>
    <div class="text-subtitle2">amount:</div>
    <q-input
      v-model.number="model"
      type="number"
      filled
      style="max-width: 200px"
      class="col"
    />
      <q-card-actions align="left"  class="q-pa-lg">
        <q-btn  label="Sent" color="primary"/>
      </q-card-actions>
    </div>

  </q-page>
</template>

<script setup lang="ts">

import {ref} from 'vue';

defineOptions({
  name: 'SentPage'
});
const text = ref('a');
const standard = ref(5);
const model = ref(10);

</script>
