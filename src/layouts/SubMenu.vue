<template>
  <div>
    <header
      @click="onToggle"
      :class="['title', menu.path === $route.path ? 'active' : '']"
    >
      <div class="flex-1" :style="{ 'margin-left': depth * 2 + 'em' }">
        {{ menu.title }}
      </div>
      <span class="arrow" v-if="isFolder" :class="isOpen ? 'open' : ''"
        >&gt;</span
      >
    </header>
    <transition name="animate">
      <section v-if="isFolder" v-show="isOpen">
        <template v-for="item in menu.children" :key="item.id">
          <sub-menu v-if="!item.hidden" :depth="depth + 1" :menu="item" />
        </template>
      </section>
    </transition>
  </div>
</template>
<script setup lang="ts">
import router from '@/router';
import SubMenu from './SubMenu.vue';

const props = defineProps({
  menu: {
    type: Object,
  },
  depth: {
    type: Number,
    default: 0,
  },
});

const isOpen = ref(true);

const isFolder = computed(() => {
  return props.menu.children && props.menu.children.length;
});

const onToggle = () => {
  if (isFolder.value) {
    isOpen.value = !isOpen.value;
  } else {
    router.push({
      path: props.menu.path,
    });
  }
};
</script>
<style scoped>
/* 隐藏后 和 显示前 opacity 是 0 */
.animate-leave-to,
.animate-enter {
  opacity: 0;
}

/* 隐藏前 和 显示后 opacity 是 1 */
.animate-leave,
.animate-enter-to {
  opacity: 1;
}

/* 在这里写 transition */
.animate-leave-active,
.animate-enter-active {
  transition: all 0.3s;
}

.title {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
}
.active {
  color: #fff;
  background: rgb(4, 62, 150);
}
.arrow {
  font-family: monospace;
  font-weight: 400;
  transform-origin: center;
  transition: all 0.3s;
  margin-right: 20px;
}
.open {
  transform: rotate(90deg);
}
</style>
