<template>
  <!-- <WangeEditor v-model="content" /> -->
  <Tinymce v-model="content" />
</template>
<script setup lang="ts">
// import WangeEditor from '@/components/WangEditor/index.vue'
import Tinymce from '@/components/Tinymce/index.vue';

const content = ref('<p>Hello</p>');
</script>
