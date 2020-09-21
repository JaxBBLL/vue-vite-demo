import * as Vue from 'vue';
import App from './App.vue';
import './app.css';

// console.log(Vue.createApp.toString());
Object.keys(Vue).forEach((key) => {
  console.log(key);
});

Vue.createApp(App).mount('#app');
