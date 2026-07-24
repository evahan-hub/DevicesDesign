<template>
  <div class="plc">
    <bento-header
      title="Payment lifecycle"
      variant="page"
      :actions="headerActions"
    />

    <div class="plc__filter-bar b-margin-top-090 b-margin-bottom-070">
      <bento-button variant="secondary" :condensed="true" @click="viewsOpen = !viewsOpen">
        <template #iconLeft>
          <show-icon svg-title="Views" />
        </template>
        No view selected
        <template #iconRight>
          <chevron-down-icon svg-title="Open" />
        </template>
      </bento-button>

      <bento-divider orientation="vertical" class="plc__divider" />

      <bento-filter-bar
        :config="filterConfig"
        :filter-values-object="filterValues"
        @update:filter-values-object="onFilterChange"
      />
    </div>

    <bento-tabs
      :active-tab-index="activeTab"
      @update:active-tab-index="activeTab = $event"
    >
      <bento-tab v-for="tab in tabs" :key="tab" :title="tab" />
    </bento-tabs>

    <div class="b-margin-y-100">
      <full-funnel-overview v-if="activeTab === 0" />
      <authentication-and-dropoff v-else-if="activeTab === 1" />
      <authorised-and-refused v-else-if="activeTab === 2" />
      <purchases-and-refunds v-else-if="activeTab === 3" />
      <chargebacks-and-disputes v-else-if="activeTab === 4" />
      <settlements-and-fees v-else-if="activeTab === 5" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue';
import {
  BentoHeader, BentoTabs, BentoTab,
  BentoButton, BentoDivider,
  BentoFilterBar, BentoFilterItemType,
} from '@adyen/bento-vue2';
import type { BentoFilterBarModel, BentoFilterValueObject } from '@adyen/bento-vue2';
import DownloadIcon from '@adyen/ui-assets-icons-16/vue/download';
import ShareIcon from '@adyen/ui-assets-icons-16/vue/share-2';
import InfoIcon from '@adyen/ui-assets-icons-16/vue/info';
import SettingsIcon from '@adyen/ui-assets-icons-16/vue/settings';
import ShowIcon from '@adyen/ui-assets-icons-16/vue/show';
import ChevronDownIcon from '@adyen/ui-assets-icons-16/vue/chevron-down';

import FullFunnelOverview from './views/FullFunnelOverview.vue';
import AuthenticationAndDropoff from './views/AuthenticationAndDropoff.vue';
import AuthorisedAndRefused from './views/AuthorisedAndRefused.vue';
import PurchasesAndRefunds from './views/PurchasesAndRefunds.vue';
import ChargebacksAndDisputes from './views/ChargebacksAndDisputes.vue';
import SettlementsAndFees from './views/SettlementsAndFees.vue';
import { TABS } from './payment-lifecycle.mock-data';

const activeTab = ref(0);
const tabs = TABS;
const viewsOpen = ref(false);

const headerActions = [
  { title: '', variant: 'secondary' as const, iconOnly: true, icon: DownloadIcon, event: () => console.log('Download') },
  { title: '', variant: 'secondary' as const, iconOnly: true, icon: ShareIcon, event: () => console.log('Share') },
  { title: 'Learn more', variant: 'secondary' as const, icon: InfoIcon, event: () => console.log('Learn more') },
  { title: 'Settings', variant: 'secondary' as const, icon: SettingsIcon, event: () => console.log('Settings') },
];

