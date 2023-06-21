<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import { zhCN, dateZhCN } from 'naive-ui';
</script>
