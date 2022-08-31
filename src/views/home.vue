<script setup lang="ts">
import { fetchDataApi } from '@/service/api/index';
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
  <el-button class="mt-10" type="primary" @click="getList">getList </el-button>
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
