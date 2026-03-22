import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { router } from './router';
import './styles/index.css';
import './assets/fonts/fonts.css';
import '@adyen/bento-vue2/styles/bento.css';

// Import and configure Bento design system (our working solution)
import install from '@adyen/bento-vue2';

Vue.use(VueRouter);
Vue.use(install);

new Vue({
  router,
  render: (h: any) => h(App),
}).$mount('#app');
