<template>
  <div>
    <div class="app-main">
      <template v-for="(item, index) in data" :key="index">
        <DragWrap :index="index">
          <EditContainer :modelValue="item" :index="index" />
        </DragWrap>
      </template>
    </div>
    <div class="footer-wrap">
      <el-button type="primary" @click="exportHtml">导出</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import DragWrap from './DragWrap.vue';
import EditContainer from './EditContainer.jsx';
import { data } from './data';

// watch(
//   () => data,
//   (n) => {
//     console.log(n.value)
//   },
//   {
//     deep: true
//   }
// )

const exportHtml = () => {};
</script>
<style scoped>
.header-wrap {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 4px rgb(0 0 0 / 10%);
  z-index: 100;
  margin-bottom: 10px;
}
.footer-wrap {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px -1px 4px rgb(0 0 0 / 10%);
  z-index: 100;
  margin-top: 10px;
}

.app-main {
  width: 375px;
  height: calc(100vh - 50px);
  outline: 1px solid #ddd;
  min-height: 750px;
  margin: auto;
}
</style>
