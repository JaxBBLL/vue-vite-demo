import { defineStore } from 'pinia';

export default defineStore('store', {
  state: () => {
    return {
      routerIsReady: false,
    };
  },
  actions: {
    addRoutes() {
      this.routerIsReady = true;
    },
  },
});
