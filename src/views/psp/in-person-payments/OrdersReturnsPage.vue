<template>
  <div class="or">
    <bento-header
      title="Orders and Returns"
      :actions="headerActions"
    />

    <bento-tabs
      :active-tab-index="activeTabIndex"
      @update:active-tab-index="activeTabIndex = $event"
    >
      <bento-tab title="Orders" />
      <bento-tab title="Returns" />
    </bento-tabs>

    <!-- ── Orders: grid + inspector ─────────────────────────────────────── -->
    <bento-inspector
      v-if="activeTabIndex === 0"
      title="Order details"
      size="small"
      :is-open="!!selectedOrder"
      :active-page="inspectorActivePage"
      @update:is-open="onInspectorClose"
      @update:active-page="inspectorActivePage = $event"
    >
      <template #page>
        <bento-data-grid
          :columns="orderColumns"
          :data="orderRows"
          :filters="orderFiltersConfig"
          :filter-values="orderFilterValues"
          :filter-search-config="orderSearchConfig"
          :filter-search-term="orderSearchTerm"
          :pagination="orderPagination"
          selectable
          fit-content
          :selection="orderSelection"
          @update:selection="orderSelection = $event"
          @update:pagination="orderPagination = $event"
          @update:filter-values="orderFilterValues = $event"
          @update:filter-search-term="orderSearchTerm = $event"
          @click:row="onOrderSelect"
        >
          <template #item-orderId="{ item }">
            <bento-link is-not-routing to="#" @click.prevent="onOrderSelect(item)">
              {{ item.orderId }}
            </bento-link>
          </template>

          <template #item-amount="{ item }">
            <bento-currency :currency="item.currency" :value="item.amount" />
          </template>

          <template #item-status="{ item }">
            <bento-tag :color="orderStatusColor(item.status)">{{ item.status }}</bento-tag>
          </template>

          <template #item-actions="{ item }">
            <bento-button variant="tertiary" @click.stop="() => {}">
              <template #iconLeft>
                <options-vertical-icon :svg-title="'Actions for ' + item.orderId" />
              </template>
            </bento-button>
          </template>
        </bento-data-grid>
      </template>

      <template #content>
        <div v-if="selectedOrder" class="or__detail">
          <div class="or__detail-header">
            <span class="or__detail-id">{{ selectedOrder.orderId }}</span>
            <bento-button variant="tertiary" @click="onInspectorClose">
              <template #iconLeft>
                <cross-icon svg-title="Close" />
              </template>
            </bento-button>
          </div>

          <div class="or__detail-body">
            <div class="or__section">
              <p class="or__section-title">Summary</p>
              <bento-structured-list layout="42-58">
                <bento-structured-list-item label="Order ID" :copy="selectedOrder.orderId">
                  {{ selectedOrder.orderId }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Date">
                  {{ selectedOrder.date }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Amount">
                  <bento-currency :currency="selectedOrder.currency" :value="selectedOrder.amount" />
                </bento-structured-list-item>
                <bento-structured-list-item label="Status">
                  <bento-tag :color="orderStatusColor(selectedOrder.status)">{{ selectedOrder.status }}</bento-tag>
                </bento-structured-list-item>
              </bento-structured-list>
            </div>

            <div class="or__section">
              <p class="or__section-title">Payment</p>
              <bento-structured-list layout="42-58">
                <bento-structured-list-item label="Method">
                  {{ selectedOrder.paymentMethod }}
                </bento-structured-list-item>
                <bento-structured-list-item label="PSP reference" :copy="selectedOrder.pspReference">
                  {{ selectedOrder.pspReference }}
                </bento-structured-list-item>
              </bento-structured-list>
            </div>

            <div class="or__section">
              <p class="or__section-title">Location</p>
              <bento-structured-list layout="42-58">
                <bento-structured-list-item label="Store">
                  <bento-link is-not-routing to="#">{{ selectedOrder.store }}</bento-link>
                </bento-structured-list-item>
                <bento-structured-list-item label="Terminal">
                  {{ selectedOrder.terminal }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Merchant account">
                  <bento-link is-not-routing to="#">{{ selectedOrder.merchantAccount }}</bento-link>
                </bento-structured-list-item>
              </bento-structured-list>
            </div>
          </div>
        </div>
      </template>
    </bento-inspector>

    <!-- ── Orders: action bar ────────────────────────────────────────────── -->
    <bento-action-bar
      v-if="activeTabIndex === 0 && orderSelection.length > 0"
      :actions="orderBulkActions"
      :item-counter="orderSelection.length"
      @close="orderSelection = []"
    />

    <!-- ── Returns: grid ─────────────────────────────────────────────────── -->
    <bento-data-grid
      v-if="activeTabIndex === 1"
      :columns="returnColumns"
      :data="returnRows"
      :filters="returnFiltersConfig"
      :filter-values="returnFilterValues"
      :filter-search-config="returnSearchConfig"
      :filter-search-term="returnSearchTerm"
      :pagination="returnPagination"
      selectable
      fit-content
      :selection="returnSelection"
      @update:selection="returnSelection = $event"
      @update:pagination="returnPagination = $event"
      @update:filter-values="returnFilterValues = $event"
      @update:filter-search-term="returnSearchTerm = $event"
    >
      <template #item-returnId="{ item }">
        <bento-link is-not-routing to="#">{{ item.returnId }}</bento-link>
      </template>

      <template #item-orderReference="{ item }">
        <bento-link is-not-routing to="#">{{ item.orderReference }}</bento-link>
      </template>

      <template #item-amount="{ item }">
        <bento-currency :currency="item.currency" :value="item.amount" />
      </template>

      <template #item-status="{ item }">
        <bento-tag :color="returnStatusColor(item.status)">{{ item.status }}</bento-tag>
      </template>
    </bento-data-grid>

    <!-- ── Returns: action bar ───────────────────────────────────────────── -->
    <bento-action-bar
      v-if="activeTabIndex === 1 && returnSelection.length > 0"
      :actions="returnBulkActions"
      :item-counter="returnSelection.length"
      @close="returnSelection = []"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  BentoHeader, BentoTabs, BentoTab,
  BentoDataGrid, BentoLink, BentoTag, BentoButton, BentoCurrency,
  BentoInspector, BentoStructuredList, BentoStructuredListItem,
  BentoActionBar, BentoFilterItemType, BentoColumnOverflow,
} from '@adyen/bento-vue2';
import type { BentoColumn, BentoFilterBarModel, BentoFilterValues, BentoDatagridSelection } from '@adyen/bento-vue2';
import CrossIcon from '@adyen/ui-assets-icons-16/vue/cross';
import DownloadIcon from '@adyen/ui-assets-icons-16/vue/download';
import RefundIcon from '@adyen/ui-assets-icons-16/vue/refund';
import OptionsVerticalIcon from '@adyen/ui-assets-icons-16/vue/options-vertical';

// ── Types ────────────────────────────────────────────────────────────────────

interface Order {
  id: string;
  orderId: string;
  date: string;
  amount: number;
  currency: string;
  status: 'Completed' | 'Processing' | 'Cancelled';
  store: string;
  terminal: string;
  paymentMethod: string;
  pspReference: string;
  merchantAccount: string;
  [key: string]: unknown;
}

interface Return {
  id: string;
  returnId: string;
  orderReference: string;
  date: string;
  amount: number;
  currency: string;
  status: 'Processed' | 'Pending' | 'Rejected';
  store: string;
  terminal: string;
  reason: string;
  [key: string]: unknown;
}

// ── Mock data ────────────────────────────────────────────────────────────────

const MOCK_ORDERS: Order[] = [
  { id: '1',  orderId: 'ORD-2026-053401', date: 'May 29, 2026, 14:32', amount: 4599,  currency: 'USD', status: 'Completed',  store: 'Camp Cantina',    terminal: 'P400Plus-346843', paymentMethod: 'Mastercard', pspReference: '882614782631458F', merchantAccount: 'NikePOS_US' },
  { id: '2',  orderId: 'ORD-2026-053398', date: 'May 29, 2026, 13:51', amount: 12900, currency: 'USD', status: 'Completed',  store: 'Union Square',    terminal: 'P400Plus-346901', paymentMethod: 'Visa',       pspReference: '8826147826314593', merchantAccount: 'NikePOS_US' },
  { id: '3',  orderId: 'ORD-2026-053392', date: 'May 29, 2026, 12:18', amount: 8900,  currency: 'USD', status: 'Processing', store: 'Riverside Café',  terminal: 'E355-837291',     paymentMethod: 'Amex',       pspReference: '882614782631459A', merchantAccount: 'NikePOS_US' },
  { id: '4',  orderId: 'ORD-2026-053387', date: 'May 29, 2026, 11:45', amount: 3200,  currency: 'EUR', status: 'Completed',  store: 'Joffrey Store 2', terminal: 'V400m-293847',    paymentMethod: 'Mastercard', pspReference: '8826147826314601', merchantAccount: 'NikePOS_EU' },
  { id: '5',  orderId: 'ORD-2026-053383', date: 'May 29, 2026, 10:22', amount: 24500, currency: 'USD', status: 'Cancelled',  store: 'Camp Cantina',    terminal: 'P400Plus-346843', paymentMethod: 'Visa',       pspReference: '882614782631460B', merchantAccount: 'NikePOS_US' },
  { id: '6',  orderId: 'ORD-2026-053375', date: 'May 29, 2026, 09:14', amount: 5800,  currency: 'EUR', status: 'Completed',  store: 'Joffrey Store 2', terminal: 'V400m-293847',    paymentMethod: 'iDEAL',     pspReference: '882614782631461D', merchantAccount: 'NikePOS_EU' },
  { id: '7',  orderId: 'ORD-2026-053370', date: 'May 28, 2026, 20:47', amount: 11200, currency: 'USD', status: 'Completed',  store: 'Union Square',    terminal: 'P400Plus-346901', paymentMethod: 'Mastercard', pspReference: '8826147826314620', merchantAccount: 'NikePOS_US' },
  { id: '8',  orderId: 'ORD-2026-053362', date: 'May 28, 2026, 18:33', amount: 7800,  currency: 'USD', status: 'Completed',  store: 'Riverside Café',  terminal: 'E355-837291',     paymentMethod: 'Visa',       pspReference: '8826147826314632', merchantAccount: 'NikePOS_US' },
  { id: '9',  orderId: 'ORD-2026-053359', date: 'May 28, 2026, 17:15', amount: 15600, currency: 'AUD', status: 'Completed',  store: 'UC SG',           terminal: 'P400Plus-112233', paymentMethod: 'Mastercard', pspReference: '8826147826314645', merchantAccount: 'NikePOS_APAC' },
  { id: '10', orderId: 'ORD-2026-053354', date: 'May 28, 2026, 15:58', amount: 4200,  currency: 'USD', status: 'Processing', store: 'Camp Cantina',    terminal: 'P400Plus-346843', paymentMethod: 'Visa',       pspReference: '8826147826314658', merchantAccount: 'NikePOS_US' },
  { id: '11', orderId: 'ORD-2026-053350', date: 'May 28, 2026, 14:40', amount: 6700,  currency: 'GBP', status: 'Completed',  store: 'TestyMcTestface', terminal: 'P400Plus-998877', paymentMethod: 'Mastercard', pspReference: '882614782631466C', merchantAccount: 'NikePOS_UK' },
  { id: '12', orderId: 'ORD-2026-053343', date: 'May 28, 2026, 12:22', amount: 3900,  currency: 'EUR', status: 'Completed',  store: 'Joffrey Store 2', terminal: 'V400m-293848',    paymentMethod: 'Visa',       pspReference: '882614782631467E', merchantAccount: 'NikePOS_EU' },
  { id: '13', orderId: 'ORD-2026-053337', date: 'May 28, 2026, 10:05', amount: 19800, currency: 'USD', status: 'Cancelled',  store: 'Union Square',    terminal: 'P400Plus-346902', paymentMethod: 'Amex',       pspReference: '8826147826314681', merchantAccount: 'NikePOS_US' },
  { id: '14', orderId: 'ORD-2026-053330', date: 'May 27, 2026, 21:38', amount: 840,   currency: 'JPY', status: 'Completed',  store: 'Store03005',      terminal: 'P400Plus-556677', paymentMethod: 'Visa',       pspReference: '8826147826314694', merchantAccount: 'NikePOS_JP' },
  { id: '15', orderId: 'ORD-2026-053325', date: 'May 27, 2026, 19:12', amount: 5500,  currency: 'USD', status: 'Completed',  store: 'Riverside Café',  terminal: 'E355-837292',     paymentMethod: 'Mastercard', pspReference: '8826147826314707', merchantAccount: 'NikePOS_US' },
];

const MOCK_RETURNS: Return[] = [
  { id: 'r1',  returnId: 'RET-2026-008412', orderReference: 'ORD-2026-053383', date: 'May 29, 2026, 15:01', amount: 24500, currency: 'USD', status: 'Pending',   store: 'Camp Cantina',    terminal: 'P400Plus-346843', reason: 'Customer request'     },
  { id: 'r2',  returnId: 'RET-2026-008409', orderReference: 'ORD-2026-053337', date: 'May 28, 2026, 11:44', amount: 19800, currency: 'USD', status: 'Processed', store: 'Union Square',    terminal: 'P400Plus-346902', reason: 'Wrong item'           },
  { id: 'r3',  returnId: 'RET-2026-008402', orderReference: 'ORD-2026-052918', date: 'May 27, 2026, 16:22', amount: 6700,  currency: 'GBP', status: 'Processed', store: 'TestyMcTestface', terminal: 'P400Plus-998877', reason: 'Defective item'       },
  { id: 'r4',  returnId: 'RET-2026-008395', orderReference: 'ORD-2026-052881', date: 'May 27, 2026, 10:55', amount: 3200,  currency: 'EUR', status: 'Rejected',  store: 'Joffrey Store 2', terminal: 'V400m-293847',    reason: 'Outside return window'},
  { id: 'r5',  returnId: 'RET-2026-008388', orderReference: 'ORD-2026-052744', date: 'May 26, 2026, 18:30', amount: 8900,  currency: 'USD', status: 'Processed', store: 'Riverside Café',  terminal: 'E355-837291',     reason: 'Overcharge'           },
  { id: 'r6',  returnId: 'RET-2026-008374', orderReference: 'ORD-2026-052631', date: 'May 25, 2026, 14:17', amount: 15600, currency: 'AUD', status: 'Processed', store: 'UC SG',           terminal: 'P400Plus-112233', reason: 'Customer request'     },
  { id: 'r7',  returnId: 'RET-2026-008361', orderReference: 'ORD-2026-052504', date: 'May 24, 2026, 09:42', amount: 4200,  currency: 'USD', status: 'Pending',   store: 'Camp Cantina',    terminal: 'P400Plus-346843', reason: 'Defective item'       },
  { id: 'r8',  returnId: 'RET-2026-008349', orderReference: 'ORD-2026-052387', date: 'May 23, 2026, 13:28', amount: 5800,  currency: 'EUR', status: 'Processed', store: 'Joffrey Store 2', terminal: 'V400m-293848',    reason: 'Wrong item'           },
  { id: 'r9',  returnId: 'RET-2026-008334', orderReference: 'ORD-2026-052265', date: 'May 22, 2026, 11:15', amount: 11200, currency: 'USD', status: 'Rejected',  store: 'Union Square',    terminal: 'P400Plus-346901', reason: 'No receipt'           },
  { id: 'r10', returnId: 'RET-2026-008321', orderReference: 'ORD-2026-052148', date: 'May 21, 2026, 16:55', amount: 7800,  currency: 'USD', status: 'Processed', store: 'Riverside Café',  terminal: 'E355-837292',     reason: 'Customer request'     },
];

// ── Columns ──────────────────────────────────────────────────────────────────

const orderColumns: BentoColumn[] = [
  { field: 'orderId',       label: 'Order ID',        minWidth: 180, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'date',          label: 'Date',            minWidth: 190 },
  { field: 'amount',        label: 'Amount',          minWidth: 130, numeric: true },
  { field: 'status',        label: 'Status',          minWidth: 130 },
  { field: 'store',         label: 'Store',           minWidth: 160, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'terminal',      label: 'Terminal',        minWidth: 160, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'paymentMethod', label: 'Payment method',  minWidth: 150 },
  { field: 'actions',       label: '',                minWidth: 56,  sortable: false },
];

const returnColumns: BentoColumn[] = [
  { field: 'returnId',        label: 'Return ID',       minWidth: 180, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'orderReference',  label: 'Order reference', minWidth: 180, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'date',            label: 'Date',            minWidth: 190 },
  { field: 'amount',          label: 'Amount',          minWidth: 130, numeric: true },
  { field: 'status',          label: 'Status',          minWidth: 130 },
  { field: 'store',           label: 'Store',           minWidth: 160, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'terminal',        label: 'Terminal',        minWidth: 160, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'reason',          label: 'Reason',          minWidth: 180 },
];

// ── Filters ──────────────────────────────────────────────────────────────────

const orderFiltersConfig: BentoFilterBarModel = [
  {
    field: 'dateFilter',
    label: 'Date',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'today', label: 'Today' }, { value: 'yesterday', label: 'Yesterday' }, { value: 'last7days', label: 'Last 7 days' }, { value: 'thisMonth', label: 'This month' }] },
  },
  {
    field: 'status',
    label: 'Status',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'Completed', label: 'Completed' }, { value: 'Processing', label: 'Processing' }, { value: 'Cancelled', label: 'Cancelled' }] },
  },
  {
    field: 'store',
    label: 'Store',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'camp-cantina', label: 'Camp Cantina' }, { value: 'union-square', label: 'Union Square' }, { value: 'riverside', label: 'Riverside Café' }, { value: 'joffrey', label: 'Joffrey Store 2' }] },
  },
  {
    field: 'paymentMethod',
    label: 'Payment method',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'Visa', label: 'Visa' }, { value: 'Mastercard', label: 'Mastercard' }, { value: 'Amex', label: 'Amex' }, { value: 'iDEAL', label: 'iDEAL' }] },
  },
];

