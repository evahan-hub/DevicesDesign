<template>
  <div class="ra">
    <bento-summary-grid class="b-margin-bottom-100">
      <template #cell-1-1>
        <bento-summary-grid-item-amount title="Total refunds" :label="formatAmount(data.totalRefunds.amount)" currency="EUR" />
      </template>
      <template #cell-1-2>
        <bento-summary-grid-item-numeric title="Refund count" :label="formatCount(data.totalRefunds.count)" />
      </template>
      <template #cell-1-3>
        <bento-summary-grid-item-percentage title="Refund rate" :label="data.refundRate.toFixed(1)" />
      </template>
    </bento-summary-grid>

    <bento-card>
      <template #default>Breakdown by refund reason</template>
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
  BentoSummaryGrid, BentoSummaryGridItemAmount, BentoSummaryGridItemNumeric, BentoSummaryGridItemPercentage,
  BentoCard, BentoDataGrid, BentoCurrency,
} from '@adyen/bento-vue2';
import { MOCK_REFUND_ACTIVITY, formatAmount, formatCount } from '../risk-dispute-management.mock-data';

const data = MOCK_REFUND_ACTIVITY;

const columns = ref<BentoColumn[]>([
  { field: 'dimension', label: 'Reason', sortable: true },
  { field: 'amount', label: 'Amount', sortable: true, numeric: true },
  { field: 'count', label: 'Count', sortable: true, numeric: true },
  { field: 'rate', label: 'Share', sortable: true, numeric: true },
]);
</script>

<style lang="scss" scoped>
.ra {}
</style>
