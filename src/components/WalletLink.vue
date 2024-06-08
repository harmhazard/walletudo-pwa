<template>
  <q-item
    clickable
    :active = "props.active"
  class="q-mt-sm">
    <q-item-section
      avatar
    >
      <q-icon name="account_balance_wallet" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.subject }}</q-item-label>
    </q-item-section>


  </q-item>
  <q-item v-for="account in props.accounts" :key="account.id" clickable dense>

    <q-item-section class="q-ml-xl">
      <q-item-label overline>{{ account.balance }}</q-item-label>
      <q-item-label>{{ account.name }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
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

</script>
