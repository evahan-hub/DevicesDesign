<template>
  <div class="root-layout">
    <SideNavigation />
    <div class="main-area">
      <TopBar>
        <nav v-if="breadcrumbs.length" class="breadcrumb">
          <span class="breadcrumb__item" :class="{ 'breadcrumb__item--active': breadcrumbs.length === 1 }">{{ breadcrumbs[0].label }}</span>
          <template v-if="breadcrumbs.length >= 2">
            <svg class="breadcrumb__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
              <path fill="var(--b-color-label-secondary)" d="M5.43924 10.9999L8.43924 7.99989L5.43924 4.99989L6.4999 3.93923L10.5606 7.99989L6.4999 12.0605L5.43924 10.9999Z" />
            </svg>
            <span class="breadcrumb__item breadcrumb__item--active">{{ breadcrumbs[1].label }}</span>
          </template>
        </nav>
      </TopBar>
      <div class="content-area">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router/composables';
import SideNavigation from '../../components/SideNavigation.vue';
import TopBar from '../../components/TopBar.vue';

const SECTION_LABELS: Record<string, string> = {
  'in-person-payments': 'In-person payments',
  'transactions': 'Transactions',
  'accounts': 'Accounts & balances',
  'revenue-risk': 'Revenue & risk',
  'finance': 'Finance',
  'insights': 'Insights',
  'pay-by-link': 'Pay by link',
  'giving': 'Giving',
  'developers': 'Developers',
  'partner': 'Partner',
  'reports': 'Reports',
  'treasury': 'Treasury',
  'finance-monitoring': 'Finance Monitoring',
  'payment-pricing': 'Payment Pricing',
  'monetization': 'Monetization',
  'communication': 'Communication',
  'virtual-terminal': 'Virtual Terminal',
  'own-advancements': 'Own Advancements',
  'tokenization': 'Tokenization',
  'revenue-accelerate': 'Revenue Accelerate',
  'accounts-balances': 'Accounts & Balances',
  'financial-products': 'Financial Products',
  'marketpay': 'Marketpay',
  'experimentation': 'Experimentation',
  'aml': 'AML',
  'toolkit': 'Toolkit',
  'monitoring': 'Monitoring',
  'reconciliation': 'Reconciliation',
  'resources': 'Resources',
  'task-management': 'Task Management',
  'crr-admin': 'CRR Admin',
  'arc': 'ARC',
};

