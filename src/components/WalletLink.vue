<template>
  <q-expansion-item
    clickable
    :active = "props.active"
  class="q-mt-sm"
  :label="props.subject"
  icon="account_balance_wallet"
  >

    <q-item v-for="account in props.accounts" :key="account.id" clickable  dense  @click="switchAccount(props.subject, account.id)">
      <q-item-section class="q-ml-xl">
        <q-item-label overline>{{ account.balance }}</q-item-label>
        <q-item-label>{{ account.name }}</q-item-label>
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

function switchAccount(wallet, account){
  store.setAccount(wallet, account)
  router.push('/')
}

</script>
