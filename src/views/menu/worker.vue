<template>
  <div></div>
</template>
<script setup lang="ts">
import WebWorker from '@/utils/worker';

function demo() {
  var i = 0;
  function f() {
    postMessage(i);
    i++;
    setTimeout(f, 500);
  }
  f();
}

onMounted(() => {
  let worker = new WebWorker(demo, function (data) {
    console.log(data);
  });

  worker.start();

  setTimeout(() => worker.end(), 2000);
});
</script>

<style scoped></style>
