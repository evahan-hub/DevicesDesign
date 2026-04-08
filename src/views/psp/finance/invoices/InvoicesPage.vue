<template>
  <div class="page page--locked page--data-grid">
    <bento-header title="Invoices" :actions="headerActions" />

    <section class="content-section--flex">
      <bento-tabs
        :active-tab-index="activeTabIndex"
        @update:active-tab-index="activeTabIndex = $event"
      >
        <bento-tab title="All" />
        <bento-tab title="Paid" :counter="paidCount" :with-notification-indicator="true" />
        <bento-tab title="Pending" :counter="pendingCount" :with-notification-indicator="true" />
        <bento-tab title="Overdue" :counter="overdueCount" :with-notification-indicator="true" />
      </bento-tabs>

      <bento-data-grid
        :columns="columns"
        :data="filteredData"
        :filters="filtersConfig"
        :filter-values="filterValues"
        :filter-search-term="searchTerm"
        :filter-search-config="searchConfig"
        selectable
        column-panel
        fit-content
        :selection="selection"
        :pagination="pagination"
        @update:selection="selection = $event"
        @update:columns="columns = $event"
        @update:pagination="pagination = $event"
        @update:filter-values="filterValues = $event"
        @update:filter-search-term="searchTerm = $event"
        :row-actions="rowActions"
      >
        <template #item-status="{ item }">
          <div class="status-cell">
            <bento-status :variant="getStatusVariant(item.status)" />
            <span>{{ item.status }}</span>
          </div>
        </template>

        <template #item-amount="{ item }">
          <bento-currency :currency="item.currency" :value="item.amount" />
        </template>
      </bento-data-grid>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import {
  BentoHeader, BentoTabs, BentoTab, BentoDataGrid,
  BentoStatus, BentoStatusVariant, BentoCurrency,
} from '@adyen/bento-vue2';
import type {
  BentoColumn, BentoDatagridSelection, BentoFilterBarModel,
  BentoFilterValues, BentoDataGridRowActionsProp,
} from '@adyen/bento-vue2';
import { useRouter } from 'vue-router/composables';
import type { Invoice } from './invoices-page.types';
import { INVOICES_COLUMNS, INVOICES_FILTERS, MOCK_INVOICES } from './invoices-page.mock-data';

const DownloadIcon = {
  render(h: any) {
    return h('svg', { attrs: { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': 'true' } }, [
      h('path', { attrs: { d: 'M8 1v8M5 6.5 8 10l3-3.5', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' } }),
      h('path', { attrs: { d: 'M2 12v1.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V12', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round' } }),
    ]);
  },
};

const router = useRouter();

const activeTabIndex = ref(0);
const selection = ref<BentoDatagridSelection>([]);
const pagination = ref({ page: 1, size: 10, totalCount: 10, pageSizes: [10, 20, 50] });
const searchTerm = ref('');
const filterValues = ref<BentoFilterValues>([]);
const columns = ref<BentoColumn[]>(INVOICES_COLUMNS);
const searchConfig = { placeholder: 'Search for an invoice number', inputFieldAriaLabel: 'Search for an invoice number' };

const rowActions: BentoDataGridRowActionsProp = [
  { title: 'View', event: (item: Invoice) => router.push({ name: 'invoice-detail', params: { id: String(item.invoiceNumber) } }).catch(() => {}) },
  { title: 'Download', iconOnly: true, icon: DownloadIcon, event: (_item: Invoice) => {} },
] as unknown as BentoDataGridRowActionsProp;

const headerActions = [{ title: 'Download list', variant: 'primary' as const, event: () => {} }];
const filtersConfig: BentoFilterBarModel = INVOICES_FILTERS;
const invoices = ref<Invoice[]>(MOCK_INVOICES.map(i => ({ ...i })));

const paidCount = computed(() => invoices.value.filter(i => i.status === 'Paid').length);
const pendingCount = computed(() => invoices.value.filter(i => i.status === 'Pending').length);
const overdueCount = computed(() => invoices.value.filter(i => i.status === 'Overdue').length);

const tabFilteredInvoices = computed<Invoice[]>(() => {
  if (activeTabIndex.value === 1) return invoices.value.filter(i => i.status === 'Paid');
  if (activeTabIndex.value === 2) return invoices.value.filter(i => i.status === 'Pending');
  if (activeTabIndex.value === 3) return invoices.value.filter(i => i.status === 'Overdue');
  return invoices.value;
});

const filteredData = computed<Invoice[]>(() =>
  tabFilteredInvoices.value.filter(item => {
    const matchesFilters = filterValues.value.length > 0
      ? filterValues.value.every((filter: any) => {
          if (!filter.value || ['dateIssued', 'period', 'legalEntity'].includes(filter.field)) return true;
          return String(item[filter.field]).toLowerCase().includes(String(filter.value).toLowerCase());
        })
      : true;
    const matchesSearch = searchTerm.value
      ? item.invoiceNumber.toLowerCase().includes(searchTerm.value.toLowerCase())
      : true;
    return matchesFilters && matchesSearch;
  })
);

function getStatusVariant(status: string): BentoStatusVariant {
  switch (status) {
    case 'Paid': return BentoStatusVariant.GREEN;
    case 'Overdue': return BentoStatusVariant.RED;
    case 'Pending': return BentoStatusVariant.YELLOW;
    default: return BentoStatusVariant.GREY;
  }
}
</script>

<style scoped>
.status-cell {
  display: flex;
  align-items: center;
  gap: var(--b-spacer-030);
  width: 100%;
}

/* Paid tab (2nd) → green dot */
::v-deep .b-tabs__tab:nth-child(2) .b-tabs__tab-notification-dot {
  background-color: var(--b-color-decorative-green);
}

/* Pending tab (3rd) → yellow dot */
::v-deep .b-tabs__tab:nth-child(3) .b-tabs__tab-notification-dot {
  background-color: var(--b-color-decorative-yellow);
}

/* Overdue tab (4th) → red dot */
::v-deep .b-tabs__tab:nth-child(4) .b-tabs__tab-notification-dot {
  background-color: var(--b-color-decorative-red);
}
</style>
