<template>
  <div class="or">
    <bento-header
      title="Orders & returns"
      :actions="headerActions"
    />

    <!-- ── Orders & returns: grid + inspector ───────────────────────────── -->
    <bento-inspector
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
          <template #item-status="{ item }">
            <bento-tag :color="orderStatusColor(item.status)">{{ item.status }}</bento-tag>
          </template>

          <template #item-orderNumber="{ item }">
            <bento-link is-not-routing to="#" @click.prevent="onOrderSelect(item)">
              {{ item.orderNumber }}
            </bento-link>
          </template>

          <template #item-orderReference="{ item }">
            <span v-if="item.orderReference">{{ item.orderReference }}</span>
            <span v-else class="or__dash">-</span>
          </template>

          <template #item-trackTrace="{ item }">
            <span v-if="item.hasTracking" class="or__track" aria-label="Track & trace">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3.25h6.75V10" stroke="var(--b-color-label-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.75 3.25 6.5 9.5" stroke="var(--b-color-label-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.75 12.75H3.25V5.25" stroke="var(--b-color-label-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span v-else class="or__dash">-</span>
          </template>

          <template #item-country="{ item }">
            <span class="or__country">{{ item.country }}</span>
          </template>

          <template #item-terminalQty="{ item }">{{ item.terminalQty }}</template>
          <template #item-totalQty="{ item }">{{ item.totalQty }}</template>
        </bento-data-grid>
      </template>

      <template #content>
        <div v-if="selectedOrder" class="or__detail">
          <div class="or__detail-header">
            <span class="or__detail-id">{{ selectedOrder.orderNumber }}</span>
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
                <bento-structured-list-item label="Order number" :copy="selectedOrder.orderNumber">
                  {{ selectedOrder.orderNumber }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Order reference">
                  <span v-if="selectedOrder.orderReference">{{ selectedOrder.orderReference }}</span>
                  <span v-else class="or__dash">-</span>
                </bento-structured-list-item>
                <bento-structured-list-item label="Order type">
                  {{ selectedOrder.orderType }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Status">
                  <bento-tag :color="orderStatusColor(selectedOrder.status)">{{ selectedOrder.status }}</bento-tag>
                </bento-structured-list-item>
                <bento-structured-list-item label="Order date">
                  {{ selectedOrder.orderDate }}
                </bento-structured-list-item>
              </bento-structured-list>
            </div>

            <div class="or__section">
              <p class="or__section-title">Fulfilment</p>
              <bento-structured-list layout="42-58">
                <bento-structured-list-item label="Company / Merchant">
                  <bento-link is-not-routing to="#">{{ selectedOrder.company }}</bento-link>
                </bento-structured-list-item>
                <bento-structured-list-item label="Terminal quantity">
                  {{ selectedOrder.terminalQty }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Total quantity">
                  {{ selectedOrder.totalQty }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Warehouse">
                  {{ selectedOrder.warehouse }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Country/Region">
                  {{ selectedOrder.country }}
                </bento-structured-list-item>
              </bento-structured-list>
            </div>
          </div>
        </div>
      </template>
    </bento-inspector>

    <!-- ── Action bar ─────────────────────────────────────────────────────── -->
    <bento-action-bar
      v-if="orderSelection.length > 0"
      :actions="orderBulkActions"
      :item-counter="orderSelection.length"
      @close="orderSelection = []"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  BentoHeader,
  BentoDataGrid, BentoLink, BentoTag, BentoButton,
  BentoInspector, BentoStructuredList, BentoStructuredListItem,
  BentoActionBar, BentoFilterItemType, BentoColumnOverflow,
} from '@adyen/bento-vue2';
import type { BentoColumn, BentoFilterBarModel, BentoFilterValues, BentoDatagridSelection } from '@adyen/bento-vue2';
import CrossIcon from '@adyen/ui-assets-icons-16/vue/cross';
import DownloadIcon from '@adyen/ui-assets-icons-16/vue/download';
import AddIcon from '@adyen/ui-assets-icons-16/vue/plus';

// ── Types ────────────────────────────────────────────────────────────────────

interface Order {
  id: string;
  status: 'Delivered' | 'Cancelled' | 'Returns received';
  orderNumber: string;
  orderReference: string;
  orderType: 'Sales' | 'Return' | 'Replacement';
  hasTracking: boolean;
  company: string;
  terminalQty: number;
  totalQty: number;
  warehouse: string;
  country: string;
  orderDate: string;
  [key: string]: unknown;
}

// ── Mock data ────────────────────────────────────────────────────────────────

const MOCK_ORDERS: Order[] = [
  { id: '1',  status: 'Delivered',       orderNumber: 'CRL4JSBBKS692ZV5', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'AdyenTechSupport_SophieHa_TEST',        terminalQty: 2, totalQty: 8, warehouse: 'Oostrum',    country: 'NL', orderDate: 'Jun 24, 2026, 14:47' },
  { id: '2',  status: 'Delivered',       orderNumber: 'HJZLH4M3GJQGJQ65', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'AdyenTechSupport_SophieHa_TEST',        terminalQty: 2, totalQty: 8, warehouse: 'Oostrum',    country: 'NL', orderDate: 'Jun 24, 2026, 12:49' },
  { id: '3',  status: 'Delivered',       orderNumber: 'VJCW3QQLRCM6GVT5', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'AdyenTechSupport',                      terminalQty: 1, totalQty: 3, warehouse: 'Memphis',    country: 'US', orderDate: 'Jun 22, 2026, 10:44' },
  { id: '4',  status: 'Delivered',       orderNumber: 'BBWJSN7JRCM6GVT5', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'AdyenTechSupport_Tereza_TEST',          terminalQty: 1, totalQty: 4, warehouse: 'Oostrum',    country: 'NL', orderDate: 'Jun 19, 2026, 14:49' },
  { id: '5',  status: 'Cancelled',       orderNumber: 'L7RBDJ9C4P2B6R75', orderReference: '', orderType: 'Sales',       hasTracking: false, company: 'AdyenTechSupport_Lenayas_TEST',         terminalQty: 3, totalQty: 4, warehouse: 'Oostrum',    country: 'NL', orderDate: 'Jun 11, 2026, 19:07' },
  { id: '6',  status: 'Delivered',       orderNumber: 'SSPV35HLFJQGJQ65', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'ShaunC',                                terminalQty: 1, totalQty: 1, warehouse: 'Memphis',    country: 'US', orderDate: 'Jun 9, 2026, 20:59' },
  { id: '7',  status: 'Returns received', orderNumber: 'Q6W54HJXPFMK8B75', orderReference: '', orderType: 'Return',      hasTracking: true,  company: 'ShaunC',                                terminalQty: 1, totalQty: 1, warehouse: 'Memphis',    country: 'US', orderDate: 'Jun 9, 2026, 20:57' },
  { id: '8',  status: 'Delivered',       orderNumber: 'XT9VB3KG2CQWX5W5', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'AdyenTechSupport_AlbertPOS_TEST',       terminalQty: 2, totalQty: 7, warehouse: 'Oostrum',    country: 'DE', orderDate: 'Jun 5, 2026, 16:27' },
  { id: '9',  status: 'Cancelled',       orderNumber: 'KQ7P3SCDWJH2RMV5', orderReference: '', orderType: 'Replacement', hasTracking: false, company: 'ShaunC',                                terminalQty: 1, totalQty: 1, warehouse: 'Memphis',    country: 'US', orderDate: 'Jun 1, 2026, 19:52' },
  { id: '10', status: 'Delivered',       orderNumber: 'PMWV8V74QDHJVS75', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'AdyenTechSupport',                      terminalQty: 2, totalQty: 4, warehouse: 'Oostrum',    country: 'NL', orderDate: 'May 29, 2026, 09:59' },
  { id: '11', status: 'Delivered',       orderNumber: 'XXL5G7KBPWL7JQ75', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'AdyenTechSupport_BenKelly_TEST',        terminalQty: 0, totalQty: 6, warehouse: 'Oostrum',    country: 'NL', orderDate: 'May 20, 2026, 15:03' },
  { id: '12', status: 'Delivered',       orderNumber: 'C7K77SWVKMDN2S65', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'AdyenTechSupport_RayssaV_TEST',         terminalQty: 1, totalQty: 2, warehouse: 'Oostrum',    country: 'NL', orderDate: 'May 6, 2026, 10:37' },
  { id: '13', status: 'Delivered',       orderNumber: 'QSBJ4W2TMGX56XV5', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'CraigDrake',                            terminalQty: 1, totalQty: 1, warehouse: 'Sacramento', country: 'US', orderDate: 'Apr 11, 2026, 02:04' },
  { id: '14', status: 'Delivered',       orderNumber: 'JW3L5J8GCJQGJQ65', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'ShaunC',                                terminalQty: 1, totalQty: 1, warehouse: 'Memphis',    country: 'US', orderDate: 'Apr 3, 2026, 16:22' },
  { id: '15', status: 'Cancelled',       orderNumber: 'L22VG52XB3TFPJ75', orderReference: '', orderType: 'Sales',       hasTracking: false, company: 'AdyenTechSupport_UnifiedCommerce_TEST', terminalQty: 1, totalQty: 1, warehouse: 'Changi',     country: 'SG', orderDate: 'Apr 2, 2026, 19:11' },
  { id: '16', status: 'Delivered',       orderNumber: 'RTMVP2CXSKM355V5', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'AdyenTechSupport_BenKelly_TEST',        terminalQty: 1, totalQty: 1, warehouse: 'Oostrum',    country: 'NL', orderDate: 'Apr 2, 2026, 12:30' },
  { id: '17', status: 'Delivered',       orderNumber: 'VFG4TDM5DHTDMNT5', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'GuillaumeChayot',                       terminalQty: 1, totalQty: 3, warehouse: 'Oostrum',    country: 'FR', orderDate: 'Apr 1, 2026, 12:10' },
  { id: '18', status: 'Delivered',       orderNumber: 'TQJG4SJBCJQGJQ65', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'AdyenTechSupport_Rouzbeh_TEST',         terminalQty: 2, totalQty: 4, warehouse: 'Oostrum',    country: 'NL', orderDate: 'Mar 30, 2026, 13:12' },
  { id: '19', status: 'Delivered',       orderNumber: 'LW5F2NQ8GSZPGS65', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'AdyenTechSupport_UnifiedCommerce_TEST', terminalQty: 1, totalQty: 1, warehouse: 'Changi',     country: 'SG', orderDate: 'Mar 30, 2026, 03:58' },
  { id: '20', status: 'Delivered',       orderNumber: 'RZ7LVFWDWTMCLR75', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'AdyenTechSupport_UnifiedCommerce_TEST', terminalQty: 1, totalQty: 3, warehouse: 'Changi',     country: 'SG', orderDate: 'Mar 26, 2026, 02:58' },
  { id: '21', status: 'Delivered',       orderNumber: 'FQ94DZJVKJZ8FH75', orderReference: '', orderType: 'Return',      hasTracking: true,  company: 'AdyenTechSupport_TestingStation21_TEST', terminalQty: 1, totalQty: 1, warehouse: 'Oostrum',   country: 'NL', orderDate: 'Mar 20, 2026, 15:10' },
  { id: '22', status: 'Cancelled',       orderNumber: 'QVKNBVQL33LMSR65', orderReference: '', orderType: 'Sales',       hasTracking: false, company: 'AdyenTechSupport_JackyPan_TEST',        terminalQty: 1, totalQty: 3, warehouse: 'Memphis',    country: 'US', orderDate: 'Mar 19, 2026, 22:15' },
  { id: '23', status: 'Delivered',       orderNumber: 'G44HBQGK5F9SKTV5', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'AdyenTechSupport_AlbertPOS_TEST',       terminalQty: 1, totalQty: 4, warehouse: 'Oostrum',    country: 'DE', orderDate: 'Mar 10, 2026, 14:51' },
  { id: '24', status: 'Delivered',       orderNumber: 'FP9353ZCMVJL3J65', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'AdyenTechSupport_CamTest_TEST',         terminalQty: 1, totalQty: 4, warehouse: 'Memphis',    country: 'US', orderDate: 'Mar 5, 2026, 21:54' },
  { id: '25', status: 'Delivered',       orderNumber: 'Z2GKC9R8Q6R5KG75', orderReference: '', orderType: 'Sales',       hasTracking: true,  company: 'AdyenTechSupport_ISHANG_TEST',          terminalQty: 1, totalQty: 3, warehouse: 'Oostrum',    country: 'NL', orderDate: 'Mar 3, 2026, 13:23' },
];

// ── Columns ──────────────────────────────────────────────────────────────────

const orderColumns: BentoColumn[] = [
  { field: 'status',        label: 'Status',             minWidth: 135 },
  { field: 'orderNumber',   label: 'Order number',       minWidth: 185, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'orderReference', label: 'Order reference',   minWidth: 166, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'orderType',     label: 'Order type',         minWidth: 129 },
  { field: 'trackTrace',    label: 'Track & trace',      minWidth: 128, sortable: false },
  { field: 'company',       label: 'Company / Merchant', minWidth: 322, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'terminalQty',   label: 'Terminal quantity',  minWidth: 158, numeric: true },
  { field: 'totalQty',      label: 'Total quantity',     minWidth: 131, numeric: true },
  { field: 'warehouse',     label: 'Warehouse',          minWidth: 133 },
  { field: 'country',       label: 'Country/Region',     minWidth: 167 },
  { field: 'orderDate',     label: 'Order date',         minWidth: 158 },
];

// ── Filters ──────────────────────────────────────────────────────────────────

const orderFiltersConfig: BentoFilterBarModel = [
  {
    field: 'status',
    label: 'State',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'Delivered', label: 'Delivered' }, { value: 'Cancelled', label: 'Cancelled' }, { value: 'Returns received', label: 'Returns received' }] },
  },
  {
    field: 'orderType',
    label: 'Order type',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'Sales', label: 'Sales' }, { value: 'Return', label: 'Return' }, { value: 'Replacement', label: 'Replacement' }] },
  },
  {
    field: 'company',
    label: 'Company / Merchant',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'AdyenTechSupport', label: 'AdyenTechSupport' }, { value: 'ShaunC', label: 'ShaunC' }, { value: 'CraigDrake', label: 'CraigDrake' }, { value: 'GuillaumeChayot', label: 'GuillaumeChayot' }] },
  },
  {
    field: 'country',
    label: 'Country/Region',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'NL', label: 'Netherlands' }, { value: 'US', label: 'United States' }, { value: 'DE', label: 'Germany' }, { value: 'SG', label: 'Singapore' }, { value: 'FR', label: 'France' }] },
  },
];

