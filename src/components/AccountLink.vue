<template>
  <q-item
    clickable
    :active = "props.active"
  >
    <q-item-section
      avatar
    >
      <q-icon name="account_balance_wallet" />
    </q-item-section>

    <q-item-section>
      <q-item-label overline>{{ props.balance }}</q-item-label>
      <q-item-label>{{ props.name }}</q-item-label>
      <q-item-label caption>{{ props.address }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
defineOptions({
  name: 'EssentialLink'
})

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  active:{
    type: Boolean,
    default: false
  },

  address: {
    type: String,
    default: ''
  },

  link: {
    type: String,
    default: '#'
  },
  balance: {
    type: String,
    default: ''
  }
})
</script>
