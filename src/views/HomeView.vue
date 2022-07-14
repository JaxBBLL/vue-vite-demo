<script setup lang="ts">
import { useStore } from '@/store/index'
import { httpForm } from '@/service/request'

const store = useStore()
const onIncrement = () => {
  store.increment()
}
const msg = ref('Hello World')

httpForm('get', '/test').then((res) => {
  console.log(res)
})
</script>

<template>
  <main>
    <n-button type="primary" @click="onIncrement" v-preventReClick>
      increment
      <SvgIcon class="ml-2" name="arrow-right-circle-fill"></SvgIcon>
    </n-button>
    <n-space>
      <span>{{ store.count }}</span>
      <div>{{ msg }}</div>
    </n-space>
  </main>
</template>
