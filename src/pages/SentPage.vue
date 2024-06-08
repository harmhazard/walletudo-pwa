<template>
  <q-page class=" items-center justify-evenly ">
    <div class="q-gutter-y-md column col-auto" style="max-width: 600px; margin:auto;">
    <q-form @submit="send" >
      <q-input filled v-model="text" label="Send to" class=""
               :rules="[ val => val && val.length > 0 || 'Enter a valid address']"
      />

      <q-input
        filled
        v-model="amount"
        label="Amount"
        input-class="text-right"
        style="max-width: 200px"
        class="col"
        :rules="[ val => isValidAmount(val) || 'Enter a valid value' ]"
      ></q-input>
      <q-btn label="Send" type="submit"  style="max-width: 100px" color="primary"/>
    </q-form>
    </div>
    <q-dialog v-model="showConfirm" persistent class="q-px-xl">
      <q-card class="q-px-lg">
        <q-card-section>
          <div class="text-h6">Confirm the transaction</div>
        </q-card-section>
        <q-card-section>
          <q-item>Address: {{preparedTransaction.address}}</q-item>
          <q-item>Amount: {{preparedTransaction.amount}}</q-item>
          <q-item>fee: {{preparedTransaction.fee}}</q-item>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" color="primary" v-close-popup @click="confirmTransaction(preparedTransaction.txMetadata.value)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">

import {onMounted, ref} from 'vue';
import { Notify} from 'quasar'


defineOptions({
  name: 'SentPage'
});
const text = ref('');
const amount = ref('0.0')
import {newNatsStore} from "stores/natsStore";
const store = newNatsStore ();

const test = ref('aaa')
const preparedTransaction=ref({
  address:'',
  amount:'',
  fee:'',
  txMetadata:''
})
const showConfirm=ref(false)

function isValidAmount(str) {
  const floatRegex = /^(?:\d+(\.\d{1,12})?|\.\d{1,12})$/;
  return floatRegex.test(str);
}
onMounted(() => {
});
function send(){// not working - todo fix and test
  console.log(parseFloat(amount.value)*1000000000000)//
  console.log(text.value)
  store.rpcRequest("wallet.account.createTransaction", {"accountID":1, "address":text.value, "amount":parseFloat(amount.value)*1000000000000}).then((m) => {
    preparedTransaction.value = m;
    showConfirm.value = true;
    console.log(m)
  });
}
function confirmTransaction(txMetadata){
  if(preparedTransaction.value==null) return
  store.rpcRequest("relayTransaction", {"txMetadata": txMetadata}).then((m) => {
    //console.log("transaction sent, hash:", m.txHash)
    showConfirm.value=false
    preparedTransaction.value=null
    Notify.create('Transaction sent!');
    //todo notify wasn't tested yet
  });
}

</script>
