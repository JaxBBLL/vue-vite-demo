<template>
  <div class="flex items-center">
    <span class="mr-10">{{ count }}</span>
    <button
      class="text-white bg-blue rounded px-10 py-5 border-none outline-none focus:shadow-outline"
      @click="setCount"
    >
      increment
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import useCount from '../hooks/useCount.js';

export default {
  name: 'Count',
  props: {
    value: Number,
  },
  setup(props) {
    let [count, setCount] = useCount(props.value);

    return {
      count,
      setCount,
    };
  },
  data() {},
};
</script>
