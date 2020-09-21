<template>
  <Count :value="2" />
</template>

<script>
import Count from './components/Count.vue';

export default {
  name: 'App',
  components: {
    Count,
  },
};
</script>
<style>
body {
  margin: 0;
}
#app {
  display: flex;
  justify-content: center;
}
</style>
