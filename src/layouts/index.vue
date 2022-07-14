<template>
  <div class="g-app">
    <header class="py-4 bg-purple-100">
      <router-link to="/home">home</router-link>
      <span class="mx-2">|</span>
      <router-link to="/about">about</router-link>
    </header>
    <div class="g-main">
      <router-view />
    </div>
    <footer class="py-4 bg-purple-100">footer</footer>
  </div>
</template>
