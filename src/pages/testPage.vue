<template>
  <q-page class='row items-center justify-evenly'>

  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { connect, StringCodec } from 'nats.ws';


defineOptions({
  name: 'testPage'
});

const loading = ref(true);

setInterval(checkStatus, 5000);
async function checkStatus(){
  if(!loading.value){
    try {
      const ncPub = await connect({servers: ['wss://connect.walletudo.com'], user: 'c1', pass: 'wallet1password', timeout: 10000 });
      const sc = StringCodec();

      ncPub.request('wallets.demo1.rpc', sc.encode('{"jsonrpc":"2.0","id":"zzlDZNRdMTqs","method":"wallet.listAccounts","params":{}}'), {timeout:10000}).then((m) => {
        console.log(`response: ${sc.decode(m.data)}`);
        console.log(JSON.parse(sc.decode(m.data)));
      });
    } catch (error) {
      console.log('Failed to connect to NATS:', error);
    }
  }
}
onMounted(async () => {
  try {
    const ncPub = await connect({servers: ['wss://connect.walletudo.com'], user: 'c1', pass: 'wallet1password', timeout: 10000 });
    const sc = StringCodec();

    ncPub.request('wallets.demo1.rpc', sc.encode('{"jsonrpc":"2.0","id":"zzlDZNRdMTqs","method":"wallet.init","params":{"filename":"mywallet1"}}'), {timeout:10000}).then((m) => {
      console.log(`response: ${sc.decode(m.data)}`);
      console.log(JSON.parse(sc.decode(m.data)));
    });
  } catch (error) {
    console.log('Failed to connect to NATS:', error);
  } finally {
    loading.value = false;
  }
});

</script>
