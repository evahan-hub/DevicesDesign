import VueRouter from 'vue-router';

const BPRootLayout = () => import('./views/balance-platform/RootLayout.vue');
const BPHomePage = () => import('./views/balance-platform/HomePage.vue');
const BPStubPage = () => import('./views/balance-platform/StubPage.vue');

export const routerBP = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: BPRootLayout,
      children: [
        { path: '', redirect: '/home' },
        { path: 'home', component: BPHomePage, name: 'bp-home', meta: { title: 'Home' } },

        // Transactions
        { path: 'transactions/payments', component: BPStubPage, name: 'bp-payments', meta: { title: 'Payments' } },
        { path: 'transactions/offers', component: BPStubPage, name: 'bp-offers', meta: { title: 'Offers' } },
        { path: 'transactions/payouts', component: BPStubPage, name: 'bp-payouts', meta: { title: 'Payouts' } },
        { path: 'transactions/transfers', component: BPStubPage, name: 'bp-transfers', meta: { title: 'Transfers' } },

        // Other sections
        { path: 'accounts', component: BPStubPage, name: 'bp-accounts', meta: { title: 'Accounts & Balances' } },
        { path: 'financial-products', component: BPStubPage, name: 'bp-financial-products', meta: { title: 'Financial Products' } },
        { path: 'revenue-risk', component: BPStubPage, name: 'bp-revenue-risk', meta: { title: 'Revenue & Risk' } },
        { path: 'finance', component: BPStubPage, name: 'bp-finance', meta: { title: 'Finance' } },
        { path: 'settings', component: BPStubPage, name: 'bp-settings', meta: { title: 'Settings' } },
      ],
    },
  ],
});