const returnFiltersConfig: BentoFilterBarModel = [
  {
    field: 'dateFilter',
    label: 'Date',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'today', label: 'Today' }, { value: 'yesterday', label: 'Yesterday' }, { value: 'last7days', label: 'Last 7 days' }, { value: 'thisMonth', label: 'This month' }] },
  },
  {
    field: 'status',
    label: 'Status',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'Processed', label: 'Processed' }, { value: 'Pending', label: 'Pending' }, { value: 'Rejected', label: 'Rejected' }] },
  },
  {
    field: 'store',
    label: 'Store',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'camp-cantina', label: 'Camp Cantina' }, { value: 'union-square', label: 'Union Square' }, { value: 'riverside', label: 'Riverside Café' }, { value: 'joffrey', label: 'Joffrey Store 2' }] },
  },
  {
    field: 'reason',
    label: 'Reason',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'customer-request', label: 'Customer request' }, { value: 'defective', label: 'Defective item' }, { value: 'wrong-item', label: 'Wrong item' }, { value: 'overcharge', label: 'Overcharge' }] },
  },
];

// ── Search configs ────────────────────────────────────────────────────────────

const orderSearchConfig  = { placeholder: 'Search order ID or PSP reference', inputFieldAriaLabel: 'Search orders' };
const returnSearchConfig = { placeholder: 'Search return ID or order reference', inputFieldAriaLabel: 'Search returns' };

