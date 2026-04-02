import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import { router } from './router';
import BentoVue from '@adyen/bento-vue2';
import './styles/index.css';
import '@adyen/bento-vue2/fonts.css';
import '@adyen/bento-vue2/styles/bento.css';
import ResizeObserver from 'resize-observer-polyfill';

if (typeof window !== 'undefined' && !(window as any).ResizeObserver) {
  (window as any).ResizeObserver = ResizeObserver;
}

Vue.use(VueRouter);
Vue.use(VueI18n);

// Register all Bento Vue2 components globally.
Vue.use(BentoVue);

const i18n = new VueI18n({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  silentTranslationWarn: true,
  messages: {
    'en-US': {}
  }
});

new Vue({
  router,
  i18n,
  render: (h: any) => h(App),
}).$mount('#app');
