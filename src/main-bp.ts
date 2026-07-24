import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import AppBP from './App-bp.vue';
import { routerBP } from './router-bp';
import BentoVue from '@adyen/bento-vue2';
import './styles/index.css';
import '@adyen/bento-vue2/fonts.css';
import '@adyen/bento-vue2/styles/bento.css';
import '@adyen/bento-vue2/styles/utility.css';
import ResizeObserver from 'resize-observer-polyfill';

if (typeof window !== 'undefined' && !(window as any).ResizeObserver) {
  (window as any).ResizeObserver = ResizeObserver;
}

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(BentoVue);

const i18n = new VueI18n({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  silentTranslationWarn: true,
  messages: { 'en-US': {} },
});

new Vue({
  router: routerBP,
  i18n,
  render: (h: any) => h(AppBP),
}).$mount('#app');
