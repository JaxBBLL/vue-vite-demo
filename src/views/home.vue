<script setup lang="ts">
import { fetchDataApi } from '@/api/common';
import { awaitWrap } from '@/utils';

const list = ref<
  {
    name: string;
    age: number;
  }[]
>([]);

const msg = ref('Hello World');

const getList = async () => {
  const [userRes] = await awaitWrap(fetchDataApi());
  if (userRes) {
    list.value = userRes.data;
  }
};
</script>

<template>
  <div class="msg">{{ msg }}</div>
  <n-button type="primary" @click="getList"> getList </n-button>
  <ul class="mt-10">
    <li v-for="(item, index) in list" :key="index">
      {{ item.name }}- {{ item.age }}
    </li>
  </ul>
</template>
<style scoped>
.msg {
  @apply text-danger text-20 font-bold uppercase;
}
</style>