const today = new Date();
const thirtyDaysAgo = new Date(today);
thirtyDaysAgo.setDate(today.getDate() - 30);
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const filterConfig: BentoFilterBarModel = [
  {
    field: 'dateRange',
    label: 'Date range',
    type: BentoFilterItemType.DATE_RANGE,
    visible: true,
    options: {
      quickSelectRanges: [
        { label: 'Last 7 days', value: 'last7', data: { startDate: (() => { const d = new Date(); d.setDate(d.getDate() - 7); return d; })(), endDate: yesterday } },
        { label: 'Last 14 days', value: 'last14', data: { startDate: (() => { const d = new Date(); d.setDate(d.getDate() - 14); return d; })(), endDate: yesterday } },
        { label: 'Last 30 days', value: 'last30', data: { startDate: thirtyDaysAgo, endDate: yesterday } },
        { label: 'Last 60 days', value: 'last60', data: { startDate: (() => { const d = new Date(); d.setDate(d.getDate() - 60); return d; })(), endDate: yesterday } },
      ],
    },
  },
  {
    field: 'merchantAccount',
    label: 'Merchant account',
    type: BentoFilterItemType.SELECT,
    visible: true,
    options: {
      multiple: true,
      dynamicFiltering: true,
      listboxItems: [
        { label: 'AdyenTechSupport_TEST', value: 'AdyenTechSupport_TEST' },
        { label: 'AdyenTechSupport_LIVE_NL', value: 'AdyenTechSupport_LIVE_NL' },
        { label: 'AdyenTechSupport_LIVE_US', value: 'AdyenTechSupport_LIVE_US' },
        { label: 'AdyenTechSupport_LIVE_DE', value: 'AdyenTechSupport_LIVE_DE' },
        { label: 'AdyenTechSupport_LIVE_FR', value: 'AdyenTechSupport_LIVE_FR' },
        { label: 'AdyenTechSupport_LIVE_GB', value: 'AdyenTechSupport_LIVE_GB' },
      ],
    },
  },
  {
    field: 'issuerCountry',
    label: 'Issuer country/region',
    type: BentoFilterItemType.SELECT,
    visible: true,
    options: {
      multiple: true,
      dynamicFiltering: true,
      listboxItems: [
        { label: 'Netherlands', value: 'NL' },
        { label: 'United States', value: 'US' },
        { label: 'United Kingdom', value: 'GB' },
        { label: 'Germany', value: 'DE' },
        { label: 'France', value: 'FR' },
        { label: 'Belgium', value: 'BE' },
        { label: 'Spain', value: 'ES' },
        { label: 'Italy', value: 'IT' },
        { label: 'Canada', value: 'CA' },
        { label: 'Australia', value: 'AU' },
      ],
    },
  },
  {
    field: 'paymentMethod',
    label: 'Payment method',
    type: BentoFilterItemType.SELECT,
    visible: true,
    options: {
      multiple: true,
      dynamicFiltering: true,
      listboxItems: [
        { label: 'Visa', value: 'visa' },
        { label: 'Mastercard', value: 'mastercard' },
        { label: 'iDEAL', value: 'ideal' },
        { label: 'American Express', value: 'amex' },
        { label: 'Klarna', value: 'klarna' },
        { label: 'PayPal', value: 'paypal' },
        { label: 'Apple Pay', value: 'applepay' },
        { label: 'Google Pay', value: 'googlepay' },
        { label: 'Bancontact', value: 'bancontact' },
        { label: 'SEPA Direct Debit', value: 'sepadirectdebit' },
      ],
    },
  },
  {
    field: 'shopperInteraction',
    label: 'Shopper interaction',
    type: BentoFilterItemType.SELECT,
    visible: true,
    options: {
      multiple: true,
      listboxItems: [
        { label: 'Ecommerce', value: 'ecommerce' },
        { label: 'POS', value: 'pos' },
        { label: 'MOTO', value: 'moto' },
        { label: 'Recurring', value: 'recurring' },
      ],
    },
  },
];

const filterValues = ref<BentoFilterValueObject>({});

const onFilterChange = (values: BentoFilterValueObject) => {
  filterValues.value = values;
};

provide('plcFilters', filterValues);
</script>

<style lang="scss">
@use '@adyen/lume/scss';
</style>

<style lang="scss" scoped>
.plc {

  &__filter-bar {
    display: flex;
    align-items: center;
    gap: var(--b-spacer-040);
    flex-wrap: nowrap;
  }

  &__divider {
    height: 36px;
    flex-shrink: 0;
  }
}
</style>