// ── Header actions ────────────────────────────────────────────────────────────

const headerActions = [
  { title: 'Export', variant: 'secondary' as const, icon: DownloadIcon, event: () => {} },
];

// ── Bulk actions ──────────────────────────────────────────────────────────────

const orderBulkActions  = [
  { title: 'Export', icon: DownloadIcon, event: () => {} },
];
const returnBulkActions = [
  { title: 'Process refund', icon: RefundIcon, event: () => {} },
];

// ── Orders state ──────────────────────────────────────────────────────────────

const activeTabIndex      = ref(0);
const selectedOrder       = ref<Order | null>(null);
const inspectorActivePage = ref('detail');
const orderSelection      = ref<BentoDatagridSelection>([]);
const orderFilterValues   = ref<BentoFilterValues>([]);
const orderSearchTerm     = ref('');
const orderPagination     = ref({ page: 1, size: 50, totalCount: 3241, pageSizes: [10, 25, 50, 100] });
const orderRows           = ref<Order[]>(MOCK_ORDERS.map(o => ({ ...o })));

function onOrderSelect(item: Order): void {
  selectedOrder.value = item;
  inspectorActivePage.value = 'detail';
}

function onInspectorClose(): void {
  selectedOrder.value = null;
}

function orderStatusColor(status: Order['status']): string {
  if (status === 'Completed')  return 'green';
  if (status === 'Processing') return 'blue';
  if (status === 'Cancelled')  return 'red';
  return 'grey';
}