const orderSearchConfig = { placeholder: 'Search order number, order reference', inputFieldAriaLabel: 'Search orders' };

// ── Header actions ────────────────────────────────────────────────────────────

const headerActions = [
  { title: 'Download CSV', variant: 'secondary' as const, icon: DownloadIcon, event: () => {} },
  { title: 'Create new', variant: 'primary' as const, icon: AddIcon, event: () => {} },
];

// ── Bulk actions ──────────────────────────────────────────────────────────────

const orderBulkActions = [
  { title: 'Download CSV', icon: DownloadIcon, event: () => {} },
];

// ── State ─────────────────────────────────────────────────────────────────────

const selectedOrder       = ref<Order | null>(null);
const inspectorActivePage = ref('detail');
const orderSelection      = ref<BentoDatagridSelection>([]);
const orderFilterValues   = ref<BentoFilterValues>([]);
const orderSearchTerm     = ref('');
const orderPagination     = ref({ page: 1, size: 25, totalCount: 677, pageSizes: [10, 25, 50, 100] });
const orderRows           = ref<Order[]>(MOCK_ORDERS.map(o => ({ ...o })));

function onOrderSelect(item: Order): void {
  selectedOrder.value = item;
  inspectorActivePage.value = 'detail';
}

function onInspectorClose(): void {
  selectedOrder.value = null;
}

function orderStatusColor(status: Order['status']): string {
  if (status === 'Delivered')        return 'green';
  if (status === 'Returns received') return 'green';
  if (status === 'Cancelled')        return 'red';
  return 'grey';
}
</script>

<style lang="scss" scoped>
.or {
  padding: var(--b-spacer-070) var(--b-spacer-090);

  ::v-deep .b-header-meta__description {
    margin-bottom: var(--b-spacer-070);
  }

  &__dash {
    color: var(--b-color-label-secondary);
  }

  &__track {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__country {
    color: var(--b-color-label-primary);
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
