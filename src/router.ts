import VueRouter from 'vue-router';

const RootLayout = () => import('./views/RootLayout.vue');
const HomePage = () => import('./views/HomePage.vue');
const FinancePage = () => import('./views/FinancePage.vue');
const ReportsPage = () => import('./views/ReportsPage.vue');

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: RootLayout,
      children: [
        { path: '', redirect: '/home' },
        { path: 'home', component: HomePage, name: 'home' },
        { path: 'finance', component: FinancePage, name: 'finance' },
        { path: 'reports', component: ReportsPage, name: 'reports' },
      ],
    },
  ],
});
