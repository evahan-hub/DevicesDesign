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
const TerminalSoftwarePage = () => import('./views/psp/in-person-payments/TerminalSoftwarePage.vue');
const InPersonThemesPage = () => import('./views/psp/in-person-payments/ThemesPage.vue');

// Reports sub-tabs
const ReportsPage = () => import('./views/psp/reports/ReportsPage.vue');
const ReportDetailsStub = () => import('./views/psp/reports/ReportDetailsStub.vue');

// Treasury sub-tabs
const FxControlCenterPage = () => import('./views/psp/treasury/FxControlCenterPage.vue');
const TargetBalancingPage = () => import('./views/psp/treasury/TargetBalancingPage.vue');
const FutureBalancesPage = () => import('./views/psp/treasury/FutureBalancesPage.vue');

// Finance Monitoring sub-tabs
const MonitorTypesPage = () => import('./views/psp/finance-monitoring/MonitorTypesPage.vue');
const MonitorsPage = () => import('./views/psp/finance-monitoring/MonitorsPage.vue');
const AlertsListPage = () => import('./views/psp/finance-monitoring/AlertsListPage.vue');
const TrackingConfigurationsPage = () => import('./views/psp/finance-monitoring/TrackingConfigurationsPage.vue');

// Payment Pricing sub-tabs
const FeeFrameworkPage = () => import('./views/psp/payment-pricing/FeeFrameworkPage.vue');
const InterchangePage = () => import('./views/psp/payment-pricing/InterchangePage.vue');
const NonTransactionalFeesPage = () => import('./views/psp/payment-pricing/NonTransactionalFeesPage.vue');

// Monetization sub-tabs
const PricingSchedulesPage = () => import('./views/psp/monetization/PricingSchedulesPage.vue');
const PricingProposalsPage = () => import('./views/psp/monetization/PricingProposalsPage.vue');
const ProductCatalogPage = () => import('./views/psp/monetization/ProductCatalogPage.vue');

// Service Status
const ServiceStatusPage = () => import('./views/psp/ServiceStatusPage.vue');

// Communication sub-tabs
const CreateMessagePage = () => import('./views/psp/communication/CreateMessagePage.vue');
const SentMessagesPage = () => import('./views/psp/communication/SentMessagesPage.vue');
const EmailTemplatesPage = () => import('./views/psp/communication/EmailTemplatesPage.vue');

// Virtual Terminal sub-tabs
const CreateTransactionPage = () => import('./views/psp/virtual-terminal/CreateTransactionPage.vue');

// Own Advancements sub-tabs
const SimulationToolPage = () => import('./views/psp/own-advancements/SimulationToolPage.vue');
const FundingPage = () => import('./views/psp/own-advancements/FundingPage.vue');

// Tokenization sub-tabs
const RechargeDataPage = () => import('./views/psp/tokenization/RechargeDataPage.vue');
const TokenGroupsPage = () => import('./views/psp/tokenization/TokenGroupsPage.vue');
const TokenRegionsPage = () => import('./views/psp/tokenization/TokenRegionsPage.vue');
const TokenizationPropertiesPage = () => import('./views/psp/tokenization/TokenizationPropertiesPage.vue');

// Revenue Accelerate sub-tabs
const RevenueAccelerateOverviewPage = () => import('./views/psp/revenue-accelerate/RevenueAccelerateOverviewPage.vue');
const RevenueAccelerateSettingsPage = () => import('./views/psp/revenue-accelerate/RevenueAccelerateSettingsPage.vue');

// Accounts & Balances (BP) sub-tabs
const BPAccountHoldersPage = () => import('./views/psp/accounts-balances/AccountHoldersPage.vue');
const BalanceAccountsPage = () => import('./views/psp/accounts-balances/BalanceAccountsPage.vue');

