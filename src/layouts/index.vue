<template>
  <div class="app-container">
    <div class="app-sidebar">
      <n-menu
        :value="active"
        key-field="id"
        label-field="title"
        @update:value="handleUpdateValue"
        :options="menuOptions"
      />
    </div>
    <div class="app-main">
      <header class="app-header"></header>
      <div class="app-body">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script lang="tsx" setup>
import router from '@/router';
import usePermissionStore from '@/store/permission';
import { traversalTree } from '@/utils/index';

const route = useRoute();
const menuOptions = usePermissionStore().routes;
const active = ref('');

traversalTree(menuOptions, 'children', (node) => {
  if (node.useFirstChild) {
    const nNode = node.children[0];
    node.id = nNode.id;
    node.title = nNode.title;
    node.path = nNode.path;
    node.component = nNode.component;
    node.redirect = nNode.redirect;
    node.children = null;
  }
  node.icon = null;
});

// 路由跳转需通过代码实现
const handleUpdateValue = (key, item) => {
  active.value = key;
  router.push({ path: item.path });
};

console.log(menuOptions);
</script>
<style lang="less" scoped></style>
