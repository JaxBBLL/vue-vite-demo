import { createApp } from 'vue';
import store from './store';
import plugins from './plugins';
import router from './router';

import App from './App.vue';

async function setApp() {
  const app = createApp(App);
  app.use(store);
  app.use(plugins);
  app.use(router);
  app.mount('#app');
}

setApp();
