import VueRouter from 'vue-router';

const RootLayout = () => import('./views/RootLayout.vue');

// Parent tabs
const HomePage = () => import('./views/HomePage.vue');
const PerformancePage = () => import('./views/PerformancePage.vue');
const SettingsPage = () => import('./views/SettingsPage.vue');

// Transaction sub-tabs
const PaymentsPage = () => import('./views/PaymentsPage.vue');
const OffersPage = () => import('./views/OffersPage.vue');
const PayoutsPage = () => import('./views/PayoutsPage.vue');

// Accounts & balances sub-tabs
const AccountHoldersPage = () => import('./views/AccountHoldersPage.vue');
const ScorePage = () => import('./views/ScorePage.vue');

// Revenue & risk sub-tabs
const UpliftOverviewPage = () => import('./views/revenue-risk/UpliftOverviewPage.vue');
const RecommendationsPage = () => import('./views/revenue-risk/RecommendationsPage.vue');
//const CaseManagementPage = () => import('./views/revenue-risk/CaseManagementPage.vue');
const DisputesPage = () => import('./views/revenue-risk/DisputesPage.vue');
const Dynamic3DSecurePage = () => import('./views/revenue-risk/Dynamic3DSecurePage.vue');
const ExperimentsPage = () => import('./views/revenue-risk/ExperimentsPage.vue');
const RiskFieldsPage = () => import('./views/revenue-risk/RiskFieldsPage.vue');
const RiskListsPage = () => import('./views/revenue-risk/RiskListsPage.vue');
const RiskProfileDetailsPage = () => import('./views/revenue-risk/RiskProfileDetailsPage.vue');
const RiskSettingsPage = () => import('./views/revenue-risk/SettingsPage.vue');

// Partner sub-tabs
const PartnerOverviewPage = () => import('./views/partner/OverviewPage.vue');
const ReferralsPage = () => import('./views/partner/ReferralsPage.vue');
//const CommissionsPage = () => import('./views/partner/CommissionsPage.vue');
const MerchantAccessPage = () => import('./views/partner/MerchantAccessPage.vue');

// Insights sub-tabs
const CheckoutPage = () => import('./views/insights/CheckoutPage.vue');
const PaymentLifecyclePage = () => import('./views/insights/PaymentLifecyclePage.vue');
//const RiskDisputeManagementPage = () => import('./views/insights/RiskDisputeManagementPage.vue');

// Pay by Link sub-tabs
const PaymentLinksPage = () => import('./views/pay-by-link/PaymentLinksPage.vue');

// Giving sub-tabs
const CampaignsPage = () => import('./views/giving/CampaignsPage.vue');

// Finance sub-tabs
const FinancePage = () => import('./views/FinancePage.vue');
const BalancesOverviewPage = () => import('./views/finance/BalancesOverviewPage.vue');
const CompanyBalancesOverviewPage = () => import('./views/finance/CompanyBalancesOverviewPage.vue');
const MPLPage = () => import('./views/finance/MPLPage.vue');
const InvoicesPage = () => import('./views/finance/InvoicesPage.vue');
const SalesToPayoutsPage = () => import('./views/finance/SalesToPayoutsPage.vue');
const PayoutAccountsPage = () => import('./views/finance/PayoutAccountsPage.vue');
//const PayoutModelPage = () => import('./views/finance/PayoutModelPage.vue');
const ReportingManagerPage = () => import('./views/finance/ReportingManagerPage.vue');

// Developers sub-tabs
const IntegrationGuidePage = () => import('./views/developers/IntegrationGuidePage.vue');
const DeveloperDashboardPage = () => import('./views/developers/DashboardPage.vue');
const ApiCredentialsPage = () => import('./views/developers/ApiCredentialsPage.vue');
const WebhooksPage = () => import('./views/developers/WebhooksPage.vue');

// In-person payments sub-tabs
const OrdersReturnsPage = () => import('./views/in-person-payments/OrdersReturnsPage.vue');
const StoresPage = () => import('./views/in-person-payments/StoresPage.vue');
const TerminalsPage = () => import('./views/in-person-payments/TerminalsPage.vue');
const TapToPayPage = () => import('./views/in-person-payments/TapToPayPage.vue');
const TerminalSettingsPage = () => import('./views/in-person-payments/TerminalSettingsPage.vue');
const AndroidPage = () => import('./views/in-person-payments/AndroidPage.vue');
const TerminalSoftwarePage = () => import('./views/in-person-payments/TerminalSoftwarePage.vue');
const InPersonThemesPage = () => import('./views/in-person-payments/ThemesPage.vue');

