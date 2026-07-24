<template>
  <div class="ttp">
    <bento-header
      title="Tap to Pay & card reader"
      description="Setup & manage your mobile devices"
      variant="page"
    />

    <!-- ── Loading state ───────────────────────────────────────────── -->
    <div v-if="pageState === 'loading'" class="ttp__loading-state">
      <bento-loading-indicator />
    </div>

    <!-- ── Error state ─────────────────────────────────────────────── -->
    <bento-alert v-else-if="pageState === 'error'" type="critical" class="b-margin-top-090">
      Failed to load device data. Please check your connection and try again.
    </bento-alert>

    <!-- ── Empty state ─────────────────────────────────────────────── -->
    <bento-empty-state
      v-else-if="pageState === 'empty'"
      title="No device data found"
      image="no-results-found"
      variant="full-page"
      :action="{ title: 'Reload', event: onRetry }"
    >
      There are no devices registered under your account.
    </bento-empty-state>

    <!-- ── Filled state ─────────────────────────────────────────────── -->
    <template v-else>

    <bento-tabs
      :active-tab-index="activeTabIndex"
      @update:active-tab-index="activeTabIndex = $event"
    >
      <bento-tab title="Payments App & OS versions" />
      <bento-tab title="SDK & OS versions" />
      <bento-tab title="Apple Tap to Pay T&Cs" />
      <bento-tab title="Registered Android apps" />
    </bento-tabs>

    <!-- ── Payments App & OS versions ──────────────────────────────────── -->
    <template v-if="activeTabIndex === 0">
      <h2 class="ttp__section-heading b-margin-top-090 b-margin-bottom-060">Payments App versions</h2>
      <bento-summary-grid class="b-margin-bottom-090">
        <template #cell-1-1>
          <bento-summary-grid-item-text title="Upcoming Android Payments App expiry" label="Aug 8, 2026 (1.2.0)" />
        </template>
        <template #cell-1-2>
          <bento-summary-grid-item-text title="Devices on expiring Payments Apps" label="300 (33%)" />
        </template>
        <template #cell-1-3>
          <bento-summary-grid-item-text title="Total devices in fleet" label="898" />
        </template>
      </bento-summary-grid>

      <div class="ttp__subsection-heading b-margin-bottom-060">
        <span>Installed Payments Apps</span>
        <bento-info-icon tooltip-text="Payments App versions currently installed across your registered devices" />
      </div>
      <bento-data-grid
        class="ttp__data-grid"
        :columns="appColumns"
        :data="paymentsAppData"
        :pagination="appPagination"
        @update:pagination="appPagination = $event"
      >
        <template #item-version="{ item }">
          <bento-link is-not-routing to="#" @click.prevent="goToDevices(item.platform, item.version)">
            {{ item.version }}
          </bento-link>
        </template>
        <template #item-status="{ item }">
          <bento-status :variant="sdkStatusVariant(item.status)">{{ item.status }}</bento-status>
        </template>
        <template #item-actions="{ item }">
          <bento-button variant="secondary" size="small" @click="onReleaseNotes(item)">Release notes</bento-button>
        </template>
      </bento-data-grid>

      <h2 class="ttp__section-heading b-margin-top-100 b-margin-bottom-060">OS versions</h2>
      <bento-summary-grid class="b-margin-bottom-090">
        <template #cell-1-1>
          <bento-summary-grid-item-text title="Minimum Android version" label="12" />
        </template>
        <template #cell-1-2>
          <bento-summary-grid-item-text title="Devices on minimum OS version" label="800" />
        </template>
        <template #cell-1-3>
          <bento-summary-grid-item-text title="Total devices in fleet" label="898" />
        </template>
      </bento-summary-grid>

      <div class="ttp__subsection-heading b-margin-bottom-060">
        <span>Installed OS versions</span>
        <bento-info-icon tooltip-text="Operating system versions currently running across your registered devices" />
      </div>
      <bento-data-grid class="ttp__data-grid" :columns="osColumns" :data="paymentsAppOSData">
        <template #item-status="{ item }">
          <bento-status :variant="osStatusVariant(item.status)">{{ item.status }}</bento-status>
        </template>
      </bento-data-grid>
    </template>

    <!-- ── SDK & OS versions ───────────────────────────────────────────── -->
    <template v-if="activeTabIndex === 1">
      <h2 class="ttp__section-heading b-margin-top-090 b-margin-bottom-060">SDK versions</h2>
      <bento-summary-grid class="b-margin-bottom-090">
        <template #cell-1-1>
          <bento-summary-grid-item-text title="Upcoming Android SDK expiry" label="In 8 days (2.11.0)" />
        </template>
        <template #cell-1-2>
          <bento-summary-grid-item-text title="Upcoming iOS SDK expiry" label="In 40 days (3.14.0)" />
        </template>
        <template #cell-1-3>
          <bento-summary-grid-item-text title="Devices on expiring SDKs" label="9 (50.00%)" />
        </template>
        <template #cell-1-4>
          <bento-summary-grid-item-text title="Total devices in fleet" label="18" />
        </template>
      </bento-summary-grid>

      <div class="ttp__subsection-heading b-margin-bottom-060">
        <span>Installed SDKs</span>
        <bento-info-icon tooltip-text="SDK versions currently installed across your registered mobile devices" />
      </div>
      <bento-data-grid
        class="ttp__data-grid"
        :columns="sdkColumns"
        :data="sdkData"
        :pagination="sdkPagination"
        @update:pagination="sdkPagination = $event"
      >
        <template #item-version="{ item }">
          <bento-link is-not-routing to="#" @click.prevent="goToDevices(item.platform, item.version)">
            {{ item.version }}
          </bento-link>
        </template>
        <template #item-status="{ item }">
          <bento-status :variant="sdkStatusVariant(item.status)">{{ item.status }}</bento-status>
        </template>
        <template #item-actions="{ item }">
          <bento-button variant="secondary" size="small" @click="onReleaseNotes(item)">Release notes</bento-button>
        </template>
      </bento-data-grid>

      <h2 class="ttp__section-heading b-margin-top-100 b-margin-bottom-060">OS versions</h2>
      <bento-summary-grid class="b-margin-bottom-090">
        <template #cell-1-1>
          <bento-summary-grid-item-text title="Minimum Android version" label="12" />
        </template>
        <template #cell-1-2>
          <bento-summary-grid-item-text title="Minimum iOS version" label="17.0" />
        </template>
        <template #cell-1-3>
          <bento-summary-grid-item-text title="Devices on minimum OS version" label="0" />
        </template>
        <template #cell-1-4>
          <bento-summary-grid-item-text title="Devices on unsupported OS" label="0" />
        </template>
      </bento-summary-grid>

      <div class="ttp__subsection-heading b-margin-bottom-060">
        <span>Installed OS versions</span>
        <bento-info-icon tooltip-text="Operating system versions currently running across your registered mobile devices" />
      </div>
      <bento-data-grid class="ttp__data-grid" :columns="osColumns" :data="osData">
        <template #item-status="{ item }">
          <bento-status :variant="osStatusVariant(item.status)">{{ item.status }}</bento-status>
        </template>
      </bento-data-grid>
    </template>

    <!-- ── Placeholder tabs ────────────────────────────────────────────── -->
    <p v-if="activeTabIndex === 2" class="ttp__placeholder b-margin-top-100">
      Apple Tap to Pay T&amp;Cs content
    </p>
    <p v-if="activeTabIndex === 3" class="ttp__placeholder b-margin-top-100">
      Registered Android apps content
    </p>

    </template><!-- end filled state -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  BentoHeader, BentoTabs, BentoTab,
  BentoSummaryGrid, BentoSummaryGridItemText,
  BentoDataGrid, BentoButton, BentoLink,
  BentoLoadingIndicator, BentoEmptyState, BentoAlert,
  BentoInfoIcon, BentoStatus,
} from '@adyen/bento-vue2';
import type { BentoColumn } from '@adyen/bento-vue2';
import { BentoColumnOverflow } from '@adyen/bento-vue2';
import { useRouter } from 'vue-router/composables';

