<template>
  <div class="root-layout">
    <!-- Full-width top header: account cell (over sidebar) + top bar -->
    <header class="top-header">
      <div class="account-cell">
        <button class="account-toggle" aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
            <path fill="var(--b-color-label-primary)" d="M1.25 2.583h13.5v1.5H1.25v-1.5ZM1.25 7.25h13.5v1.5H1.25v-1.5ZM14.75 11.917H1.25v1.5h13.5v-1.5Z" />
          </svg>
        </button>
        <div class="account-switcher">
          <div class="account-logo" />
          <div class="account-meta">
            <span class="account-name">AdyenTechSupport</span>
            <span class="account-type">Company</span>
          </div>
          <svg class="account-chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
            <path fill="var(--b-color-label-secondary)" d="M8 4.06 11 7.06l1.06-1.06L8 1.94 3.94 6 5 7.06 8 4.06ZM8 11.94 5 8.94 3.94 10 8 14.06 12.06 10 11 8.94 8 11.94Z" />
          </svg>
        </div>
      </div>
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
    </header>

    <!-- Body: sidebar + content -->
    <div class="app-body">
      <SideNavigation />
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
};

const PAGE_LABELS: Record<string, string> = {
  'tap-to-pay': 'Tap to pay & card reader',
  'orders-returns': 'Orders & returns',
  'stores': 'Stores',
  'terminals': 'Terminals',
  'terminal-settings': 'Terminal settings',
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
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* Full-width top header row */
.top-header {
  display: flex;
  align-items: stretch;
  flex: 0 0 auto;
}

/* Account cell sits above the sidebar and aligns with its width */
.account-cell {
  width: 248px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: var(--b-spacer-040);
  padding: var(--b-spacer-040);
  background-color: var(--b-color-background-secondary);
  border-bottom: 1px solid var(--b-color-separator-primary);
  border-right: 1px solid var(--b-color-separator-primary);
}

.account-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border: none;
  background-color: transparent;
  border-radius: var(--b-border-radius-m);
  cursor: pointer;
}
.account-toggle:hover {
  background-color: var(--b-color-background-secondary-hover);
}

.account-switcher {
  display: flex;
  align-items: center;
  gap: var(--b-spacer-060);
  flex: 1;
  min-width: 0;
  padding: var(--b-spacer-020) var(--b-spacer-040);
  border-radius: var(--b-border-radius-m);
  cursor: pointer;
}
.account-switcher:hover {
  background-color: var(--b-color-background-secondary-hover);
}

.account-logo {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: var(--b-border-radius-m);
  background-color: var(--b-color-decorative-green);
}

.account-meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.account-name {
  font-family: var(--b-text-body-font-family);
  font-size: var(--b-text-body-font-size);
  font-weight: var(--b-text-body-stronger-font-weight);
  line-height: var(--b-text-body-line-height);
  color: var(--b-color-label-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.account-type {
  font-family: var(--b-text-caption-font-family);
  font-size: var(--b-text-caption-font-size);
  line-height: var(--b-text-caption-line-height);
  color: var(--b-color-label-secondary);
}

.account-chevron {
  flex-shrink: 0;
}

/* Body row: sidebar + content */
.app-body {
  flex: 1;
  display: flex;
  min-height: 0;
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
