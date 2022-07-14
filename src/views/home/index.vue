<script setup lang="ts">
import { useStore } from '@/store/index'

const store = useStore()
const onIncrement = () => {
  store.increment()
}
const msg = ref('Hello World')
</script>

<template>
  <div class="msg">{{ msg }}</div>
  <el-button type="primary" @click="onIncrement" v-preventReClick>
    <SvgIcon width="16" height="16" name="plus-circle"></SvgIcon>
  </el-button>
  <div>{{ store.count }}</div>
</template>
<style scoped>
@import './index.css';
</style>
