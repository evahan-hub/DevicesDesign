<template>
  <div class="page inv-page">

    <!-- Title section -->
    <div class="inv-title-section">
      <div class="inv-title-row">
        <div class="inv-title-left">
          <h1 class="inv-title">Invoice {{ invoice.invoiceNumber }}</h1>
          <bento-status :variant="statusVariant">{{ invoice.status }}</bento-status>
        </div>
        <div class="inv-title-actions">
          <bento-button variant="secondary">Download report</bento-button>
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
        <strong>ABC-122312</strong>.
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
      <bento-tabs v-if="!isMerchantInvoice" :active-tab-index="activeTabIndex" @update:active-tab-index="activeTabIndex = $event">
        <bento-tab title="By fee type" />
        <bento-tab title="By merchant accounts" :counter="merchantAccounts.filter(m => !m.isSummary).length" />
      </bento-tabs>

      <!-- By fee type -->
      <div v-if="isMerchantInvoice || activeTabIndex === 0" class="inv-split">
        <div class="inv-split__left">
          <template v-for="fee in feeTypes">
            <hr v-if="fee.id === 'subtotal' || fee.id === 'total'" :key="fee.id + '-divider'" class="inv-split__divider" />
          <div
            :key="fee.id"
            class="inv-split__row"
            :class="{ 'inv-split__row--active': !fee.isSummary && selectedFeeId === fee.id, 'inv-split__row--summary': fee.isSummary }"
            @click="!fee.isSummary && (selectedFeeId = fee.id)"
          >
              <bento-typography variant="body" :stronger="fee.isSummary || selectedFeeId === fee.id">{{ fee.label }}</bento-typography>
              <div class="inv-split__row-right">
                <div class="inv-amount-cell">
                  <bento-typography variant="body" :stronger="fee.isSummary || selectedFeeId === fee.id">
                    {{ fee.isNegative ? '- ' : '' }}{{ fmt(Math.abs(fee.amount)) }}
                  </bento-typography>
                  <bento-typography variant="body" :stronger="fee.isSummary || selectedFeeId === fee.id" class="inv-currency">USD</bento-typography>
                </div>
                <svg v-if="!fee.isSummary" width="16" height="16" viewBox="0 0 16 16" fill="none" class="inv-chevron" aria-hidden="true">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
          </div>
          </template>
        </div>
        <div class="inv-split__right">
          <template v-if="selectedFee">
            <bento-alert v-if="selectedFeeId === 'non-transactional'" type="highlight" class="inv-alert inv-alert--inline">
              <template #description>
                Non-transaction scheme fees are determined directly by Visa, Mastercard, and other schemes. They are not deducted from daily settlement payouts but are calculated and invoiced at the end of the month.
              </template>
            </bento-alert>
            <div class="inv-detail__header">
              <p class="inv-detail__title">{{ selectedFee.label }}</p>
              <bento-button v-if="selectedFeeId !== 'non-transactional'" variant="tertiary" @click="showDownloadModal = true">Download transactions</bento-button>
            </div>
            <div class="inv-detail__stats">
              <div>
                <bento-typography variant="caption" class="inv-secondary">Invoiced</bento-typography>
                <bento-typography variant="body" stronger>{{ fmt(totalInvoiced) }} USD</bento-typography>
              </div>
              <div>
                <bento-typography variant="caption" class="inv-secondary">Deducted</bento-typography>
                <bento-typography variant="body" stronger>- {{ fmt(Math.abs(totalDeducted)) }} USD</bento-typography>
              </div>
              <div v-if="selectedFeeId !== 'non-transactional'">
                <bento-typography variant="caption" class="inv-secondary">Total transactions</bento-typography>
                <bento-typography variant="body" stronger>1,925 transactions</bento-typography>
              </div>
              <div v-if="selectedFeeId === 'non-transactional'">
                <bento-typography variant="caption" class="inv-secondary">Charged on</bento-typography>
                <bento-typography variant="body" stronger>Jul 1, 2025</bento-typography>
              </div>
              <div>
                <bento-typography variant="caption" class="inv-secondary">Total turnover</bento-typography>
                <bento-typography variant="body" stronger>5,221.22 USD</bento-typography>
              </div>
            </div>
            <table class="inv-fee-table">
              <thead>
                <tr>
                  <th>Fee type</th>
                  <th class="ta-right">Turnover</th>
                  <th class="ta-right">Invoiced</th>
                  <th v-if="selectedFeeId !== 'non-transactional'" class="ta-right">Deducted</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in feeDetailRows" :key="row.label">
                  <td>
                    <bento-typography variant="body">{{ row.label }}</bento-typography>
                    <bento-typography variant="caption" class="inv-secondary">{{ row.subtitle }}</bento-typography>
                  </td>
                  <td class="ta-right">
                    <bento-typography variant="body">{{ fmt(row.turnover) }} USD</bento-typography>
                  </td>
                  <td class="ta-right">
                    <bento-typography variant="body">{{ fmt(row.invoiced) }} USD</bento-typography>
                    <bento-typography variant="caption" class="inv-secondary">{{ row.rate }}</bento-typography>
                  </td>
                  <td v-if="selectedFeeId !== 'non-transactional'" class="ta-right">
                    <bento-typography variant="body">
                      -{{ fmt(Math.abs(row.deducted)) }} USD
                    </bento-typography>
                    <bento-typography variant="caption" class="inv-secondary">{{ row.deductedRate }}</bento-typography>
                  </td>
                </tr>
                <tr class="inv-fee-table__subtotal">
                  <td><bento-typography variant="body" :stronger="true">Sub-total</bento-typography></td>
                  <td class="ta-right"><bento-typography variant="body" :stronger="true">{{ selectedFeeId === 'non-transactional' ? '—' : '5,221.22 USD' }}</bento-typography></td>
                  <td class="ta-right"><bento-typography variant="body" :stronger="true">{{ fmt(totalInvoiced) }} USD</bento-typography></td>
                  <td v-if="selectedFeeId !== 'non-transactional'" class="ta-right"><bento-typography variant="body" :stronger="true">{{ fmt(Math.abs(totalDeducted)) }} USD</bento-typography></td>
                </tr>
              </tbody>
            </table>
          </template>
        </div>
      </div>

      <!-- By merchant accounts -->
      <div v-if="activeTabIndex === 1" class="inv-split">
        <div class="inv-split__left">
          <template v-for="m in merchantAccounts">
            <hr v-if="m.id === 'subtotal' || m.id === 'due'" :key="m.id + '-divider'" class="inv-split__divider" />
          <div
            :key="m.id"
            class="inv-split__row"
            :class="{ 'inv-split__row--active': !m.isSummary && selectedMerchantId === m.id, 'inv-split__row--summary': m.isSummary }"
            @click="!m.isSummary && (selectedMerchantId = m.id)"
          >
              <bento-typography variant="body" :stronger="m.isSummary || selectedMerchantId === m.id">{{ m.label }}</bento-typography>
              <div class="inv-split__row-right">
                <div class="inv-amount-cell">
                  <bento-typography variant="body" :stronger="m.isSummary || selectedMerchantId === m.id" :class="{ 'inv-negative': m.isNegative }">
                    {{ m.isNegative ? '- ' : '' }}{{ fmt(Math.abs(m.amount)) }}
                  </bento-typography>
                  <bento-typography variant="body" :stronger="m.isSummary || selectedMerchantId === m.id" class="inv-currency">USD</bento-typography>
                </div>
                <svg v-if="!m.isSummary" width="16" height="16" viewBox="0 0 16 16" fill="none" class="inv-chevron" aria-hidden="true">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
          </div>
          </template>
        </div>
        <div class="inv-split__right">
          <template v-if="selectedMerchant && !selectedMerchant.isSummary">
            <p class="inv-detail__title">{{ selectedMerchant.label }}</p>
            <div class="inv-merchant-header">
              <bento-typography variant="caption" class="inv-secondary">Invoice number</bento-typography>
              <bento-typography variant="caption" class="inv-secondary ta-right">Invoiced</bento-typography>
            </div>
            <div class="inv-merchant-row">
              <bento-link :to="{ name: 'invoice-detail', params: { id: selectedMerchant.invoiceRef } }">{{ selectedMerchant.invoiceRef }}</bento-link>
              <bento-typography variant="body" stronger class="ta-right">{{ fmt(selectedMerchant.amount) }} USD</bento-typography>
            </div>
          </template>
        </div>
      </div>
    </div>


  <!-- Download transactions modal (multi-page: download → configure columns) -->
  <bento-modal
    :isOpen="showDownloadModal"
    size="large"
    :activePage="dlActivePage"
    @update:active-page="dlActivePage = $event"
    @close-modal="showDownloadModal = false; dlActivePage = 'download'"
  >
    <bento-modal-page
      pageId="download"
      :actions="downloadModalActions"
      @close-modal="showDownloadModal = false; dlActivePage = 'download'"
    >
      Download transaction data
      <template #content>
        <div class="dl-content">
          <div class="dl-timezone">
            <bento-checkbox v-model="dlSpecificTimezone">
              Download transaction data in your timezone
            </bento-checkbox>
            <bento-dropdown
              v-model="dlTimezone"
              :items="timezoneItems"
            />
          </div>
          <div class="dl-daterange">
            <bento-typography variant="body" stronger>Transaction data date &amp; time range</bento-typography>
            <div class="dl-daterange__row">
              <div class="dl-daterange__group">
                <bento-tag label="CET (Original)" color="grey" />
                <bento-typography variant="caption" class="inv-secondary">2025-09-01 00:12:30 – 2025-09-30 23:58:22</bento-typography>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="dl-arrow" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <div class="dl-daterange__group">
                <bento-tag label="PST" color="grey" />
                <bento-typography variant="caption" class="inv-secondary">2025-08-31 04:12:30 – 2025-09-30 15:58:22</bento-typography>
              </div>
            </div>
          </div>
          <div class="dl-preview">
            <div class="dl-preview__header">
              <div>
                <bento-typography variant="body" stronger>Transaction data preview</bento-typography>
                <bento-typography variant="caption" class="inv-secondary">4 columns selected : Timestamp, PSP reference, Processing fee, Amount</bento-typography>
              </div>
              <bento-button variant="tertiary" @click="openColumnModal">Configure columns</bento-button>
            </div>
            <div class="dl-preview__table-wrap">
              <table class="dl-preview__table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>PSP reference</th>
                    <th>Processing fee</th>
                    <th>Main amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in previewRows" :key="row.pspRef">
                    <td>{{ row.timestamp }}</td>
                    <td>{{ row.pspRef }}</td>
                    <td>{{ row.processingFee }}</td>
                    <td>{{ row.mainAmount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <bento-typography variant="caption" class="inv-secondary">The data in this table is only an example.</bento-typography>
          </div>
        </div>
      </template>
    </bento-modal-page>

    <bento-modal-page
      pageId="configure"
      previous-page="download"
      :actions="columnModalActions"
      @close-modal="showDownloadModal = false; dlActivePage = 'download'"
    >
      Configure columns
      <template #content>
        <div class="col-panels">
          <div class="col-panel">
            <bento-typography variant="body" stronger>Transaction data columns</bento-typography>
            <div class="col-panel__list">
              <div v-for="(col, idx) in colDraftAvailable" :key="col.name">
                <div class="col-row">
                  <bento-checkbox
                    :model-value="colIsChecked(col)"
                    @update:model-value="colSetChecked(col, $event)"
                  />
                  <div class="col-row__body">
                    <div class="col-row__name-row">
                      <bento-typography variant="body">{{ col.label }}</bento-typography>
                      <bento-typography variant="body" class="inv-secondary">{{ col.type }}</bento-typography>
                    </div>
                    <bento-typography variant="caption" class="inv-secondary">{{ col.description }}</bento-typography>
                  </div>
                </div>
                <div v-if="idx < colDraftAvailable.length - 1" class="col-row__divider" />
              </div>
              <p v-if="colDraftAvailable.length === 0" class="col-panel__empty inv-secondary">All columns are included</p>
            </div>
          </div>
          <div class="col-panels__divider" />
          <div class="col-panel">
            <bento-typography variant="body" stronger>Selected columns</bento-typography>
            <div class="col-panel__list">
              <div v-for="(col, idx) in colDraftSelected" :key="col.name">
                <div
                  class="col-row col-row--draggable"
                  :class="{ 'col-row--dragging': colDragIndex === idx }"
                  draggable="true"
                  @dragstart="colDragStart(idx, $event)"
                  @dragover.prevent="colDragOver(idx, $event)"
                  @drop="colDrop(idx)"
                  @dragend="colDragEnd"
                >
                  <span class="col-row__drag">&#x2807;</span>
                  <div class="col-row__body">
                    <div class="col-row__name-row">
                      <bento-typography variant="body">{{ col.label }}</bento-typography>
                      <bento-typography variant="body" class="inv-secondary">{{ col.type }}</bento-typography>
                    </div>
                    <bento-typography variant="caption" class="inv-secondary">{{ col.description }}</bento-typography>
                  </div>
                  <button class="col-row__remove" @click="colDeselect(col)">&times;</button>
                </div>
                <div v-if="idx < colDraftSelected.length - 1" class="col-row__divider" />
              </div>
              <p v-if="colDraftSelected.length === 0" class="col-panel__empty inv-secondary">No columns selected</p>
            </div>
          </div>
        </div>
      </template>
    </bento-modal-page>
  </bento-modal>

  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { BentoStatus, BentoStatusVariant, BentoTypography, BentoAlert, BentoButton, BentoModal, BentoModalPage, BentoCheckbox, BentoDropdown, BentoTag, BentoTabs, BentoTab, BentoLink } from '@adyen/bento-vue2';
import { DownloadIcon } from '@adyen/ui-assets-icons-16';
import { useRoute } from 'vue-router/composables';
import type { FeeType, MerchantAccount } from './invoice-detail.types';
import { MOCK_INVOICES, FEE_TYPES, FEE_ROWS_MAP, MERCHANT_ACCOUNTS } from './invoice-detail.mock-data';

const route = useRoute();

const activeTabIndex = ref(0);
const selectedFeeId = ref<string | null>('processing');
const selectedMerchantId = ref<string | null>('acme-nl');

const feeTypes = ref<FeeType[]>(FEE_TYPES);
const feeDetailRows = computed(() => FEE_ROWS_MAP[selectedFeeId.value ?? ''] ?? []);
const totalInvoiced = computed(() => feeDetailRows.value.reduce((sum, r) => sum + r.invoiced, 0));
const totalDeducted = computed(() => feeDetailRows.value.reduce((sum, r) => sum + r.deducted, 0));
const merchantAccounts = ref<MerchantAccount[]>(MERCHANT_ACCOUNTS);

const isMerchantInvoice = computed(() => String(route.params.id).startsWith('AC'));

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
  return (minorUnits / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const showDownloadModal = ref(false);
const dlActivePage = ref('download');
const dlSpecificTimezone = ref(true);
const dlTimezone = ref('pst');

const timezoneItems = [
  { label: 'PST (Pacific Standard Time)', value: 'pst' },
  { label: 'EST (Eastern Standard Time)', value: 'est' },
  { label: 'CET (Central European Time)', value: 'cet' },
  { label: 'UTC', value: 'utc' },
];

const previewRows = [
  { timestamp: '2025-08-31 04:12:30 PST', pspRef: 'A9S2K3LD0P2M', processingFee: '0.11 USD', mainAmount: '30.00 USD' },
  { timestamp: '2025-09-01 04:12:30 PST', pspRef: 'B4H7G1J9K2RT', processingFee: '0.11 USD', mainAmount: '25.00 USD' },
  { timestamp: '2025-09-02 04:12:30 PST', pspRef: 'Z7X9C3V1B5NM', processingFee: '0.11 USD', mainAmount: '25.00 USD' },
  { timestamp: '2025-09-03 04:12:30 PST', pspRef: 'Q2W5E8R1T4YU', processingFee: '0.11 USD', mainAmount: '25.00 USD' },
  { timestamp: '2025-09-04 04:12:30 PST', pspRef: 'I6O9P2A5S8DF', processingFee: '0.11 USD', mainAmount: '25.00 USD' },
];

const downloadModalActions = [
  { title: 'Download', event: () => { showDownloadModal.value = false; } },
  { title: 'Cancel', event: () => { showDownloadModal.value = false; } },
];

// --- Column config ---
interface InvoiceColItem {
  name: string;
  label: string;
  description: string;
  type: string;
  selected: boolean;
}

const ALL_INVOICE_COLUMNS: InvoiceColItem[] = [
  { name: 'pspReference', label: 'PSP reference', description: 'Description of the column contents and why it\'s helpful', type: 'String', selected: true },
  { name: 'processingFee', label: 'Processing fee', description: 'Description of the column contents and why it\'s helpful', type: 'String', selected: true },
  { name: 'timestamp', label: 'Timestamp', description: 'Description of the column contents and why it\'s helpful', type: 'String', selected: true },
  { name: 'mainAmount', label: 'Main amount', description: 'Description of the column contents and why it\'s helpful', type: 'String', selected: true },
  { name: 'companyAccount', label: 'Company account', description: 'Description of the column contents and why it\'s helpful', type: 'String', selected: false },
  { name: 'merchantAccount', label: 'Merchant account', description: 'Description of the column contents and why it\'s helpful', type: 'String', selected: false },
  { name: 'merchantReference', label: 'Merchant reference', description: 'Description of the column contents and why it\'s helpful', type: 'String', selected: false },
  { name: 'paymentMethod', label: 'Payment method', description: 'Description of the column contents and why it\'s helpful', type: 'String', selected: false },
  { name: 'creationDate', label: 'Creation date, time zone', description: 'Description of the column contents and why it\'s helpful', type: 'String', selected: false },
  { name: 'type', label: 'Type', description: 'Description of the column contents and why it\'s helpful', type: 'String', selected: false },
];

// no separate showColumnModal — navigate via dlActivePage
const colConfig = ref<InvoiceColItem[]>(ALL_INVOICE_COLUMNS.map(c => ({ ...c })));
const colDraftConfig = ref<InvoiceColItem[]>([]);
const colDraftSelectedOrder = ref<string[]>([]);
const colDraftChecked = ref<Record<string, boolean>>({});
const colDragIndex = ref<number | null>(null);

const colDraftAvailable = computed(() => colDraftConfig.value.filter(c => !c.selected));
const colDraftSelected = computed(() => {
  const map = new Map(colDraftConfig.value.filter(c => c.selected).map(c => [c.name, c]));
  return colDraftSelectedOrder.value.filter(n => map.has(n)).map(n => map.get(n) as InvoiceColItem);
});

function openColumnModal() {
  colDraftConfig.value = colConfig.value.map(c => ({ ...c }));
  colDraftSelectedOrder.value = colConfig.value.filter(c => c.selected).map(c => c.name);
  colDraftChecked.value = {};
  dlActivePage.value = 'configure';
}
function saveColumnConfig() {
  const checked = Object.keys(colDraftChecked.value).filter(k => colDraftChecked.value[k]);
  const newConfig = colDraftConfig.value.map(c => checked.includes(c.name) ? { ...c, selected: true } : { ...c });
  const newOrder = [...colDraftSelectedOrder.value];
  checked.forEach(n => { if (!newOrder.includes(n)) newOrder.push(n); });
  colConfig.value = newConfig;
  dlActivePage.value = 'download';
}
function colIsChecked(col: InvoiceColItem) { return !!colDraftChecked.value[col.name]; }
function colSetChecked(col: InvoiceColItem, val: boolean) {
  colDraftChecked.value = { ...colDraftChecked.value, [col.name]: val };
}
function colDeselect(col: InvoiceColItem) {
  colDraftConfig.value = colDraftConfig.value.map(c => c.name === col.name ? { ...c, selected: false } : c);
  colDraftSelectedOrder.value = colDraftSelectedOrder.value.filter(n => n !== col.name);
}
function colDragStart(i: number, e: DragEvent) { colDragIndex.value = i; e.dataTransfer!.effectAllowed = 'move'; }
function colDragOver(_i: number, e: DragEvent) { e.dataTransfer!.dropEffect = 'move'; }
function colDrop(targetIndex: number) {
  if (colDragIndex.value === null || colDragIndex.value === targetIndex) return;
  const order = [...colDraftSelectedOrder.value];
  const [moved] = order.splice(colDragIndex.value, 1);
  order.splice(targetIndex, 0, moved);
  colDraftSelectedOrder.value = order;
  colDragIndex.value = null;
}
function colDragEnd() { colDragIndex.value = null; }

const columnModalActions = [
  { title: 'Save', event: () => saveColumnConfig() },
  { title: 'Cancel', event: () => { dlActivePage.value = 'download'; } },
];
</script>

<style scoped>
/* Page container */
.inv-page {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-090);
  padding: var(--b-spacer-090) var(--b-spacer-090) var(--b-spacer-100);
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
  gap: var(--b-spacer-060);
}
.inv-split {
  display: flex;
  min-height: 320px;
  border: var(--b-border-width-s) solid var(--b-color-outline-primary);
  border-radius: var(--b-border-radius-m);
  overflow: hidden;
}
.inv-split__left {
  width: 360px;
  flex-shrink: 0;
  border-right: var(--b-border-width-s) solid var(--b-color-outline-primary);
  background-color: var(--b-color-background-secondary);
  padding: var(--b-spacer-070);
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-010);
}
.inv-split__right {
  flex: 1;
  min-width: 0;
  padding: var(--b-spacer-080);
}
.inv-split__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--b-spacer-040) var(--b-spacer-060);
  cursor: pointer;
  border-radius: var(--b-border-radius-m);
  transition: background-color 0.1s;
}
.inv-split__row:hover:not(.inv-split__row--summary) {
  background-color: var(--b-color-background-primary-hover);
}
.inv-split__row--active {
  background-color: var(--b-color-background-selected) !important;
}
.inv-split__row--summary { cursor: default; }
.inv-split__divider {
  border: none;
  border-top: var(--b-border-width-s) solid var(--b-color-separator-primary);
  margin: var(--b-spacer-040) 0;
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
.inv-amount-cell {
  display: flex;
  gap: var(--b-spacer-010);
  align-items: center;
}
.inv-currency {
  color: var(--b-color-label-secondary);
}
.inv-negative { color: var(--b-color-label-critical); }

/* Fee detail right panel */
.inv-detail__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--b-spacer-060);
}
.inv-detail__title {
  margin: 0 0 var(--b-spacer-070);
  font-size: var(--b-text-title-font-size);
  font-weight: 700;
  color: var(--b-color-label-primary);
}
.inv-detail__stats {
  display: flex;
  gap: 0;
  align-items: flex-start;
  flex-wrap: wrap;
  padding-bottom: var(--b-spacer-060);
  margin-bottom: var(--b-spacer-060);
}
.inv-detail__stats > div {
  padding-right: var(--b-spacer-070);
  margin-right: var(--b-spacer-070);
  border-right: var(--b-border-width-s) solid var(--b-color-separator-primary);
}
.inv-detail__stats > div:last-of-type {
  border-right: none;
  padding-right: 0;
  margin-right: 0;
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
  vertical-align: middle;
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
  padding: var(--b-spacer-020) 0;
}
.ta-right { text-align: right; }
.inv-fee-table th.ta-right,
.inv-fee-table td.ta-right { text-align: right; }
.inv-secondary { color: var(--b-color-label-secondary); }
.inv-alert ::v-deep .b-alert__content { max-width: none; }
.inv-alert ::v-deep .b-alert__description { max-width: none; }
.inv-alert--inline { margin-bottom: var(--b-spacer-070); }

