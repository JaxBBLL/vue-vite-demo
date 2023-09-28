<script setup lang="ts">
import { fetchDataApi } from '@/api/common';
import { awaitWrap } from '@/utils';
import useArray from '@/hooks/useArray';

const { list, add, remove, clear } = useArray<{
  name: string;
  age: number;
}>([]);

const getList = async () => {
  const [userRes] = await awaitWrap(fetchDataApi());
  window.$message.success('获取数据成功');

  if (userRes) {
    list.value = userRes.data;
  }
};

const handleAdd = () => {
  add({
    name: Math.random().toString(16).slice(2, 8),
    age: 19,
  });
};

getList();
</script>

<template>
  <div>
    <span class="text-primary">jaxbbll</span>
  </div>
  <n-space>
    <n-button type="primary" @click="handleAdd"> add </n-button>
    <n-button type="error" @click="clear"> clear </n-button>
  </n-space>
  <ul class="mt-10">
    <li v-for="(item, index) in list" :key="index">
      <div class="flex">
        <div class="w-100">{{ item.name }}</div>
        <div class="w-100">{{ item.age }}</div>
        <n-button
          @click="remove(index)"
          tertiary
          circle
          size="tiny"
          type="error"
        >
          <template #icon>
            <i class="bi bi-trash3 text-12"></i>
          </template>
        </n-button>
      </div>
    </li>
  </ul>
</template>
<style scoped>
.msg {
  @apply text-danger text-20 font-bold uppercase;
}
</style>
