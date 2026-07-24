<template>
  <div class="do">
    <bento-summary-grid class="b-margin-bottom-100">
      <template #cell-1-1>
        <bento-summary-grid-item-amount title="Total disputes" :label="formatAmount(data.totalDisputes.amount)" currency="EUR" />
      </template>
      <template #cell-1-2>
        <bento-summary-grid-item-numeric title="Open" :label="formatCount(data.openDisputes.count)" />
      </template>
      <template #cell-1-3>
        <bento-summary-grid-item-numeric title="Won" :label="formatCount(data.wonDisputes.count)" />
      </template>
      <template #cell-1-4>
        <bento-summary-grid-item-numeric title="Lost" :label="formatCount(data.lostDisputes.count)" />
      </template>
      <template #cell-1-5>
        <bento-summary-grid-item-percentage title="Chargeback rate" :label="data.chargebackRate.toFixed(2)" />
      </template>
    </bento-summary-grid>

    <bento-card>
      <template #default>Breakdown by dispute reason</template>
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
import { MOCK_DISPUTES, formatAmount, formatCount } from '../risk-dispute-management.mock-data';

const data = MOCK_DISPUTES;

const columns = ref<BentoColumn[]>([
  { field: 'dimension', label: 'Reason', sortable: true },
  { field: 'amount', label: 'Amount', sortable: true, numeric: true },
  { field: 'count', label: 'Count', sortable: true, numeric: true },
  { field: 'rate', label: 'Share', sortable: true, numeric: true },
]);
</script>

<style lang="scss" scoped>
.do {}
</style>