/* Download modal */
.dl-content {
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-090);
}
.dl-timezone {
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-050);
}
.dl-daterange {
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-060);
}
.dl-daterange__row {
  display: flex;
  align-items: center;
  gap: var(--b-spacer-070);
}
.dl-daterange__group {
  display: flex;
  align-items: center;
  gap: var(--b-spacer-040);
}
.dl-arrow {
  color: var(--b-color-label-secondary);
  flex-shrink: 0;
}
.dl-preview {
  background: var(--b-color-background-secondary);
  border-radius: var(--b-border-radius-m);
  padding: var(--b-spacer-070);
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-060);
}
.dl-preview__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.dl-preview__table-wrap {
  border: var(--b-border-width-s) solid var(--b-color-outline-primary);
  border-radius: var(--b-border-radius-s);
  overflow: hidden;
}
.dl-preview__table {
  width: 100%;
  border-collapse: collapse;
  background: var(--b-color-background-primary);
}
.dl-preview__table th,
.dl-preview__table td {
  padding: var(--b-spacer-050) var(--b-spacer-070);
  text-align: left;
  border-bottom: var(--b-border-width-s) solid var(--b-color-outline-primary);
  font-size: var(--b-text-body-font-size);
  color: var(--b-color-label-primary);
}
.dl-preview__table th {
  font-size: var(--b-text-caption-font-size);
  font-weight: 500;
  color: var(--b-color-label-secondary);
}
.dl-preview__table tbody tr:last-child td {
  border-bottom: none;
}

