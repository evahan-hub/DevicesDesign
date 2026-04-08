<template>
  <div class="page inv-page">

    <!-- Title section -->
    <div class="inv-title-section">
      <div class="inv-title-row">
        <div class="inv-title-left">
          <h1 class="inv-title">Invoice {{ invoice.invoiceNumber }}</h1>
          <div class="inv-status">
            <bento-status :variant="statusVariant" />
            <bento-typography variant="body">{{ invoice.status }}</bento-typography>
          </div>
        </div>
        <div class="inv-title-actions">
          <bento-button variant="secondary">FX rate</bento-button>
          <bento-button variant="primary">
            <template #iconLeft><download-icon svg-title="Download" /></template>
            Download Invoice
          </bento-button>
        </div>
      </div>
      <div class="inv-meta">
        <span><span class="inv-meta__key">Account:</span> {{ invoice.account }}</span>
        <span><span class="inv-meta__key">Issued:</span> {{ invoice.issued }}</span>
        <span><span class="inv-meta__key">Due:</span> {{ invoice.due }}</span>
        <span><span class="inv-meta__key">Invoice Period:</span> {{ invoice.period }}</span>
        <span><span class="inv-meta__key">FX applied on:</span> Sep 30, 2025</span>
        <span><span class="inv-meta__key">Invoice type:</span> Payment processing</span>
      </div>
    </div>

    <!-- Alert -->
    <bento-alert type="highlight" class="inv-alert">
      <template #description>
        Invoice is based on transactions processed between
        <strong>September 1, 2025, 00:00:00 through October 1, 2025, 00:00:00</strong>
        Central European Time.
      </template>
    </bento-alert>

    <!-- Invoice Summary -->
    <div class="inv-summary">
      <p class="inv-summary__title">Invoice summary</p>
      <p class="inv-summary__desc">
        <strong>{{ fmt(invoice.dueAmount) }} USD</strong> will be automatically debited from your settlement batch under
        <bento-link is-not-routing to="#">ABC-122312</bento-link>.
      </p>
      <div class="inv-summary__boxes">
        <div class="inv-box inv-box--dark">
          <span class="inv-box__label">Invoiced</span>
          <span class="inv-box__value">{{ fmt(invoice.invoiced) }} USD</span>
        </div>
        <span class="inv-summary__op">-</span>
        <div class="inv-box inv-box--blue">
          <span class="inv-box__label">Deducted</span>
          <span class="inv-box__value">{{ fmt(invoice.deducted) }} USD</span>
        </div>
        <span class="inv-summary__op">=</span>
        <div class="inv-box inv-box--red">
          <span class="inv-box__label">Due</span>
          <span class="inv-box__value">{{ fmt(invoice.dueAmount) }} USD</span>
        </div>
      </div>
    </div>

    <!-- Tabs + Split Panel -->
    <div class="inv-tabs-wrap">
      <bento-tabs :active-tab-index="activeTabIndex" @update:active-tab-index="activeTabIndex = $event">
        <bento-tab title="By fee type" />
        <bento-tab title="By merchant accounts" :counter="merchantAccounts.filter(m => !m.isSummary).length" />
      </bento-tabs>

      <!-- By fee type -->
      <div v-if="activeTabIndex === 0" class="inv-split">
        <div class="inv-split__left">
          <div class="inv-split__section-label">
            <bento-typography variant="body" stronger>Fee types</bento-typography>
          </div>
          <div
            v-for="fee in feeTypes"
            :key="fee.id"
            class="inv-split__row"
            :class="{ 'inv-split__row--active': !fee.isSummary && selectedFeeId === fee.id, 'inv-split__row--summary': fee.isSummary, 'inv-split__row--section-start': fee.id === 'subtotal' }"
            @click="!fee.isSummary && (selectedFeeId = fee.id)"
          >
              <bento-typography variant="body" :stronger="fee.isSummary">{{ fee.label }}</bento-typography>
              <div class="inv-split__row-right">
                <bento-typography variant="body" :stronger="fee.isSummary" :class="{ 'inv-negative': fee.isNegative }">
                  {{ fee.isNegative ? '- ' : '' }}{{ fmt(Math.abs(fee.amount)) }} USD
                </bento-typography>
                <svg v-if="!fee.isSummary" width="16" height="16" viewBox="0 0 16 16" fill="none" class="inv-chevron" aria-hidden="true">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
          </div>
        </div>
        <div class="inv-split__right">
          <template v-if="selectedFee">
            <p class="inv-detail__title">{{ selectedFee.label }}</p>
            <div class="inv-detail__stats">
              <div>
                <bento-typography variant="caption" class="inv-secondary">Invoiced</bento-typography>
                <bento-typography variant="body" stronger>{{ fmt(selectedFee.amount) }} USD</bento-typography>
              </div>
              <div>
                <bento-typography variant="caption" class="inv-secondary">Total transactions</bento-typography>
                <bento-typography variant="body" stronger>1,925 transactions</bento-typography>
              </div>
              <div>
                <bento-typography variant="caption" class="inv-secondary">Total turnover</bento-typography>
                <bento-typography variant="body" stronger>5,221.22 USD</bento-typography>
              </div>
              <bento-link is-not-routing to="#">Download transactions</bento-link>
            </div>
            <table class="inv-fee-table">
              <thead>
                <tr>
                  <th>Fee type</th>
                  <th class="ta-right">Invoiced</th>
                  <th class="ta-right">Deducted</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in feeDetailRows" :key="row.label">
                  <td>
                    <bento-typography variant="body">{{ row.label }}</bento-typography>
                    <bento-typography variant="caption" class="inv-secondary">{{ row.subtitle }}</bento-typography>
                  </td>
                  <td class="ta-right">
                    <bento-typography variant="body">{{ fmt(row.invoiced) }} USD</bento-typography>
                    <bento-typography variant="caption" class="inv-secondary">{{ row.rate }}</bento-typography>
                  </td>
                  <td class="ta-right">
                    <bento-typography variant="body" :class="{ 'inv-negative': row.deducted < 0 }">
                      -{{ fmt(Math.abs(row.deducted)) }} USD
                    </bento-typography>
                    <bento-typography variant="caption" class="inv-secondary">{{ row.deductedRate }}</bento-typography>
                  </td>
                </tr>
                <tr class="inv-fee-table__subtotal">
                  <td><bento-typography variant="body" :stronger="true">Sub-total</bento-typography></td>
                  <td class="ta-right"><bento-typography variant="body" :stronger="true">5,221.22 USD</bento-typography></td>
                  <td class="ta-right"><bento-typography variant="body" :stronger="true">-211.75 USD</bento-typography></td>
                </tr>
              </tbody>
            </table>
          </template>
        </div>
      </div>

      <!-- By merchant accounts -->
      <div v-if="activeTabIndex === 1" class="inv-split">
        <div class="inv-split__left">
          <div class="inv-split__section-label">
            <bento-typography variant="body" stronger>Merchant accounts</bento-typography>
          </div>
          <div
            v-for="m in merchantAccounts"
            :key="m.id"
            class="inv-split__row"
            :class="{ 'inv-split__row--active': !m.isSummary && selectedMerchantId === m.id, 'inv-split__row--summary': m.isSummary, 'inv-split__row--section-start': m.id === 'subtotal' }"
            @click="!m.isSummary && (selectedMerchantId = m.id)"
          >
              <bento-typography variant="body" :stronger="m.isSummary">{{ m.label }}</bento-typography>
              <div class="inv-split__row-right">
                <bento-typography variant="body" :stronger="m.isSummary" :class="{ 'inv-negative': m.isNegative }">
                  {{ m.isNegative ? '- ' : '' }}{{ fmt(Math.abs(m.amount)) }} USD
                </bento-typography>
                <chevron-icon v-if="!m.isSummary" />
              </div>
          </div>
        </div>
        <div class="inv-split__right">
          <template v-if="selectedMerchant && !selectedMerchant.isSummary">
            <p class="inv-detail__title">{{ selectedMerchant.label }}</p>
            <div class="inv-merchant-header">
              <bento-typography variant="caption" class="inv-secondary">Invoice number</bento-typography>
              <bento-typography variant="caption" class="inv-secondary ta-right">Invoiced</bento-typography>
            </div>
            <div class="inv-merchant-row">
              <bento-link is-not-routing to="#">{{ selectedMerchant.invoiceRef }}</bento-link>
              <bento-typography variant="body" stronger class="ta-right">{{ fmt(selectedMerchant.amount) }} USD</bento-typography>
            </div>
          </template>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { BentoStatus, BentoStatusVariant, BentoTypography, BentoAlert, BentoButton, BentoLink, BentoTabs, BentoTab } from '@adyen/bento-vue2';
