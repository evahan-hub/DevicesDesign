import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import { router } from './router';
import './styles/index.css';
import './assets/fonts/fonts.css';
import '@adyen/bento-vue2/styles/bento.css';
import ResizeObserver from 'resize-observer-polyfill';

if (typeof window !== 'undefined' && !(window as any).ResizeObserver) {
  (window as any).ResizeObserver = ResizeObserver;
}

Vue.use(VueRouter);
Vue.use(VueI18n);

import BentoVue from '@adyen/bento-vue2';
import {
  BentoButton,
  BentoTab,
  BentoTabs,
  BentoTypography,
  BentoDataGrid,
  BentoHeader,
  BentoSummaryGridItemText
} from '@adyen/bento-vue2';

import BentoIcon from '@adyen/bento-vue2';

Vue.use(BentoVue);

Vue.component('BentoButton', BentoButton);
Vue.component('BentoTab', BentoTab);
Vue.component('BentoTabs', BentoTabs);
Vue.component('BentoTypography', BentoTypography);
Vue.component('BentoDataGrid', BentoDataGrid);
Vue.component('BentoHeader', BentoHeader);
Vue.component('BentoSummaryGridItemText', BentoSummaryGridItemText);
Vue.component('BentoIcon', BentoIcon);


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
