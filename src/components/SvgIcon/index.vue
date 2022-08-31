<template>
  <svg :class="className" aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    class: {
      type: String,
    },
    color: {
      type: String,
      default: 'currentColor',
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    const className = computed(() => [
      'icon-svg',
      `icon-svg__${props.name}`,
      props.class && /\S/.test(props.class) ? `${props.class}` : '',
    ]);
    return { symbolId, className };
  },
});
</script>
<style scoped>
.icon-svg {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
