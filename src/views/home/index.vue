<script setup lang="ts">
import { useStore } from '@/store/index';
import { fetchDataApi } from '@/service/api/index';
import { awaitWrap } from '@/utils';

const store = useStore();
const list = ref<
  {
    name: string;
    age: number;
  }[]
>([]);

const onIncrement = () => {
  store.increment();
};
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
  <el-button type="primary" @click="onIncrement" v-preventReClick>
    <SvgIcon width="16" height="16" name="plus-circle"></SvgIcon>
  </el-button>
  <div class="p-5 mt-10 border border-gray-200 border-solid rounded w-200">
    {{ store.count }}
  </div>
  <el-button class="mt-10" type="primary" @click="getList">getList </el-button>
  <ul class="mt-10">
    <li v-for="(item, index) in list" :key="index">
      {{ item.name }}- {{ item.age }}
    </li>
  </ul>
</template>
<style scoped>
@import './index.css';
</style>
