<template>
  <div class="bbr">
    <bento-summary-grid class="b-margin-bottom-100">
      <template #cell-1-1>
        <bento-summary-grid-item-amount title="Total blocked" :label="formatAmount(data.totalBlocked.amount)" currency="EUR" />
      </template>
      <template #cell-1-2>
        <bento-summary-grid-item-amount title="Blocked (pre-auth)" :label="formatAmount(data.blockedPreAuth.amount)" currency="EUR" />
      </template>
      <template #cell-1-3>
        <bento-summary-grid-item-amount title="Blocked (post-auth)" :label="formatAmount(data.blockedPostAuth.amount)" currency="EUR" />
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
  BentoSummaryGrid, BentoSummaryGridItemAmount,
  BentoCard, BentoDataGrid, BentoCurrency,
} from '@adyen/bento-vue2';
import { MOCK_BLOCKED_BY_RISK, formatAmount } from '../risk-dispute-management.mock-data';

const data = MOCK_BLOCKED_BY_RISK;

const columns = ref<BentoColumn[]>([
  { field: 'dimension', label: 'Payment method', sortable: true },
  { field: 'amount', label: 'Amount', sortable: true, numeric: true },
  { field: 'count', label: 'Count', sortable: true, numeric: true },
  { field: 'rate', label: 'Block rate', sortable: true, numeric: true },
]);
</script>

<style lang="scss" scoped>
.bbr {}
</style>
