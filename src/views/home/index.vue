<script setup lang="ts">
import { useStore } from '@/store/index'
import { testApi } from '@/service/api/index'

const store = useStore()
const onIncrement = () => {
  store.increment()
  testApi().then((res) => {
    console.log(res.msg)
  })
}
const msg = ref('Hello World')
</script>

<template>
  <div class="msg">{{ msg }}</div>
  <el-button type="primary" @click="onIncrement" v-preventReClick>
    <SvgIcon width="16" height="16" name="plus-circle"></SvgIcon>
  </el-button>
  <div class="w-200 mt-10 p-5 border border-solid border-primary rounded">
    {{ store.count }}
  </div>
</template>
<style scoped>
@import './index.css';
</style>
