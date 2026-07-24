<template>
  <div class="sf">
    <div class="sf__recency b-margin-bottom-070">
      <bento-typography variant="caption" secondary>
        Data up to Apr 9, 2026, 11:59 PM (UTC+1)
      </bento-typography>
    </div>

    <bento-summary-grid class="b-margin-bottom-100">
      <template #cell-1-1>
        <bento-summary-grid-item-amount title="Gross settlement" :label="formatAmount(data.grossSettlement.amount)" currency="EUR" />
      </template>
      <template #cell-1-2>
        <bento-summary-grid-item-amount title="Net settlement" :label="formatAmount(data.netSettlement.amount)" currency="EUR" />
      </template>
      <template #cell-1-3>
        <bento-summary-grid-item-amount title="Total fees" :label="formatAmount(data.totalFees.amount)" currency="EUR" />
      </template>
      <template #cell-1-4>
        <bento-summary-grid-item-amount title="Interchange" :label="formatAmount(data.interchange.amount)" currency="EUR" />
      </template>
      <template #cell-1-5>
        <bento-summary-grid-item-amount title="Scheme fees" :label="formatAmount(data.schemeFees.amount)" currency="EUR" />
      </template>
      <template #cell-1-6>
        <bento-summary-grid-item-amount title="Other fees" :label="formatAmount(data.otherFees.amount)" currency="EUR" />
      </template>
    </bento-summary-grid>

    <bento-card class="b-margin-bottom-080">
      <template #default>Settlements breakdown</template>
      <template #content>
        <bento-data-grid
          :columns="settlementColumns"
          :data="data.settlementsBreakdown"
          fit-content
        >
          <template #item-amount="{ item }">
            <bento-currency currency="EUR" :value="item.amount" />
          </template>
        </bento-data-grid>
      </template>
    </bento-card>

    <bento-card>
      <template #default>Fees &amp; commissions breakdown</template>
      <template #content>
        <bento-data-grid
          :columns="feesColumns"
          :data="data.feesBreakdown"
          fit-content
        >
          <template #item-amount="{ item }">
            <bento-currency currency="EUR" :value="item.amount" />
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
import { MOCK_SETTLEMENTS_FEES, formatAmount } from '../payment-lifecycle.mock-data';

const data = MOCK_SETTLEMENTS_FEES;

const settlementColumns = ref<BentoColumn[]>([
  { field: 'dimension', label: 'Payment method', sortable: true },
  { field: 'amount', label: 'Amount', sortable: true, numeric: true },
  { field: 'count', label: 'Count', sortable: true, numeric: true },
]);

const feesColumns = ref<BentoColumn[]>([
  { field: 'dimension', label: 'Payment method', sortable: true },
  { field: 'amount', label: 'Fee amount', sortable: true, numeric: true },
  { field: 'count', label: 'Transactions', sortable: true, numeric: true },
]);
</script>

<style lang="scss" scoped>
.sf {
  &__recency {
    display: flex;
    align-items: center;
  }
}
</style>
