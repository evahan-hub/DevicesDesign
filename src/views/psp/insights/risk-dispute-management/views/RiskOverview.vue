<template>
  <div class="ro">
    <bento-summary-grid class="b-margin-bottom-100">
      <template #cell-1-1>
        <bento-summary-grid-item-numeric title="Total received" :label="formatCount(data.totalReceived.count)" trend="2.1%" trend-direction="positive" />
      </template>
      <template #cell-1-2>
        <bento-summary-grid-item-numeric title="Blocked by risk" :label="formatCount(data.blockedByRisk.count)" trend="-5.2%" trend-direction="positive" />
      </template>
      <template #cell-1-3>
        <bento-summary-grid-item-numeric title="Refused by issuer" :label="formatCount(data.refusedByIssuer.count)" trend="-1.8%" trend-direction="positive" />
      </template>
    </bento-summary-grid>

    <bento-summary-grid class="b-margin-bottom-100">
      <template #cell-1-1>
        <bento-summary-grid-item-numeric title="Chargebacks" :label="formatCount(data.chargebacks.count)" trend="3.1%" trend-direction="negative" />
      </template>
      <template #cell-1-2>
        <bento-summary-grid-item-numeric title="Fraud chargebacks" :label="formatCount(data.fraudChargebacks.count)" trend="2.4%" trend-direction="negative" />
      </template>
      <template #cell-1-3>
        <bento-summary-grid-item-numeric title="Non-fraud chargebacks" :label="formatCount(data.nonFraudChargebacks.count)" trend="4.2%" trend-direction="negative" />
      </template>
      <template #cell-1-4>
        <bento-summary-grid-item-numeric title="NOFs" :label="formatCount(data.nofs.count)" trend="-1.1%" trend-direction="positive" />
      </template>
    </bento-summary-grid>

    <bento-card class="b-margin-bottom-080">
      <template #default>Risk performance highlights</template>
      <template #content>
        <bento-structured-list layout="33-66">
          <bento-structured-list-item label="Block rate">
            <bento-typography>{{ ((data.blockedByRisk.count / data.totalReceived.count) * 100).toFixed(2) }}%</bento-typography>
          </bento-structured-list-item>
          <bento-structured-list-item label="False positive estimate">
            <bento-typography>~12% of blocked transactions</bento-typography>
          </bento-structured-list-item>
          <bento-structured-list-item label="Fraud chargeback rate">
            <bento-typography>{{ ((data.fraudChargebacks.count / data.totalReceived.count) * 100).toFixed(3) }}%</bento-typography>
          </bento-structured-list-item>
          <bento-structured-list-item label="Chargeback-to-transaction ratio">
            <bento-typography>{{ ((data.chargebacks.count / data.totalReceived.count) * 100).toFixed(3) }}%</bento-typography>
          </bento-structured-list-item>
        </bento-structured-list>
      </template>
    </bento-card>
  </div>
</template>

<script lang="ts" setup>
import {
  BentoSummaryGrid, BentoSummaryGridItemNumeric,
  BentoCard, BentoStructuredList, BentoStructuredListItem, BentoTypography,
} from '@adyen/bento-vue2';
import { MOCK_RISK_OVERVIEW, formatCount } from '../risk-dispute-management.mock-data';

const data = MOCK_RISK_OVERVIEW;
</script>

<style lang="scss" scoped>
.ro {}
</style>
