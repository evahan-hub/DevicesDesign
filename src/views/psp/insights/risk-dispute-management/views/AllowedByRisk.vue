<template>
  <div class="abr">
    <bento-summary-grid class="b-margin-bottom-100">
      <template #cell-1-1>
        <bento-summary-grid-item-amount title="Total allowed" :label="formatAmount(data.totalAllowed.amount)" currency="EUR" />
      </template>
      <template #cell-1-2>
        <bento-summary-grid-item-amount title="Chargebacks from allowed" :label="formatAmount(data.chargebacksFromAllowed.amount)" currency="EUR" />
      </template>
      <template #cell-1-3>
        <bento-summary-grid-item-percentage title="Fraud rate" :label="data.fraudRate.toFixed(2)" />
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
          <template #item-rate="{ item }">
            {{ item.rate?.toFixed(2) }}%
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
  BentoSummaryGrid, BentoSummaryGridItemAmount, BentoSummaryGridItemPercentage,
  BentoCard, BentoDataGrid, BentoCurrency,
} from '@adyen/bento-vue2';
import { MOCK_ALLOWED_BY_RISK, formatAmount } from '../risk-dispute-management.mock-data';

const data = MOCK_ALLOWED_BY_RISK;

const columns = ref<BentoColumn[]>([
  { field: 'dimension', label: 'Payment method', sortable: true },
  { field: 'amount', label: 'Amount', sortable: true, numeric: true },
  { field: 'count', label: 'Count', sortable: true, numeric: true },
  { field: 'rate', label: 'Fraud rate', sortable: true, numeric: true },
]);
</script>

<style lang="scss" scoped>
.abr {}
</style>
