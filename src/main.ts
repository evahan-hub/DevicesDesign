import Vue from 'vue';
import App from './App.vue';
import './assets/styles.css';
import './assets/fonts/fonts.css';
import '@adyen/bento-vue2/styles/bento.css';

// Import and configure Bento design system
import install from '@adyen/bento-vue2';

// Install Bento design system
Vue.use(install);

new Vue({
  render: (h: any) => h(App),
}).$mount('#app');