// Financial Products sub-tabs
const PaymentInstrumentsPage = () => import('./views/psp/financial-products/PaymentInstrumentsPage.vue');
const CardOrdersPage = () => import('./views/psp/financial-products/CardOrdersPage.vue');
const TransactionRulesPage = () => import('./views/psp/financial-products/TransactionRulesPage.vue');
const IssuingDisputesPage = () => import('./views/psp/financial-products/IssuingDisputesPage.vue');
const CapitalOverviewPage = () => import('./views/psp/financial-products/CapitalOverviewPage.vue');

// Marketpay sub-tabs
const MarketpayConfigurationPage = () => import('./views/psp/marketpay/MarketpayConfigurationPage.vue');
const MarketplaceOverviewPage = () => import('./views/psp/marketpay/MarketplaceOverviewPage.vue');
const SubmerchantSearchPage = () => import('./views/psp/marketpay/SubmerchantSearchPage.vue');
const SplitConfigurationPage = () => import('./views/psp/marketpay/SplitConfigurationPage.vue');

// Experimentation sub-tabs
const ExperimentationPage = () => import('./views/psp/experimentation/ExperimentationPage.vue');
const MerchantExperimentsPage = () => import('./views/psp/experimentation/MerchantExperimentsPage.vue');

// AML sub-tabs
const AmlAlertsPage = () => import('./views/psp/aml/AmlAlertsPage.vue');
const AmlCaseManagementPage = () => import('./views/psp/aml/AmlCaseManagementPage.vue');
const AmlLegalEntityPage = () => import('./views/psp/aml/AmlLegalEntityPage.vue');

// Toolkit sub-tabs
const PaymentBatchesPage = () => import('./views/psp/toolkit/PaymentBatchesPage.vue');
const AccountToolPage = () => import('./views/psp/toolkit/AccountToolPage.vue');
const AccountDataExplorerPage = () => import('./views/psp/toolkit/AccountDataExplorerPage.vue');
const SecretsManagerPage = () => import('./views/psp/toolkit/SecretsManagerPage.vue');

// System Monitoring sub-tabs
const MonitoringOverviewPage = () => import('./views/psp/system-monitoring/MonitoringOverviewPage.vue');
const SystemChecksPage = () => import('./views/psp/system-monitoring/SystemChecksPage.vue');
const TopicsPage = () => import('./views/psp/system-monitoring/TopicsPage.vue');
const SignalsPage = () => import('./views/psp/system-monitoring/SignalsPage.vue');

// Reconciliation sub-tabs
const MatchingScreenPage = () => import('./views/psp/reconciliation/MatchingScreenPage.vue');
const JournalCreatorPage = () => import('./views/psp/reconciliation/JournalCreatorPage.vue');
const BookingRequestsPage = () => import('./views/psp/reconciliation/BookingRequestsPage.vue');
const RecCenterPage = () => import('./views/psp/reconciliation/RecCenterPage.vue');

// Resources sub-tabs
const DevOpsPage = () => import('./views/psp/resources/DevOpsPage.vue');
const FeaturesPage = () => import('./views/psp/resources/FeaturesPage.vue');
const RolesManagerPage = () => import('./views/psp/resources/RolesManagerPage.vue');
const JobConfigurationsPage = () => import('./views/psp/resources/JobConfigurationsPage.vue');

// Task Management sub-tabs
const TasksPage = () => import('./views/psp/task-management/TasksPage.vue');
const WorkflowsPage = () => import('./views/psp/task-management/WorkflowsPage.vue');
const WorkflowStatisticsPage = () => import('./views/psp/task-management/WorkflowStatisticsPage.vue');

// CRR Admin sub-tabs
const CrrReviewsPage = () => import('./views/psp/crr-admin/CrrReviewsPage.vue');
const CrrScopeSettingsPage = () => import('./views/psp/crr-admin/CrrScopeSettingsPage.vue');

// ARC sub-tabs
const FormTemplatesPage = () => import('./views/psp/arc/FormTemplatesPage.vue');