export type TapToPayPageState = 'loading' | 'error' | 'empty' | 'filled';

const props = withDefaults(defineProps<{
  pageState?: TapToPayPageState;
}>(), {
  pageState: 'filled',
});

type SdkStatus = 'Expiring' | 'Active' | 'Expired';
type OsStatus  = 'Minimum'  | 'Supported' | 'Unsupported';

interface SdkRow {
  id: string; platform: string; version: string; status: SdkStatus;
  expiryDate: string; devices: number; stores: number; merchantAccounts: number;
  [key: string]: unknown;
}
interface OsRow {
  id: string; platform: string; version: string; status: OsStatus;
  devices: number; stores: number; merchantAccounts: number;
  [key: string]: unknown;
}

const router = useRouter();
const activeTabIndex = ref(1);

const appPagination = ref({ page: 1, size: 5, totalCount: 3,  pageSizes: [5, 10, 25] });
const sdkPagination = ref({ page: 1, size: 5, totalCount: 8,  pageSizes: [5, 10, 25] });

// ── Column definitions ────────────────────────────────────────────────────────

const sharedSdkColumns: BentoColumn[] = [
  { field: 'status',           label: 'Status',            minWidth: 140 },
  { field: 'expiryDate',       label: 'Expiry date',       minWidth: 150, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'devices',          label: 'Devices',           minWidth: 100, numeric: true },
  { field: 'stores',           label: 'Stores',            minWidth: 100, numeric: true },
  { field: 'merchantAccounts', label: 'Merchant accounts', minWidth: 170, numeric: true },
  { field: 'actions',          label: '',                  minWidth: 150 },
];

