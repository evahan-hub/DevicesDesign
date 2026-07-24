<template>
  <div class="pr">
    <div class="pr__recency b-margin-bottom-070">
      <bento-typography variant="caption" secondary>
        Data up to Apr 9, 2026, 11:59 PM (UTC+1)
      </bento-typography>
    </div>

    <bento-summary-grid class="b-margin-bottom-100">
      <template #cell-1-1>
        <bento-summary-grid-item-amount title="Total sales" :label="formatAmount(data.totalSales.amount)" currency="EUR" />
      </template>
      <template #cell-1-2>
        <bento-summary-grid-item-amount title="Total refunds" :label="formatAmount(data.totalRefunds.amount)" currency="EUR" />
      </template>
      <template #cell-1-3>
        <bento-summary-grid-item-amount title="Referenced refunds" :label="formatAmount(data.referencedRefunds.amount)" currency="EUR" />
      </template>
      <template #cell-1-4>
        <bento-summary-grid-item-amount title="Avg. transaction value" :label="formatAmount(data.atv)" currency="EUR" />
      </template>
    </bento-summary-grid>

    <bento-card>
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
          <template #item-trend="{ item }">
            <span :class="item.trend > 0 ? 'pr__trend--positive' : 'pr__trend--negative'">
              {{ item.trend > 0 ? '+' : '' }}{{ item.trend?.toFixed(1) }}%
            </span>
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
  BentoSummaryGrid, BentoSummaryGridItemAmount,
  BentoCard, BentoDataGrid, BentoCurrency, BentoTypography,
} from '@adyen/bento-vue2';
import { MOCK_PURCHASES_REFUNDS, formatAmount } from '../payment-lifecycle.mock-data';

const data = MOCK_PURCHASES_REFUNDS;

const columns = ref<BentoColumn[]>([
  { field: 'dimension', label: 'Payment method', sortable: true },
  { field: 'amount', label: 'Amount', sortable: true, numeric: true },
  { field: 'count', label: 'Count', sortable: true, numeric: true },
  { field: 'trend', label: 'Trend', sortable: true, numeric: true },
]);
</script>

<style lang="scss" scoped>
.pr {
  &__recency {
    display: flex;
    align-items: center;
  }

  &__trend--positive { color: var(--b-color-text-success); }
  &__trend--negative { color: var(--b-color-text-critical); }
}
</style>
