<template>
  <div class="cb">
    <div class="cb__recency b-margin-bottom-070">
      <bento-typography variant="caption" secondary>
        Data up to Apr 9, 2026, 11:59 PM (UTC+1)
      </bento-typography>
    </div>

    <bento-summary-grid class="b-margin-bottom-100">
      <template #cell-1-1>
        <bento-summary-grid-item-percentage title="Chargeback rate" :label="data.chargebackRate.toFixed(2)" />
      </template>
      <template #cell-1-2>
        <bento-summary-grid-item-percentage title="NOF rate" :label="data.nofRate.toFixed(2)" />
      </template>
      <template #cell-1-3>
        <bento-summary-grid-item-amount title="Total chargebacks" :label="formatAmount(data.totalChargebacks.amount)" currency="EUR" />
      </template>
      <template #cell-1-4>
        <bento-summary-grid-item-numeric title="Chargeback count" :label="formatCount(data.totalChargebacks.count)" />
      </template>
      <template #cell-1-5>
        <bento-summary-grid-item-amount title="Total NOFs" :label="formatAmount(data.totalNofs.amount)" currency="EUR" />
      </template>
    </bento-summary-grid>

    <bento-card class="b-margin-bottom-080">
      <template #default>Chargebacks breakdown</template>
      <template #content>
        <bento-data-grid
          :columns="chargebackColumns"
          :data="data.chargebackBreakdown"
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

    <bento-card>
      <template #default>Notifications of fraud breakdown</template>
      <template #content>
        <bento-data-grid
          :columns="nofColumns"
          :data="data.nofBreakdown"
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
  BentoSummaryGrid, BentoSummaryGridItemPercentage, BentoSummaryGridItemAmount, BentoSummaryGridItemNumeric,
  BentoCard, BentoDataGrid, BentoCurrency, BentoTypography,
} from '@adyen/bento-vue2';
import { MOCK_CHARGEBACKS, formatAmount, formatCount } from '../payment-lifecycle.mock-data';

const data = MOCK_CHARGEBACKS;

const chargebackColumns = ref<BentoColumn[]>([
  { field: 'dimension', label: 'Payment method', sortable: true },
  { field: 'amount', label: 'Amount', sortable: true, numeric: true },
  { field: 'count', label: 'Count', sortable: true, numeric: true },
  { field: 'rate', label: 'CB rate', sortable: true, numeric: true },
]);

const nofColumns = ref<BentoColumn[]>([
  { field: 'dimension', label: 'Payment method', sortable: true },
  { field: 'amount', label: 'Amount', sortable: true, numeric: true },
  { field: 'count', label: 'Count', sortable: true, numeric: true },
  { field: 'rate', label: 'NOF rate', sortable: true, numeric: true },
]);
</script>

<style lang="scss" scoped>
.cb {
  &__recency {
    display: flex;
    align-items: center;
  }
}
</style>