const PAGE_LABELS: Record<string, string> = {
  'tap-to-pay': 'Tap to pay & card reader',
  'orders-returns': 'Orders & returns',
  'stores': 'Stores',
  'terminals': 'Terminals',
  'terminal-settings': 'Device settings',
  'android': 'Android',
  'payment-devices': 'Payment devices',
  'terminal-software': 'Terminal software',
  'themes': 'Themes',
  'payments': 'Payments',
  'offers': 'Offers',
  'payouts': 'Payouts',
  'account-holders': 'Account holders',
  'score': 'Score',
  'uplift-overview': 'Uplift overview',
  'recommendations': 'Recommendations',
  'case-management': 'Case management',
  'disputes': 'Disputes',
  'dynamic-3d-secure': 'Dynamic 3D Secure',
  'experiments': 'Experiments',
  'risk-fields': 'Risk fields',
  'risk-lists': 'Risk lists',
  'risk-profiles': 'Risk profiles',
  'risk-profile-details': 'Risk profile details',
  'settings': 'Settings',
  'balances-overview': 'Balances overview',
  'company-balances-overview': 'Company balances overview',
  'mpl': 'MPL',
  'invoices': 'Invoices',
  'sales-to-payouts': 'Sales to payouts',
  'payout-accounts': 'Payout accounts',
  'reporting-manager': 'Reporting manager',
  'integration-guide': 'Integration guide',
  'dashboard': 'Dashboard',
  'api-credentials': 'API credentials',
  'webhooks': 'Webhooks',
  'payment-links': 'Payment links',
  'campaigns': 'Campaigns',
  'overview': 'Overview',
  'referrals': 'Referrals',
  'merchant-access': 'Merchant access',
  'checkout': 'Checkout',
  'payment-lifecycle': 'Payment lifecycle',
  'risk-dispute-management': 'Risk & dispute management',
  'home': 'Home',
  'performance': 'Performance',
  'service-status': 'Service Status',
  'fx-control-center': 'FX Control Center',
  'target-balancing': 'Target Balancing',
  'future-balances': 'Future Balances',
  'monitor-types': 'Monitor Types',
  'monitors': 'Monitors',
  'finance-alerts': 'Alerts',
  'tracking-configurations': 'Tracking Configurations',
  'fee-framework': 'Fee Framework Explorer',
  'interchange': 'Interchange',
  'non-transactional-fees': 'Non-Transactional Fees',
  'pricing-schedules': 'Pricing Schedules',
  'pricing-proposals': 'Pricing Proposals',
  'product-catalog': 'Product Catalog',
  'create-message': 'Create New Message',
  'sent-messages': 'Sent Messages',
  'email-templates': 'Email Templates',
  'create-transaction': 'Create Transaction',
  'simulation-tool': 'Simulation Tool',
  'own-advancements-funding': 'Funding',
  'recharge-data': 'Recharge Data',
  'token-groups': 'Token Groups',
  'token-regions': 'Token Regions',
  'tokenization-properties': 'Tokenization Properties',
  'revenue-accelerate-overview': 'Overview',
  'revenue-accelerate-settings': 'Settings',
  'bp-account-holders': 'Account Holders',
  'balance-accounts': 'Balance Accounts',
  'payment-instruments': 'Payment Instruments',
  'card-orders': 'Card Orders',
  'transaction-rules': 'Transaction Rules',
  'issuing-disputes': 'Issuing Disputes',
  'capital-overview': 'Capital',
  'marketpay-configuration': 'Configuration',
  'marketplace-overview': 'Marketplace Overview',
  'submerchant-search': 'Sub-merchant Search',
  'split-configuration': 'Split Configuration',
  'experimentation': 'Platform',
  'merchant-experiments': 'Merchant Experiments',
  'aml-alerts': 'AML Alerts',
  'aml-case-management': 'Case Management',
  'aml-legal-entity': 'Legal Entity',
  'payment-batches': 'Payment Batches',
  'account-tool': 'Account Tool',
  'account-data-explorer': 'Account Data Explorer',
  'secrets-manager': 'Secrets Manager',
  'monitoring-overview': 'Overview',
  'system-checks': 'System Checks',
  'topics': 'Topics',
  'signals': 'Signals',
  'matching-screen': 'Matching Screen',
  'journal-creator': 'Journal Creator',
  'booking-requests': 'Booking Requests',
  'rec-center': 'Rec Center',
  'dev-ops': 'Dev Ops',
  'features': 'Features',
  'roles-manager': 'Roles Manager',
  'job-configurations': 'Job Configurations',
  'tasks': 'Tasks',
  'workflows': 'Workflows',
  'workflow-statistics': 'Workflow Statistics',
  'crr-reviews': 'Reviews',
  'crr-scope-settings': 'Scope Settings',
  'form-templates': 'Form Templates',
};

const route = useRoute();

const breadcrumbs = computed(() => {
  const path = route?.path || '/';
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return [{ label: 'Home' }];
  if (segments.length === 1) {
    const label = SECTION_LABELS[segments[0]] || PAGE_LABELS[segments[0]] || segments[0];
    return [{ label }];
  }
  const parentLabel = SECTION_LABELS[segments[0]] || segments[0];
  const pageLabel = PAGE_LABELS[segments[segments.length - 1]] || segments[segments.length - 1];
  return [{ label: parentLabel }, { label: pageLabel }];
});
</script>

<style scoped>
.root-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  background-color: var(--b-color-background-primary);
  padding-top: var(--b-spacer-080);
  padding-left: var(--b-spacer-090);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0;
}

.breadcrumb__item {
  font-family: var(--b-text-caption-font-family);
  font-size: var(--b-text-caption-font-size);
  line-height: var(--b-text-caption-line-height);
  font-weight: 400;
  color: var(--b-color-label-secondary);
  white-space: nowrap;
}

.breadcrumb__item--active {
  font-weight: 600;
  color: var(--b-color-label-primary);
}

.breadcrumb__icon {
  flex-shrink: 0;
}
</style>
