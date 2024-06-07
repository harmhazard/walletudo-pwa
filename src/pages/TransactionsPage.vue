<template>
  <q-page class="row items-center justify-evenly">
    <div class="col q-mx-lg">
        <q-list           v-for="transaction in transactions" bordered
                          :key="transaction.id" >
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
      </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'TransactionsPage'
});

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
</script>
<style >
.example-item{
  height: 56px
}


</style>
