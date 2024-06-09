<template>
  <q-expansion-item
    clickable
    :active = "props.active"
  class="q-mt-sm"
  :label="props.subject"
  icon="account_balance_wallet"
  >

    <q-item v-for="account in props.accounts" to="dashboard" :key="account.id" clickable  dense  @click="switchAccount(props.subject, account.id)">
      <q-item-section class="q-ml-xl">
        <q-item-label overline>{{ (account.balance / 1000000000000).toFixed(12) }} XMR</q-item-label>
        <q-item-label>{{ account.label }}</q-item-label>
      </q-item-section>
    </q-item>

  </q-expansion-item>

</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";
import {newNatsStore} from "stores/natsStore";

defineOptions({
  name: 'EssentialLink'
})
const props = defineProps({
  subject: {
    type:String,
    required: true
  },
  accounts: {
    type: Array,
    required: false,
    default: () => []
  }
});
const router = useRouter()
const store = newNatsStore()
const emit = defineEmits(['toggleDrawer']);

function switchAccount(wallet, account){
  store.setAccount(wallet, account)
  router.push('/')
  store.broadcastUpdate();
  emit('toggleDrawer');
}

</script>
