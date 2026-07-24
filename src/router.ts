import VueRouter from 'vue-router';

const RootLayout = () => import('./views/psp/RootLayout.vue');

// Parent tabs
const HomePage = () => import('./views/psp/HomePage.vue');
const PerformancePage = () => import('./views/psp/PerformancePage.vue');
const SettingsPage = () => import('./views/psp/SettingsPage.vue');

// Transaction sub-tabs
const PaymentsPage = () => import('./views/psp/payments/PaymentsPage.vue');
const PaymentDetailsPage = () => import('./views/psp/payments/PaymentDetailsPage.vue');
const OffersPage = () => import('./views/psp/OffersPage.vue');
const PayoutsPage = () => import('./views/psp/PayoutsPage.vue');

// Accounts & balances sub-tabs
const AccountHoldersPage = () => import('./views/psp/AccountHoldersPage.vue');
const ScorePage = () => import('./views/psp/ScorePage.vue');

// Revenue & risk sub-tabs
const UpliftOverviewPage = () => import('./views/psp/revenue-risk/UpliftOverviewPage.vue');
const RecommendationsPage = () => import('./views/psp/revenue-risk/RecommendationsPage.vue');
const CaseManagementPage = () => import('./views/psp/revenue-risk/case-management/CaseManagementPage.vue');
const DisputesPage = () => import('./views/psp/revenue-risk/DisputesPage.vue');
const Dynamic3DSecurePage = () => import('./views/psp/revenue-risk/Dynamic3DSecurePage.vue');
const ExperimentsPage = () => import('./views/psp/revenue-risk/experiments/ExperimentsPage.vue');
const RiskFieldsPage = () => import('./views/psp/revenue-risk/RiskFieldsPage.vue');
const RiskListsPage = () => import('./views/psp/revenue-risk/RiskListsPage.vue');
const RiskProfilesPage = () => import('./views/psp/revenue-risk/risk-profiles/RiskProfilesPage.vue');
const RiskProfileDetailsPage = () => import('./views/psp/revenue-risk/profile-details/ProfileDetailsPage.vue');
const RiskSettingsPage = () => import('./views/psp/revenue-risk/risk-settings/RiskSettingsPage.vue');

// Partner sub-tabs
const PartnerOverviewPage = () => import('./views/psp/partner/OverviewPage.vue');
const ReferralsPage = () => import('./views/psp/partner/ReferralsPage.vue');
//const CommissionsPage = () => import('./views/psp/partner/CommissionsPage.vue');
const MerchantAccessPage = () => import('./views/psp/partner/MerchantAccessPage.vue');

// Insights sub-tabs
const CheckoutPage = () => import('./views/psp/insights/CheckoutPage.vue');
const PaymentLifecyclePage = () => import('./views/psp/insights/payment-lifecycle/PaymentLifecyclePage.vue');
const RiskDisputeManagementPage = () => import('./views/psp/insights/risk-dispute-management/RiskDisputeManagementPage.vue');

// Pay by Link sub-tabs
const PaymentLinksPage = () => import('./views/psp/pay-by-link/PaymentLinksPage.vue');

// Giving sub-tabs
const CampaignsPage = () => import('./views/psp/giving/CampaignsPage.vue');

// Finance sub-tabs
const FinancePage = () => import('./views/psp/FinancePage.vue');
const BalancesOverviewPage = () => import('./views/psp/finance/BalancesOverviewPage.vue');
const CompanyBalancesOverviewPage = () => import('./views/psp/finance/CompanyBalancesOverviewPage.vue');
const MPLPage = () => import('./views/psp/finance/MPLPage.vue');
const InvoicesPage = () => import('./views/psp/finance/invoices/InvoicesPage.vue');
const InvoiceDetailPage = () => import('./views/psp/finance/invoices/InvoiceDetailPage.vue');
const SalesToPayoutsPage = () => import('./views/psp/finance/SalesToPayoutsPage.vue');
const PayoutAccountsPage = () => import('./views/psp/finance/PayoutAccountsPage.vue');
//const PayoutModelPage = () => import('./views/psp/finance/PayoutModelPage.vue');
const ReportingManagerPage = () => import('./views/psp/finance/ReportingManagerPage.vue');

