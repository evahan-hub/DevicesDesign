<template>
  <div class="ar">
    <div class="ar__recency b-margin-bottom-070">
      <bento-typography variant="caption" secondary>
        Data up to Apr 9, 2026, 11:59 PM (UTC+1)
      </bento-typography>
    </div>

    <bento-summary-grid class="b-margin-bottom-100">
      <template #cell-1-1>
        <bento-summary-grid-item-percentage title="Authorisation rate" :label="data.authorisationRate.toFixed(1)" trend="0.3" />
      </template>
      <template #cell-1-2>
        <bento-summary-grid-item-amount title="Total received" :label="formatAmount(data.totalReceived.amount)" currency="EUR" />
      </template>
      <template #cell-1-3>
        <bento-summary-grid-item-amount title="Total authorised" :label="formatAmount(data.totalAuthorised.amount)" currency="EUR" />
      </template>
      <template #cell-1-4>
        <bento-summary-grid-item-amount title="Total refused" :label="formatAmount(data.totalRefused.amount)" currency="EUR" />
      </template>
    </bento-summary-grid>

    <bento-card class="b-margin-bottom-080">
      <template #default>Authorisation rate</template>
      <template #content>
        <div class="ar__chart-placeholder">
          <div v-for="point in chartData" :key="point.label" class="ar__chart-bar-group">
            <div class="ar__chart-bar" :style="{ height: `${point.value * 2}px` }"></div>
            <bento-typography variant="caption" class="ar__chart-label">{{ point.label }}</bento-typography>
          </div>
        </div>
      </template>
    </bento-card>

    <bento-card class="b-margin-bottom-080">
      <template #default>Authorisation breakdown by payment method</template>
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
          <template #item-trend="{ item }">
            <span :class="item.trend > 0 ? 'ar__trend--positive' : 'ar__trend--negative'">
              {{ item.trend > 0 ? '+' : '' }}{{ item.trend?.toFixed(1) }}%
            </span>
          </template>
        </bento-data-grid>
      </template>
    </bento-card>

    <bento-card>
      <template #default>Failed transactions breakdown</template>
      <template #content>
        <bento-data-grid
          :columns="refusalColumns"
          :data="data.refusalBreakdown"
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
  BentoSummaryGrid, BentoSummaryGridItemPercentage, BentoSummaryGridItemAmount,
  BentoCard, BentoDataGrid, BentoCurrency, BentoTypography,
} from '@adyen/bento-vue2';
import { MOCK_AUTHORISED_REFUSED, MOCK_CHART_DATA, formatAmount } from '../payment-lifecycle.mock-data';

const data = MOCK_AUTHORISED_REFUSED;
const chartData = MOCK_CHART_DATA;

const columns = ref<BentoColumn[]>([
  { field: 'dimension', label: 'Payment method', sortable: true },
  { field: 'amount', label: 'Amount', sortable: true, numeric: true },
  { field: 'count', label: 'Count', sortable: true, numeric: true },
  { field: 'rate', label: 'Auth rate', sortable: true, numeric: true },
  { field: 'trend', label: 'Trend', sortable: true, numeric: true },
]);

const refusalColumns = ref<BentoColumn[]>([
  { field: 'dimension', label: 'Refusal reason', sortable: true },
  { field: 'amount', label: 'Amount', sortable: true, numeric: true },
  { field: 'count', label: 'Count', sortable: true, numeric: true },
  { field: 'rate', label: 'Share', sortable: true, numeric: true },
]);
</script>

<style lang="scss" scoped>
.ar {
  &__recency {
    display: flex;
    align-items: center;
  }

  &__chart-placeholder {
    display: flex;
    align-items: flex-end;
    gap: var(--b-spacer-040);
    padding: var(--b-spacer-090) 0;
    min-height: 200px;
  }

  &__chart-bar-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__chart-bar {
    width: 100%;
    max-width: 40px;
    background-color: var(--b-color-background-brand);
    border-radius: var(--b-spacer-020) var(--b-spacer-020) 0 0;
  }

  &__chart-label {
    margin-top: var(--b-spacer-020);
    white-space: nowrap;
    font-size: 10px;
  }

  &__trend--positive { color: var(--b-color-text-success); }
  &__trend--negative { color: var(--b-color-text-critical); }
}
</style>