import { DownloadIcon } from '@adyen/ui-assets-icons-16';
import { useRoute } from 'vue-router/composables';
import type { FeeType, MerchantAccount } from './invoice-detail.types';
import { MOCK_INVOICES, FEE_TYPES, FEE_DETAIL_ROWS, MERCHANT_ACCOUNTS } from './invoice-detail.mock-data';

const route = useRoute();

const activeTabIndex = ref(0);
const selectedFeeId = ref<string | null>('processing');
const selectedMerchantId = ref<string | null>('acme-nl');

const feeTypes = ref<FeeType[]>(FEE_TYPES);
const feeDetailRows = ref(FEE_DETAIL_ROWS);
const merchantAccounts = ref<MerchantAccount[]>(MERCHANT_ACCOUNTS);

const invoice = computed(() => {
  const id = route.params.id as string;
  return MOCK_INVOICES[id] ?? MOCK_INVOICES['10453'];
});

const statusVariant = computed<BentoStatusVariant>(() => {
  switch (invoice.value.status) {
    case 'Paid': return BentoStatusVariant.GREEN;
    case 'Overdue': return BentoStatusVariant.RED;
    case 'Pending': return BentoStatusVariant.YELLOW;
    default: return BentoStatusVariant.GREY;
  }
});

const selectedFee = computed<FeeType | null>(() =>
  feeTypes.value.find(f => f.id === selectedFeeId.value) ?? null
);

