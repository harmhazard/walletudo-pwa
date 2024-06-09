<template>
  <q-page class=" items-center justify-evenly q-mx-lg">
    <q-card class="col">
      <q-card-section horizontal border class="justify-between q-mx-sm-auto">
        <q-card-section class="q-pt-xs" >
          <div class="text-overline">Available Balance</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{unlockedBalance}} XMR</div>
          <!--<div class="text-caption text-grey">
            $40
          </div>-->
          <div class="text-overline">Total Balance</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ balance }} XMR</div>
          <!--<div class="text-caption text-grey">
            $50
          </div>-->
        </q-card-section>

        <q-card-section class="col-5 flex flex-center float-right">
          <q-img
            class="rounded-bordersq-ma-xs"
            src="../assets/monero-icon.png"
            style="width: 160px"
          />
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-list v-for="transaction in transactions" bordered
            :key="transaction.id">
      <q-expansion-item
        :icon="icons[transaction.state]"
        :header-class="colors[transaction.state]"
        :label="transaction.amount + ' XMR'"
        :caption = "transactionStatesInverted[transaction.state]"
      >
        <q-card>
          <q-card-section>
            <q-item class="text-subtitle2">
              <q-icon name="tag"></q-icon>
              TransactionID: {{ transaction.id }}
            </q-item>
            <q-item class="text-subtitle2">
              <q-icon name="calendar_month"></q-icon>
              Datetime: {{ transaction.date }}
            </q-item>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>


  </q-page>

  <q-dialog v-model="alert" persistent class="q-px-xl">
    <q-card class="q-px-lg">
      <q-card-section>
        <div class="text-h6">Create a new wallet</div>
      </q-card-section>
      <q-input filled v-model="walletName" label="Wallet name" />



      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Create" color="primary" v-close-popup @click="createWallet()" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script setup lang="ts">

import {onMounted, ref, watch} from 'vue';
import {newNatsStore} from "stores/natsStore";
import {StringCodec} from "nats.ws";



  const store = newNatsStore ();
  const sc = StringCodec();

onMounted(() => {
  loadBalance();
  loadTransactions();
});

defineOptions({
  name: 'BalancePage'
});
const walletName = ref('');
const alert = ref(false);
const balance = ref('');
const unlockedBalance = ref('');

function createWallet(){
  wallets.value.push({
    address: 'aa',
    balance: '0 XMR',
    name: walletName.value,
    id:10
  });
  text.value = '';
}
const transactions = ref([])
const transactionStates = {'incoming': 0, 'outgoing':1, 'pending':2, 'failed':3};
const transactionStatesInverted = ['incoming', 'outgoing', 'pending', 'failed'];
const icons = ['arrow_downward', 'arrow_upward', 'remove', 'remove'];
const colors = ['text-positive', 'text-negative', 'text-grey-9', 'text-grey-9'];

function convertUnixTimestampToDateTime(timestamp) {
  // Create a new Date object by multiplying the timestamp by 1000 to convert seconds to milliseconds
  const date = new Date(timestamp * 1000);

  // Extract the date and time components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Construct the datetime string
  const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return dateTimeString;
}

function createTransaction(transaction, state){
  return {
    id: transaction.txid,
    amount: (transaction.amount / 1000000000000).toFixed(12),
    date: convertUnixTimestampToDateTime(transaction.timestamp),//from timestamp
    state: state,
    timestamp: transaction.timestamp
  };
}
function loadBalance(){
  store.walletRpcRequest("wallet.account.getBalance", {"accountID":store.account}).then((m) => {
    balance.value = (m.balance / 1000000000000).toFixed(12);
    unlockedBalance.value = (m.unlocked_balance / 1000000000000).toFixed(12);
  });
}
function loadTransactions(){
  store.walletRpcRequest("wallet.account.listTransactions", {"accountID":store.account}).then((m) => {
    transactions.value = [];
    m.incoming.forEach((transaction) => {
      transactions.value.push(createTransaction(transaction, transactionStates.incoming));
    });
    m.outgoing.forEach((transaction) => {
      transactions.value.push(createTransaction(transaction, transactionStates.outgoing));
    });
    m.pending.forEach((transaction) => {
      transactions.value.push(createTransaction(transaction, transactionStates.pending));
    });
    m.failed.forEach((transaction) => {
      transactions.value.push(createTransaction(transaction, transactionStates.failed));
    });
    transactions.value.sort((a, b) => b.timestamp - a.timestamp);
    //console.log(transactions.value)
  });
}
setInterval(() => {
  loadBalance();
  loadTransactions();
}, 4000);
watch(
  () => store.broadcastUpdateCounter,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      // Code to update elements
         console.log('Update elements triggered');
      loadBalance();
      loadTransactions();
    }
  }
);


</script>
