<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container mx-auto">
    <nav class="my-2">
      <RouterLink to="/">Home</RouterLink>
      <span class="mx-2">|</span>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style></style>
