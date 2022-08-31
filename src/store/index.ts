import type { App } from 'vue';
import { createPinia, defineStore } from 'pinia';

const store = createPinia();

export const useStore = defineStore('store', {
  state: () => {
    return {
      count: 0,
    };
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});

export function setupStore(app: App<Element>) {
  app.use(store);
}
