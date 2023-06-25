<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import { zhCN, dateZhCN, NConfigProvider } from 'naive-ui';
</script>