export const router = new VueRouter({
  mode: 'hash',
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
        { path: 'in-person-payments/terminal-software', component: TerminalSoftwarePage, name: 'terminal-software' },
        { path: 'in-person-payments/themes', component: InPersonThemesPage, name: 'in-person-themes' },
        
        // Reports sub-tabs
        { path: 'reports', component: ReportsPage, name: 'reports' },
        { path: 'reports/:reportCode', component: ReportDetailsStub, name: 'report-details' },

        // Treasury sub-tabs
        { path: 'treasury/fx-control-center', component: FxControlCenterPage, name: 'fx-control-center' },
        { path: 'treasury/target-balancing', component: TargetBalancingPage, name: 'target-balancing' },
        { path: 'treasury/future-balances', component: FutureBalancesPage, name: 'future-balances' },

        // Finance Monitoring sub-tabs
        { path: 'finance-monitoring/monitor-types', component: MonitorTypesPage, name: 'monitor-types' },
        { path: 'finance-monitoring/monitors', component: MonitorsPage, name: 'monitors' },
        { path: 'finance-monitoring/alerts', component: AlertsListPage, name: 'finance-alerts' },
        { path: 'finance-monitoring/tracking-configurations', component: TrackingConfigurationsPage, name: 'tracking-configurations' },

        // Payment Pricing sub-tabs
        { path: 'payment-pricing/fee-framework', component: FeeFrameworkPage, name: 'fee-framework' },
        { path: 'payment-pricing/interchange', component: InterchangePage, name: 'interchange' },
        { path: 'payment-pricing/non-transactional-fees', component: NonTransactionalFeesPage, name: 'non-transactional-fees' },

        // Monetization sub-tabs
        { path: 'monetization/pricing-schedules', component: PricingSchedulesPage, name: 'pricing-schedules' },
        { path: 'monetization/pricing-proposals', component: PricingProposalsPage, name: 'pricing-proposals' },
        { path: 'monetization/product-catalog', component: ProductCatalogPage, name: 'product-catalog' },

        // Service Status
        { path: 'service-status', component: ServiceStatusPage, name: 'service-status' },

        // Communication sub-tabs
        { path: 'communication/create-message', component: CreateMessagePage, name: 'create-message' },
        { path: 'communication/sent-messages', component: SentMessagesPage, name: 'sent-messages' },
        { path: 'communication/email-templates', component: EmailTemplatesPage, name: 'email-templates' },

        // Virtual Terminal
        { path: 'virtual-terminal/create-transaction', component: CreateTransactionPage, name: 'create-transaction' },

        // Own Advancements sub-tabs
        { path: 'own-advancements/simulation-tool', component: SimulationToolPage, name: 'simulation-tool' },
        { path: 'own-advancements/funding', component: FundingPage, name: 'own-advancements-funding' },

        // Tokenization sub-tabs
        { path: 'tokenization/recharge-data', component: RechargeDataPage, name: 'recharge-data' },
        { path: 'tokenization/token-groups', component: TokenGroupsPage, name: 'token-groups' },
        { path: 'tokenization/token-regions', component: TokenRegionsPage, name: 'token-regions' },
        { path: 'tokenization/properties', component: TokenizationPropertiesPage, name: 'tokenization-properties' },

        // Revenue Accelerate sub-tabs
        { path: 'revenue-accelerate/overview', component: RevenueAccelerateOverviewPage, name: 'revenue-accelerate-overview' },
        { path: 'revenue-accelerate/settings', component: RevenueAccelerateSettingsPage, name: 'revenue-accelerate-settings' },

        // Accounts & Balances (BP) sub-tabs
        { path: 'accounts-balances/account-holders', component: BPAccountHoldersPage, name: 'bp-account-holders' },
        { path: 'accounts-balances/balance-accounts', component: BalanceAccountsPage, name: 'balance-accounts' },

        // Financial Products sub-tabs
        { path: 'financial-products/payment-instruments', component: PaymentInstrumentsPage, name: 'payment-instruments' },
        { path: 'financial-products/card-orders', component: CardOrdersPage, name: 'card-orders' },
        { path: 'financial-products/transaction-rules', component: TransactionRulesPage, name: 'transaction-rules' },
        { path: 'financial-products/issuing-disputes', component: IssuingDisputesPage, name: 'issuing-disputes' },
        { path: 'financial-products/capital', component: CapitalOverviewPage, name: 'capital-overview' },

        // Marketpay sub-tabs
        { path: 'marketpay/configuration', component: MarketpayConfigurationPage, name: 'marketpay-configuration' },
        { path: 'marketpay/overview', component: MarketplaceOverviewPage, name: 'marketplace-overview' },
        { path: 'marketpay/submerchant-search', component: SubmerchantSearchPage, name: 'submerchant-search' },
        { path: 'marketpay/split-configuration', component: SplitConfigurationPage, name: 'split-configuration' },

        // Experimentation sub-tabs
        { path: 'experimentation/platform', component: ExperimentationPage, name: 'experimentation' },
        { path: 'experimentation/merchant-experiments', component: MerchantExperimentsPage, name: 'merchant-experiments' },

        // AML sub-tabs
        { path: 'aml/alerts', component: AmlAlertsPage, name: 'aml-alerts' },
        { path: 'aml/case-management', component: AmlCaseManagementPage, name: 'aml-case-management' },
        { path: 'aml/legal-entity', component: AmlLegalEntityPage, name: 'aml-legal-entity' },

        // Toolkit sub-tabs
        { path: 'toolkit/payment-batches', component: PaymentBatchesPage, name: 'payment-batches' },
        { path: 'toolkit/account-tool', component: AccountToolPage, name: 'account-tool' },
        { path: 'toolkit/account-data-explorer', component: AccountDataExplorerPage, name: 'account-data-explorer' },
        { path: 'toolkit/secrets-manager', component: SecretsManagerPage, name: 'secrets-manager' },

        // System Monitoring sub-tabs
        { path: 'monitoring/overview', component: MonitoringOverviewPage, name: 'monitoring-overview' },
        { path: 'monitoring/system-checks', component: SystemChecksPage, name: 'system-checks' },
        { path: 'monitoring/topics', component: TopicsPage, name: 'topics' },
        { path: 'monitoring/signals', component: SignalsPage, name: 'signals' },

        // Reconciliation sub-tabs
        { path: 'reconciliation/matching', component: MatchingScreenPage, name: 'matching-screen' },
        { path: 'reconciliation/journal-creator', component: JournalCreatorPage, name: 'journal-creator' },
        { path: 'reconciliation/booking-requests', component: BookingRequestsPage, name: 'booking-requests' },
        { path: 'reconciliation/rec-center', component: RecCenterPage, name: 'rec-center' },

        // Resources sub-tabs
        { path: 'resources/dev-ops', component: DevOpsPage, name: 'dev-ops' },
        { path: 'resources/features', component: FeaturesPage, name: 'features' },
        { path: 'resources/roles-manager', component: RolesManagerPage, name: 'roles-manager' },
        { path: 'resources/job-configurations', component: JobConfigurationsPage, name: 'job-configurations' },

        // Task Management sub-tabs
        { path: 'task-management/tasks', component: TasksPage, name: 'tasks' },
        { path: 'task-management/workflows', component: WorkflowsPage, name: 'workflows' },
        { path: 'task-management/workflow-statistics', component: WorkflowStatisticsPage, name: 'workflow-statistics' },

        // CRR Admin sub-tabs
        { path: 'crr-admin/reviews', component: CrrReviewsPage, name: 'crr-reviews' },
        { path: 'crr-admin/scope-settings', component: CrrScopeSettingsPage, name: 'crr-scope-settings' },

        // ARC sub-tabs
        { path: 'arc/form-templates', component: FormTemplatesPage, name: 'form-templates' },
      ],
    },
  ],
});