const selectedMerchant = computed<MerchantAccount | null>(() =>
  merchantAccounts.value.find(m => m.id === selectedMerchantId.value) ?? null
);

function fmt(minorUnits: number): string {
  return (minorUnits / 100).toFixed(2);
}
</script>

<style scoped>
/* Page container */
.inv-page {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-090);
  padding: var(--b-spacer-090);
}

/* Title section */
.inv-title-section {
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-050);
}
.inv-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.inv-title-left {
  display: flex;
  align-items: center;
  gap: var(--b-spacer-050);
}
.inv-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 34px;
  color: var(--b-color-label-primary);
  white-space: nowrap;
}
.inv-status {
  display: flex;
  align-items: center;
  gap: var(--b-spacer-040);
}
.inv-title-actions {
  display: flex;
  gap: var(--b-spacer-050);
  align-items: center;
}

/* Metadata */
.inv-meta {
  display: flex;
  gap: var(--b-spacer-070);
  flex-wrap: wrap;
  font-size: var(--b-text-body-font-size);
  color: var(--b-color-label-secondary);
}
.inv-meta__key {
  font-weight: 500;
  color: var(--b-color-label-primary);
}

/* Invoice Summary */
.inv-summary {
  background-color: var(--b-color-background-secondary);
  border-radius: 12px;
  padding: var(--b-spacer-060) var(--b-spacer-090);
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-060);
}
.inv-summary__title {
  margin: 0;
  font-size: var(--b-text-title-m-font-size);
  font-weight: 700;
  color: var(--b-color-label-primary);
}
.inv-summary__desc {
  margin: 0;
  font-size: var(--b-text-body-font-size);
  color: var(--b-color-label-primary);
}
.inv-summary__boxes {
  display: flex;
  align-items: stretch;
  gap: var(--b-spacer-060);
}
.inv-summary__op {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  color: var(--b-color-label-primary);
  flex-shrink: 0;
}
.inv-box {
  flex: 1;
  padding: var(--b-spacer-070);
  border-radius: var(--b-border-radius-m);
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-020);
}
.inv-box--dark { background-color: #364553; }
.inv-box--blue { background-color: #0065c9; }
.inv-box--red  { background-color: #c13101; }
.inv-box__label {
  font-size: var(--b-text-caption-font-size);
  color: #ffffff;
}
.inv-box__value {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  white-space: nowrap;
}

/* Tabs + split */
.inv-tabs-wrap {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.inv-split {
  display: flex;
  border: var(--b-border-width-s) solid var(--b-color-outline-primary);
  border-top: none;
  border-radius: 0 0 var(--b-border-radius-m) var(--b-border-radius-m);
  min-height: 320px;
}
.inv-split__left {
  width: 360px;
  flex-shrink: 0;
  border-right: var(--b-border-width-s) solid var(--b-color-outline-primary);
}
.inv-split__right {
  flex: 1;
  min-width: 0;
  padding: var(--b-spacer-080);
}
.inv-split__section-label {
  padding: var(--b-spacer-060) var(--b-spacer-070);
  border-bottom: var(--b-border-width-s) solid var(--b-color-outline-primary);
}
.inv-split__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--b-spacer-055, 10px) var(--b-spacer-070);
  cursor: pointer;
  border-bottom: var(--b-border-width-s) solid var(--b-color-outline-primary);
  transition: background-color 0.1s;
}
.inv-split__row:last-child { border-bottom: none; }
.inv-split__row:hover:not(.inv-split__row--summary) {
  background-color: var(--b-color-background-primary-hover);
}
.inv-split__row--active {
  background-color: var(--b-color-background-selected) !important;
}
.inv-split__row--summary { cursor: default; }
.inv-split__row--section-start {
  border-top: var(--b-border-width-m) solid var(--b-color-outline-primary);
}
.inv-split__row-right {
  display: flex;
  align-items: center;
  gap: var(--b-spacer-020);
}
.inv-chevron {
  color: var(--b-color-label-secondary);
  flex-shrink: 0;
}
.inv-negative { color: var(--b-color-label-critical) !important; }

/* Fee detail right panel */
.inv-detail__title {
  margin: 0 0 var(--b-spacer-060);
  font-size: var(--b-text-title-font-size);
  font-weight: 700;
  color: var(--b-color-label-primary);
}
.inv-detail__stats {
  display: flex;
  gap: var(--b-spacer-080);
  align-items: flex-start;
  flex-wrap: wrap;
  padding-bottom: var(--b-spacer-060);
  margin-bottom: var(--b-spacer-060);
  border-bottom: var(--b-border-width-s) solid var(--b-color-outline-primary);
}

/* Fee table */
.inv-fee-table {
  width: 100%;
  border-collapse: collapse;
}
.inv-fee-table th,
.inv-fee-table td {
  padding: var(--b-spacer-050) var(--b-spacer-040);
  text-align: left;
  border-bottom: var(--b-border-width-s) solid var(--b-color-outline-primary);
  vertical-align: top;
}
.inv-fee-table th {
  font-size: var(--b-text-caption-font-size);
  font-weight: 500;
  color: var(--b-color-label-secondary);
}
.inv-fee-table__subtotal td {
  border-top: var(--b-border-width-m) solid var(--b-color-outline-primary);
  border-bottom: none;
}

/* Merchant detail right panel */
.inv-merchant-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--b-spacer-020);
}
.inv-merchant-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--b-spacer-050) 0;
  border-bottom: var(--b-border-width-s) solid var(--b-color-outline-primary);
}
.ta-right { text-align: right; }
.inv-secondary { color: var(--b-color-label-secondary); }
.inv-alert ::v-deep .b-alert__content { max-width: none; }
.inv-alert ::v-deep .b-alert__description { max-width: none; }
</style>