/* Column config modal */
.col-panels {
  display: flex;
  gap: 0;
  min-height: 400px;
}
.col-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-060);
  min-width: 0;
}
.col-panels__divider {
  width: 1px;
  background: var(--b-color-outline-primary);
  margin: 0 var(--b-spacer-070);
  flex-shrink: 0;
}
.col-panel__list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 420px;
}
.col-panel__empty {
  padding: var(--b-spacer-070) 0;
  font-size: var(--b-text-body-font-size);
}
.col-row {
  display: flex;
  align-items: flex-start;
  gap: var(--b-spacer-060);
  padding: var(--b-spacer-060) var(--b-spacer-070);
}
.col-row--draggable { cursor: grab; }
.col-row--dragging { opacity: 0.4; }
.col-row__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.col-row__name-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.col-row__drag {
  color: var(--b-color-label-secondary);
  font-size: 16px;
  line-height: 20px;
  flex-shrink: 0;
  cursor: grab;
}
.col-row__remove {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--b-color-label-secondary);
  font-size: 18px;
  line-height: 1;
  padding: 0 2px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.col-row__remove:hover { color: var(--b-color-label-primary); }
.col-row__divider {
  height: 1px;
  background: var(--b-color-outline-primary);
  margin: 0 var(--b-spacer-070);
}
</style>
