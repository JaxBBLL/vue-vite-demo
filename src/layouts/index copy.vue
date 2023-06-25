<template>
  <div class="app-container">
    <div class="app-sidebar">
      <template v-for="item in menu" :key="item.id">
        <sub-menu v-if="!item.hidden" :depth="depth + 1" :menu="item" />
      </template>
    </div>
    <div class="app-main">
      <header class="app-header"></header>
      <div class="app-body">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup>
import usePermissionStore from '@/store/permission';
import SubMenu from './SubMenu.vue';

const menu = usePermissionStore().routes;

let depth = ref(0);
</script>