const appColumns: BentoColumn[] = [
  { field: 'platform', label: 'Platform',              minWidth: 120 },
  { field: 'version',  label: 'Payments App Version',  minWidth: 190 },
  ...sharedSdkColumns,
];

const sdkColumns: BentoColumn[] = [
  { field: 'platform', label: 'Platform',    minWidth: 120 },
  { field: 'version',  label: 'SDK Version', minWidth: 170 },
  ...sharedSdkColumns,
];

const osColumns: BentoColumn[] = [
  { field: 'platform',         label: 'Platform',          minWidth: 150 },
  { field: 'version',          label: 'OS version',        minWidth: 150 },
  { field: 'status',           label: 'Status',            minWidth: 150 },
  { field: 'devices',          label: 'Devices',           minWidth: 150, numeric: true },
  { field: 'stores',           label: 'Stores',            minWidth: 150, numeric: true },
  { field: 'merchantAccounts', label: 'Merchant accounts', minWidth: 180, numeric: true },
];

// ── Mock data ─────────────────────────────────────────────────────────────────

const paymentsAppData: SdkRow[] = [
  { id: 'pa-a-120', platform: 'Android', version: '1.2.0', status: 'Expiring', expiryDate: 'Aug 8, 2026',  devices: 300, stores: 265, merchantAccounts: 2 },
  { id: 'pa-a-130', platform: 'Android', version: '1.3.0', status: 'Active',   expiryDate: 'Aug 29, 2026', devices: 500, stores: 450, merchantAccounts: 3 },
  { id: 'pa-a-101', platform: 'Android', version: '1.0.1', status: 'Expired',  expiryDate: 'Apr 9, 2026',  devices: 98,  stores: 87,  merchantAccounts: 1 },
];

const paymentsAppOSData: OsRow[] = [
  { id: 'paos-a-12', platform: 'Android', version: '12', status: 'Minimum',     devices: 800, stores: 715, merchantAccounts: 3 },
  { id: 'paos-a-11', platform: 'Android', version: '11', status: 'Unsupported', devices: 98,  stores: 87,  merchantAccounts: 1 },
];