// Developers sub-tabs
const IntegrationGuidePage = () => import('./views/psp/developers/IntegrationGuidePage.vue');
const DeveloperDashboardPage = () => import('./views/psp/developers/DashboardPage.vue');
const ApiCredentialsPage = () => import('./views/psp/developers/ApiCredentialsPage.vue');
const WebhooksPage = () => import('./views/psp/developers/WebhooksPage.vue');

// In-person payments sub-tabs
const OrdersReturnsPage = () => import('./views/psp/in-person-payments/OrdersReturnsPage.vue');
const StoresPage = () => import('./views/psp/in-person-payments/StoresPage.vue');
const TerminalsPage = () => import('./views/psp/in-person-payments/TerminalsPage.vue');
const TapToPayPage = () => import('./views/psp/in-person-payments/TapToPayPage.vue');
const TerminalSettingsPage = () => import('./views/psp/in-person-payments/TerminalSettingsPage.vue');
const AndroidPage = () => import('./views/psp/in-person-payments/AndroidPage.vue');
const PaymentDevicesPage = () => import('./views/psp/in-person-payments/PaymentDevicesPage.vue');
const PaymentDevicesCopyPage = () => import('./views/psp/in-person-payments/PaymentDevicesCopyPage.vue');
const TerminalSoftwarePage = () => import('./views/psp/in-person-payments/TerminalSoftwarePage.vue');
const InPersonThemesPage = () => import('./views/psp/in-person-payments/ThemesPage.vue');

// Reports sub-tabs
const ReportsPage = () => import('./views/psp/reports/ReportsPage.vue');
const ReportDetailsStub = () => import('./views/psp/reports/ReportDetailsStub.vue');

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
        { path: 'transactions/payments/:id', component: PaymentDetailsPage, name: 'payment-details' }, // ADD THIS
        { path: 'transactions/offers', component: OffersPage, name: 'offers' },
        { path: 'transactions/payouts', component: PayoutsPage, name: 'payouts' },
        
        // Accounts & balances sub-tabs
        { path: 'accounts/account-holders', component: AccountHoldersPage, name: 'account-holders' },
        { path: 'accounts/score', component: ScorePage, name: 'score' },
        
        // Revenue & risk sub-tabs
        { path: 'revenue-risk/uplift-overview', component: UpliftOverviewPage, name: 'uplift-overview' },
        { path: 'revenue-risk/recommendations', component: RecommendationsPage, name: 'recommendations' },
        { path: 'revenue-risk/case-management', component: CaseManagementPage, name: 'case-management' },
        { path: 'revenue-risk/disputes', component: DisputesPage, name: 'disputes' },
        { path: 'revenue-risk/dynamic-3d-secure', component: Dynamic3DSecurePage, name: 'dynamic-3d-secure' },
        { path: 'revenue-risk/experiments', component: ExperimentsPage, name: 'experiments' },
        { path: 'revenue-risk/risk-fields', component: RiskFieldsPage, name: 'risk-fields' },
        { path: 'revenue-risk/risk-lists', component: RiskListsPage, name: 'risk-lists' },
        { path: 'revenue-risk/risk-profiles', component: RiskProfilesPage, name: 'risk-profiles' },
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
        { path: 'insights/risk-dispute-management', component: RiskDisputeManagementPage, name: 'risk-dispute-management' },
        
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
        { path: 'finance/invoices/:id', component: InvoiceDetailPage, name: 'invoice-detail' },
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
        { path: 'in-person-payments/payment-devices', component: PaymentDevicesPage, name: 'payment-devices' },
        { path: 'in-person-payments/payment-devices-copy', component: PaymentDevicesCopyPage, name: 'payment-devices-copy' },
        { path: 'in-person-payments/terminal-software', component: TerminalSoftwarePage, name: 'terminal-software' },
        { path: 'in-person-payments/themes', component: InPersonThemesPage, name: 'in-person-themes' },
        
        // Reports sub-tabs
        { path: 'reports', component: ReportsPage, name: 'reports' },
        { path: 'reports/:reportCode', component: ReportDetailsStub, name: 'report-details' },
      ],
    },
  ],
});
