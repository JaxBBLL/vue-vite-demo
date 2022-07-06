<script setup lang="ts">
import { useStore } from '@/store/index'

const store = useStore()
const onIncrement = () => {
  store.increment()
}
</script>

<template>
  <main>
    <n-button type="primary" @click="onIncrement" v-preventReClick>
      increment
      <SvgIcon class="ml-2" name="arrow-right-circle-fill"></SvgIcon>
    </n-button>
    <n-space>
      <span>{{ store.count }}</span>
    </n-space>
  </main>
</template>
