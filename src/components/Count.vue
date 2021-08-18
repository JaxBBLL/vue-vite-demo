<template>
  <div>
    <p>{{ count }}</p>
    <button type="button" @click="setCount">increment</button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import useCount from "../hooks/useCount.js";

const props = defineProps({
  value: Number,
});

const [count, setCount] = useCount(props.value);
</script>