const sdkData: SdkRow[] = [
  { id: 'sdk-a-2110', platform: 'Android', version: '2.11.0', status: 'Expiring', expiryDate: 'Jun 6, 2026',  devices: 1, stores: 0, merchantAccounts: 1 },
  { id: 'sdk-i-3140', platform: 'iOS',     version: '3.14.0', status: 'Expiring', expiryDate: 'Jul 8, 2026',  devices: 8, stores: 2, merchantAccounts: 4 },
  { id: 'sdk-a-261',  platform: 'Android', version: '2.6.1',  status: 'Expired',  expiryDate: 'Dec 29, 2025', devices: 1, stores: 0, merchantAccounts: 1 },
  { id: 'sdk-a-251',  platform: 'Android', version: '2.5.1',  status: 'Expired',  expiryDate: 'Jan 5, 2026',  devices: 2, stores: 0, merchantAccounts: 2 },
  { id: 'sdk-a-290',  platform: 'Android', version: '2.9.0',  status: 'Expired',  expiryDate: 'Apr 8, 2026',  devices: 1, stores: 0, merchantAccounts: 1 },
  { id: 'sdk-i-3120', platform: 'iOS',     version: '3.12.0', status: 'Expired',  expiryDate: 'Mar 15, 2026', devices: 3, stores: 1, merchantAccounts: 2 },
  { id: 'sdk-a-2100', platform: 'Android', version: '2.10.0', status: 'Expired',  expiryDate: 'May 20, 2026', devices: 2, stores: 0, merchantAccounts: 1 },
  { id: 'sdk-i-3130', platform: 'iOS',     version: '3.13.0', status: 'Expiring', expiryDate: 'Aug 1, 2026',  devices: 5, stores: 2, merchantAccounts: 3 },
];

const osData: OsRow[] = [
  { id: 'os-a-15', platform: 'Android', version: '15', status: 'Supported', devices: 3, stores: 0, merchantAccounts: 2 },
  { id: 'os-a-16', platform: 'Android', version: '16', status: 'Supported', devices: 6, stores: 0, merchantAccounts: 3 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function sdkStatusVariant(status: SdkStatus): 'green' | 'yellow' | 'red' {
  if (status === 'Active')  return 'green';
  if (status === 'Expired') return 'red';
  return 'yellow';
}

function osStatusVariant(status: OsStatus): 'green' | 'yellow' | 'red' {
  if (status === 'Supported')   return 'green';
  if (status === 'Unsupported') return 'red';
  return 'yellow';
}

function goToDevices(platform: string, version: string): void {
  router.push({
    path: '/in-person-payments/terminals',
    query: { tab: 'mobile', platform, version },
  }).catch(() => {});
}

function onReleaseNotes(_item: SdkRow): void { /* placeholder */ }

function onRetry(): void { /* placeholder */ }
</script>

<style lang="scss" scoped>
.ttp {
  padding: var(--b-spacer-090);

  ::v-deep .b-header-meta__description {
    margin-bottom: var(--b-spacer-070);
  }

  &__section-heading {
    font-size: var(--b-text-title-m-font-size);
    font-family: var(--b-text-title-m-font-family);
    font-weight: var(--b-text-title-m-font-weight);
    color: var(--b-color-label-primary);
    margin: 0;
  }

  &__subsection-heading {
    display: flex;
    align-items: center;
    gap: var(--b-spacer-030);
    font-size: var(--b-text-title-font-size);
    font-family: var(--b-text-title-font-family);
    font-weight: var(--b-text-title-font-weight);
    color: var(--b-color-label-primary);
    margin: 0;
  }

  &__loading-state {
    display: flex;
    justify-content: center;
    padding: var(--b-spacer-110) 0;
  }

  &__data-grid {
    border: var(--b-border-width-s) solid var(--b-color-separator-primary);
    border-radius: var(--b-border-radius-m);
    overflow: hidden;
  }

  &__placeholder {
    color: var(--b-color-label-secondary);
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
  }
}
</style>
