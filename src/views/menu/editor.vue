<template>
  <Tinymce v-model="content"></Tinymce>
</template>

<script setup lang="ts">
import Tinymce from '@/components/Tinymce/index.vue';
const content = ref('');
</script>

<style scoped></style>
