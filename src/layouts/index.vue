<template>
  <div class="app-container">
    <div class="app-sidebar">
      <n-menu
        :value="active"
        key-field="id"
        :icon-size="16"
        label-field="title"
        @update:value="handleUpdateValue"
        :options="menuOptions"
        :indent="10"
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
import { cloneDeep } from 'lodash-es';

const route = useRoute();
const routes = usePermissionStore().routes;
const menuOptions = cloneDeep(routes);
const active = ref(route.meta.id || '');

console.log('routes', routes);

traversalTree(menuOptions, 'children', (node) => {
  let icon = node.icon;
  if (node.useFirstChild) {
    const nNode = node.children[0];
    node.id = nNode.id;
    node.title = nNode.title;
    node.path = nNode.path;
    node.component = nNode.component;
    node.redirect = nNode.redirect;
    node.children = null;
    icon = nNode.icon;
  }
  node.icon = () => <i class={icon || ''}></i>;
});

// 路由跳转需通过代码实现
const handleUpdateValue = (key, item) => {
  console.log(key);
  active.value = key;
  router.push({ path: item.path });
};

console.log('menuOptions', route.meta, menuOptions);
</script>
<style lang="less" scoped></style>