// Reports sub-tabs
const ReportsPage = () => import('./views/ReportsPage.vue');

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: RootLayout,
      children: [
        { path: '', redirect: '/home' },
        
        // Parent tabs
        { path: 'home', component: HomePage, name: 'home' },
        { path: 'performance', component: PerformancePage, name: 'performance' },
        { path: 'settings', component: SettingsPage, name: 'settings' },
        
        // Transactions sub-tabs
        { path: 'transactions/payments', component: PaymentsPage, name: 'payments' },
        { path: 'transactions/offers', component: OffersPage, name: 'offers' },
        { path: 'transactions/payouts', component: PayoutsPage, name: 'payouts' },
        
        // Accounts & balances sub-tabs
        { path: 'accounts/account-holders', component: AccountHoldersPage, name: 'account-holders' },
        { path: 'accounts/score', component: ScorePage, name: 'score' },
        
        // Revenue & risk sub-tabs
        { path: 'revenue-risk/uplift-overview', component: UpliftOverviewPage, name: 'uplift-overview' },
        { path: 'revenue-risk/recommendations', component: RecommendationsPage, name: 'recommendations' },
        //{ path: 'revenue-risk/case-management', component: CaseManagementPage, name: 'case-management' },
        { path: 'revenue-risk/disputes', component: DisputesPage, name: 'disputes' },
        { path: 'revenue-risk/dynamic-3d-secure', component: Dynamic3DSecurePage, name: 'dynamic-3d-secure' },
        { path: 'revenue-risk/experiments', component: ExperimentsPage, name: 'experiments' },
        { path: 'revenue-risk/risk-fields', component: RiskFieldsPage, name: 'risk-fields' },
        { path: 'revenue-risk/risk-lists', component: RiskListsPage, name: 'risk-lists' },
        //{ path: 'revenue-risk/risk-profiles', component: RiskProfilesPage, name: 'risk-profiles' },
        { path: 'revenue-risk/risk-profile-details', component: RiskProfileDetailsPage, name: 'risk-profile-details' },
        { path: 'revenue-risk/settings', component: RiskSettingsPage, name: 'risk-settings' },
        
        // Partner sub-tabs
        { path: 'partner/overview', component: PartnerOverviewPage, name: 'partner-overview' },
        { path: 'partner/referrals', component: ReferralsPage, name: 'referrals' },
        //{ path: 'partner/commissions', component: CommissionsPage, name: 'commissions' },
        { path: 'partner/merchant-access', component: MerchantAccessPage, name: 'merchant-access' },
        
        // Insights sub-tabs
        { path: 'insights/checkout', component: CheckoutPage, name: 'checkout' },
        { path: 'insights/payment-lifecycle', component: PaymentLifecyclePage, name: 'payment-lifecycle' },
        //{ path: 'insights/risk-dispute-management', component: RiskDisputeManagementPage, name: 'risk-dispute-management' },
        
        // Pay by Link sub-tabs
        { path: 'pay-by-link/payment-links', component: PaymentLinksPage, name: 'payment-links' },
        
        // Giving sub-tabs
        { path: 'giving/campaigns', component: CampaignsPage, name: 'campaigns' },
        
        // Finance sub-tabs
        { path: 'finance', component: FinancePage, name: 'finance' },
        { path: 'finance/balances-overview', component: BalancesOverviewPage, name: 'balances-overview' },
        { path: 'finance/company-balances-overview', component: CompanyBalancesOverviewPage, name: 'company-balances-overview' },
        { path: 'finance/mpl', component: MPLPage, name: 'mpl' },
        { path: 'finance/invoices', component: InvoicesPage, name: 'invoices' },
        { path: 'finance/sales-to-payouts', component: SalesToPayoutsPage, name: 'sales-to-payouts' },
        { path: 'finance/payout-accounts', component: PayoutAccountsPage, name: 'payout-accounts' },
        //{ path: 'finance/payout-model', component: PayoutModelPage, name: 'payout-model' },
        { path: 'finance/reporting-manager', component: ReportingManagerPage, name: 'reporting-manager' },
        
        // Developers sub-tabs
        { path: 'developers/integration-guide', component: IntegrationGuidePage, name: 'integration-guide' },
        { path: 'developers/dashboard', component: DeveloperDashboardPage, name: 'developer-dashboard' },
        { path: 'developers/api-credentials', component: ApiCredentialsPage, name: 'api-credentials' },
        { path: 'developers/webhooks', component: WebhooksPage, name: 'webhooks' },
        
        // In-person payments sub-tabs
        { path: 'in-person-payments/orders-returns', component: OrdersReturnsPage, name: 'orders-returns' },
        { path: 'in-person-payments/stores', component: StoresPage, name: 'stores' },
        { path: 'in-person-payments/terminals', component: TerminalsPage, name: 'terminals' },
        { path: 'in-person-payments/tap-to-pay', component: TapToPayPage, name: 'tap-to-pay' },
        { path: 'in-person-payments/terminal-settings', component: TerminalSettingsPage, name: 'terminal-settings' },
        { path: 'in-person-payments/android', component: AndroidPage, name: 'android' },
        { path: 'in-person-payments/terminal-software', component: TerminalSoftwarePage, name: 'terminal-software' },
        { path: 'in-person-payments/themes', component: InPersonThemesPage, name: 'in-person-themes' },
        
        // Reports sub-tabs
        { path: 'reports', component: ReportsPage, name: 'reports' },
      ],
    },
  ],
});
