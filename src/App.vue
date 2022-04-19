<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container mx-auto">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      |
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style></style>
