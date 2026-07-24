<template>
  <div class="rdm">
    <bento-header
      title="Risk & dispute management"
      variant="page"
      :actions="headerActions"
    />

    <div class="rdm__filters b-margin-top-070 b-margin-bottom-070">
      <bento-date-range-picker
        v-model="dateRange"
        label="Date range"
        class="rdm__date-picker"
      />
      <bento-dropdown
        v-model="currency"
        :options="currencyOptions"
        label="Currency"
        class="rdm__currency"
      />
    </div>

    <bento-tabs
      :active-tab-index="activeTab"
      @update:active-tab-index="activeTab = $event"
    >
      <bento-tab v-for="tab in tabs" :key="tab" :title="tab" />
    </bento-tabs>

    <div class="rdm__content b-margin-top-090">
      <div class="rdm__recency b-margin-bottom-070">
        <bento-typography variant="caption" secondary>
          Data up to Apr 9, 2026, 11:59 PM (UTC+1)
        </bento-typography>
      </div>

      <risk-overview v-if="activeTab === 0" />
      <allowed-by-risk v-else-if="activeTab === 1" />
      <blocked-by-risk v-else-if="activeTab === 2" />
      <card-monitoring-programs v-else-if="activeTab === 3" />
      <disputes-overview v-else-if="activeTab === 4" />
      <refund-activity v-else-if="activeTab === 5" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  BentoHeader, BentoTabs, BentoTab,
  BentoDateRangePicker, BentoDropdown, BentoTypography,
} from '@adyen/bento-vue2';

import RiskOverview from './views/RiskOverview.vue';
import AllowedByRisk from './views/AllowedByRisk.vue';
import BlockedByRisk from './views/BlockedByRisk.vue';
import CardMonitoringPrograms from './views/CardMonitoringPrograms.vue';
import DisputesOverview from './views/DisputesOverview.vue';
import RefundActivity from './views/RefundActivity.vue';
import { TABS } from './risk-dispute-management.mock-data';

const activeTab = ref(0);
const tabs = TABS;

const dateRange = ref({
  startDate: new Date('2026-03-11'),
  endDate: new Date('2026-04-09'),
});

const currency = ref('EUR');
const currencyOptions = [
  { label: 'EUR - Euro', value: 'EUR' },
  { label: 'USD - US Dollar', value: 'USD' },
  { label: 'GBP - British Pound', value: 'GBP' },
  { label: 'BRL - Brazilian Real', value: 'BRL' },
];

const headerActions = [
  { title: 'Download', variant: 'secondary' as const, event: () => console.log('Download') },
  { title: 'Share', variant: 'secondary' as const, event: () => console.log('Share') },
];
</script>

<style lang="scss" scoped>
.rdm {
  padding: var(--b-spacer-060);

  &__filters {
    display: flex;
    gap: var(--b-spacer-070);
    align-items: flex-end;
  }

  &__date-picker {
    max-width: 320px;
  }

  &__currency {
    max-width: 200px;
  }

  &__recency {
    display: flex;
    align-items: center;
  }

  &__content {
    min-height: 400px;
  }
}
</style>
