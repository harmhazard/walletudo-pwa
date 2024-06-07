<template>
  <q-page class=" items-center justify-evenly "  style="width: 100%;">
    <q-card class="col q-mx-lg"  >
      <q-card-section horizontal border class="justify-between q-mx-sm-auto">
        <q-card-section class="q-pt-xs" >
          <div class="text-overline">Available Balance</div>
          <div class="text-h5 q-mt-sm q-mb-xs">0.2 XMR</div>
          <div class="text-caption text-grey">
            $40
          </div>
          <div class="text-overline">Total Balance</div>
          <div class="text-h5 q-mt-sm q-mb-xs">0.25 XMR</div>
          <div class="text-caption text-grey">
            $50
          </div>
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

    <q-list           v-for="transaction in transactions" bordered
                      :key="transaction.id" class="q-mx-lg">
      <q-expansion-item
        :icon="transaction.incoming ? 'arrow_downward': 'arrow_upward'" :header-class=" transaction.incoming ? 'text-positive': 'text-negative'"
        :label="(transaction.incoming ? 'Received ' : 'Sent ') +  transaction.amount + 'XMR'"
        :caption = "transaction.status"
      >
        <q-card>
          <q-card-section>
            TransactionID: {{ transaction.id }}
            Datetime: {{ transaction.date }}
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

import {onMounted, ref} from 'vue';
import {natsStore} from "stores/natsStore";
import {StringCodec} from "nats.ws";

// import {useCredentialsStore} from '../store/credentials';
//
// const credentialsStore = useCredentialsStore();
// const disconnect = () => {
// //prints credentials from credentialsStore to log
//   console.log('aa');
//   console.log(credentialsStore.service, credentialsStore.url, credentialsStore.user, credentialsStore.wallet, credentialsStore.password);
// }

  const store = natsStore ();
  const sc = StringCodec();

onMounted(() => {
  console.log(store.getSubject);
  if(store.isInitialized){
    store.connection.request(store.getSubject, sc.encode(`{"jsonrpc":"2.0","id":"${store.getWallet}","method":"wallet.listAccounts","params":{}}`), {timeout:10000}).then((m) => {
      console.log(`response: ${sc.decode(m.data)}`);
      console.log(JSON.parse(sc.decode(m.data)));
    })
  }
});

defineOptions({
  name: 'BalancePage'
});
var walletName = ref('');
var alert = ref(false);
function createWallet(){
  wallets.value.push({
    address: 'aa',
    balance: '0 XMR',
    name: walletName.value,
    id:10
  });
  text.value = '';
}
const transactions = ([
  {
    id: 'f65sd6dsf65456a',
    amount: 0.5,
    date: '2021-09-01 12:00:00',
    status: 'Confirmed',
    incoming: true
  },
  {
    id: 'f65sd6dsf65456a',
    amount: 0.5,
    date: '2021-09-01 12:00:00',
    status: 'Confirmed',
    incoming: false
  },
  {
    id: 'f65sd6dsf65456a',
    amount: 0.5,
    date: '2021-09-01 12:00:00',
    status: 'Confirmed',
    incoming: true
  },
  {
    id: 'f65sd6dsf65456a',
    amount: 0.5,
    date: '2021-09-01 12:00:00',
    status: 'Confirmed',
    incoming: true
  },
  {
    id: 'f65sd6dsf65456a',
    amount: 0.5,
    date: '2021-09-01 12:00:00',
    status: 'Confirmed',
    incoming: true
  },
  {
    id: 'f65sd6dsf65456a',
    amount: 0.5,
    date: '2021-09-01 12:00:00',
    status: 'Confirmed',
    incoming: true
  },
  {
    id: 'f65sd6dsf65456a',
    amount: 0.5,
    date: '2021-09-01 12:00:00',
    status: 'Confirmed',
    incoming: true
  },
  {
    id: 'f65sd6dsf65456a',
    amount: 0.5,
    date: '2021-09-01 12:00:00',
    status: 'Confirmed',
    incoming: true
  },
  {
    id: 'f65sd6dsf65456a',
    amount: 0.5,
    date: '2021-09-01 12:00:00',
    status: 'Confirmed',
    incoming: true
  },
  {
    id: 'f65sd6dsf65456a',
    amount: 0.5,
    date: '2021-09-01 12:00:00',
    status: 'Confirmed',
    incoming: true
  },
  {
    id: 'f65sd6dsf65456a',
    amount: 0.5,
    date: '2021-09-01 12:00:00',
    status: 'Confirmed',
    incoming: true
  },
  {
    id: 'f65sd6dsf65456a',
    amount: 0.5,
    date: '2021-09-01 12:00:00',
    status: 'Confirmed',
    incoming: true
  },
  {
    id: 'f65sd6dsf65456a',
    amount: 0.5,
    date: '2021-09-01 12:00:00',
    status: 'Confirmed',
    incoming: true
  },
  {
    id: 'f65sd6dsf65456a',
    amount: 0.5,
    date: '2021-09-01 12:00:00',
    status: 'Confirmed',
    incoming: true
  },
  {
    id: 'f65sd6dsf65456a',
    amount: 0.5,
    date: '2021-09-01 12:00:00',
    status: 'Confirmed',
    incoming: true
  },
]);
// const wallets = ref([
//   {
//     address: '4AxM ... Ev7Z',
//     balance: '5 XMR',
//     name: 'Main Wallet',
//     id: 1
//   },
//   {
//     address: '4AxM ... Ev7Z',
//     balance: '5 XMR',
//     name: 'Side Wallet',
//     id: 2
//   },
//   {
//     address: '4AxM ... Ev7Z',
//     balance: '5 XMR',
//     name: 'Side Wallet 2',
//     id: 3
//   },
//   {
//     address: '4AxM ... Ev7Z',
//     balance: '5 XMR',
//     name: 'Main Wallet',
//     id: 4
//   },
//   {
//     address: '4AxM ... Ev7Z',
//     balance: '5 XMR',
//     name: 'Main Wallet',
//     id: 5
//   }
// ])
</script>
