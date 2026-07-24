<template>
  <div class="auth">
    <div class="auth__recency b-margin-bottom-070">
      <bento-typography variant="caption" secondary>
        Data up to Apr 9, 2026, 11:59 PM (UTC+1)
      </bento-typography>
    </div>

    <bento-summary-grid class="b-margin-bottom-100">
      <template #cell-1-1>
        <bento-summary-grid-item-percentage title="Conversion rate" :label="data.conversionRate.toFixed(1)" trend="0.4" />
      </template>
      <template #cell-1-2>
        <bento-summary-grid-item-percentage title="Drop-off rate" :label="data.dropoffRate.toFixed(1)" trend="-0.4" />
      </template>
      <template #cell-1-3>
        <bento-summary-grid-item-numeric title="Initiated" :label="formatCount(data.initiated.count)" trend="1.2%" trend-direction="positive" />
      </template>
      <template #cell-1-4>
        <bento-summary-grid-item-numeric title="Successful" :label="formatCount(data.successfulAuthentications.count)" trend="1.5%" trend-direction="positive" />
      </template>
      <template #cell-1-5>
        <bento-summary-grid-item-numeric title="Failed" :label="formatCount(data.failedAuthentications.count)" trend="-0.8%" trend-direction="positive" />
      </template>
    </bento-summary-grid>

    <bento-card class="b-margin-bottom-080">
      <template #default>Breakdown by payment method</template>
      <template #content>
        <bento-data-grid
          :columns="columns"
          :data="data.breakdown"
          fit-content
        >
          <template #item-amount="{ item }">
            <bento-currency currency="EUR" :value="item.amount" />
          </template>
          <template #item-rate="{ item }">
            {{ item.rate?.toFixed(1) }}%
          </template>
        </bento-data-grid>
      </template>
    </bento-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { BentoColumn } from '@adyen/bento-vue2';
import {
  BentoSummaryGrid, BentoSummaryGridItemPercentage, BentoSummaryGridItemNumeric,
  BentoCard, BentoDataGrid, BentoCurrency, BentoTypography,
} from '@adyen/bento-vue2';
import { MOCK_AUTHENTICATION, formatCount } from '../payment-lifecycle.mock-data';

const data = MOCK_AUTHENTICATION;

const columns = ref<BentoColumn[]>([
  { field: 'dimension', label: 'Payment method', sortable: true },
  { field: 'amount', label: 'Amount', sortable: true, numeric: true },
  { field: 'count', label: 'Count', sortable: true, numeric: true },
  { field: 'rate', label: 'Rate', sortable: true, numeric: true },
]);
</script>

<style lang="scss" scoped>
.auth {
  &__recency {
    display: flex;
    align-items: center;
  }
}
</style>