// ── Returns state ─────────────────────────────────────────────────────────────

const returnSelection    = ref<BentoDatagridSelection>([]);
const returnFilterValues = ref<BentoFilterValues>([]);
const returnSearchTerm   = ref('');
const returnPagination   = ref({ page: 1, size: 50, totalCount: 487, pageSizes: [10, 25, 50, 100] });
const returnRows         = ref<Return[]>(MOCK_RETURNS.map(r => ({ ...r })));

function returnStatusColor(status: Return['status']): string {
  if (status === 'Processed') return 'green';
  if (status === 'Pending')   return 'yellow';
  if (status === 'Rejected')  return 'red';
  return 'grey';
}
</script>

<style lang="scss" scoped>
.or {
  padding: var(--b-spacer-070) var(--b-spacer-090);

  ::v-deep .b-header-meta__description {
    margin-bottom: var(--b-spacer-070);
  }

  &__detail {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
  }

  &__detail-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--b-spacer-060);
    padding: var(--b-spacer-070) var(--b-spacer-090);
    border-bottom: 1px solid var(--b-color-outline-secondary);
    flex-shrink: 0;
  }

  &__detail-id {
    font-family: var(--b-text-title-font-family);
    font-size: var(--b-text-title-font-size);
    font-weight: var(--b-text-title-font-weight);
    color: var(--b-color-label-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }

  &__detail-body {
    flex: 1;
    overflow-y: auto;
    padding: var(--b-spacer-070) var(--b-spacer-090) var(--b-spacer-090);
    display: flex;
    flex-direction: column;
    gap: var(--b-spacer-090);
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: var(--b-spacer-020);
  }

  &__section-title {
    margin: 0;
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
    font-weight: var(--b-text-body-stronger-font-weight, 600);
    color: var(--b-color-label-primary);
  }
}
</style>
