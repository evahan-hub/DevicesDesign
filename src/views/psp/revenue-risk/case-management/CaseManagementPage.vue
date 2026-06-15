<template>
  <div class="cm page page--locked page--data-grid-template">
    <bento-data-grid-template
      class="content-section--flex"
      :header="headerConfig"
      :tabs="tabsConfig"
      sticky-tabs
    >
      <template #header-actions>
        <bento-button variant="secondary" @click="console.log('Export')">
          <template #iconLeft>
            <download-icon svg-title="Export" />
          </template>
          Export
        </bento-button>
      </template>

      <template v-for="index in tabsConfig.tabs.length" v-slot:[getTabSlotName(index-1)]>
        <bento-data-grid
          :key="index"
          :columns="columns"
          :data="getTabData(index - 1)"
          :filters="filtersConfig"
          :filter-values="filterValues"
          :filter-search-term="searchTerm"
          selectable
          column-panel
          allow-column-drag-and-drop
          fit-content
          :selection="selection"
          :pagination="pagination"
          @update:selection="selection = $event"
          @update:columns="columns = $event"
          @update:pagination="pagination = $event"
          @update:filter-values="filterValues = $event"
          @update:filter-search-term="searchTerm = $event"
        >
          <template #item-assignee="{ item }">
            <bento-button v-if="!item.assignee" variant="secondary" size="small" :condensed="true">
              Assign
            </bento-button>
            <span v-else>{{ item.assignee }}</span>
          </template>

          <template #item-pspReference="{ item }">
            <bento-link is-not-routing to="#" :title="item.pspReference">
              {{ item.pspReference }}
            </bento-link>
          </template>

          <template #item-amount="{ item }">
            {{ formatAmount(item.amount.value, item.amount.currency) }}
          </template>

          <template #item-riskScore="{ item }">
            <bento-tag
              :label="String(item.riskScore)"
              :variant="scoreVariant(item.riskScore)"
            />
          </template>

          <template #item-status="{ item }">
            <bento-status :variant="statusVariant(item.status)">
              {{ statusLabel(item.status) }}
            </bento-status>
          </template>

          <template #item-tags="{ item }">
            <div class="cm__tags">
              <bento-tag v-for="tag in item.tags" :key="tag" :label="tag" size="small" />
            </div>
          </template>
        </bento-data-grid>
      </template>
    </bento-data-grid-template>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import {
  BentoButton, BentoDataGrid, BentoDataGridTemplate, BentoLink,
  BentoTag, BentoStatus, BentoColumnOverflow, BentoFilterItemType,
} from '@adyen/bento-vue2';
import type { BentoColumn, BentoDatagridSelection, BentoFilterBarModel, BentoFilterValues } from '@adyen/bento-vue2';
import DownloadIcon from '@adyen/ui-assets-icons-16/vue/download';
import { MOCK_CASES, CASE_TABS, formatAmount } from './case-management.mock-data';
import type { CaseStatus } from './case-management.types';

const headerConfig = { title: 'Case management' };
const tabsConfig = { tabs: CASE_TABS.map(t => ({ title: t })) };

const selection = ref<BentoDatagridSelection>([]);
const pagination = ref({ page: 1, size: 20, totalCount: MOCK_CASES.length, pageSizes: [10, 20, 50, 100] });
const searchTerm = ref('');
const filterValues = ref<BentoFilterValues>([]);

const filtersConfig: BentoFilterBarModel = [
  { field: 'paymentMethod', label: 'Payment method', value: null, type: BentoFilterItemType.SELECT, options: { listboxItems: [{ value: 'visa', label: 'Visa' }, { value: 'mastercard', label: 'Mastercard' }, { value: 'amex', label: 'Amex' }, { value: 'ideal', label: 'iDEAL' }] } },
  { field: 'shopperCountry', label: 'Shopper country', value: null, type: BentoFilterItemType.SELECT, options: { listboxItems: [{ value: 'NL', label: 'Netherlands' }, { value: 'DE', label: 'Germany' }, { value: 'US', label: 'United States' }, { value: 'GB', label: 'United Kingdom' }, { value: 'FR', label: 'France' }, { value: 'BE', label: 'Belgium' }] } },
  { field: 'riskScore', label: 'Min. risk score', value: null, type: BentoFilterItemType.INPUT },
];

const columns = ref<BentoColumn[]>([
  { field: 'assignee', label: 'Assignee', width: 160 },
  { field: 'pspReference', label: 'PSP reference', minWidth: 200, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'riskScore', label: 'Risk score', width: 110 },
  { field: 'amount', label: 'Amount', width: 140 },
  { field: 'paymentMethod', label: 'Payment method', width: 150 },
  { field: 'shopperEmail', label: 'Shopper email', minWidth: 200, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'shopperCountry', label: 'Country', width: 100 },
  { field: 'status', label: 'Status', width: 120 },
  { field: 'creationDate', label: 'Creation date', minWidth: 180, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'tags', label: 'Tags', minWidth: 160 },
]);

const filteredCases = computed(() =>
  MOCK_CASES.filter(item => {
    const matchesFilters = filterValues.value.length > 0
      ? filterValues.value.every((filter: any) => {
          if (!filter.value) return true;
          if (filter.field === 'riskScore') {
            return item.riskScore >= Number(filter.value);
          }
          const fieldVal = String((item as any)[filter.field] ?? '').toLowerCase();
          return fieldVal.includes(String(filter.value).toLowerCase());
        })
      : true;
    const matchesSearch = searchTerm.value
      ? item.pspReference.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        item.shopperEmail.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        item.merchantReference.toLowerCase().includes(searchTerm.value.toLowerCase())
      : true;
    return matchesFilters && matchesSearch;
  })
);

function getTabSlotName(index: number): string { return `tab-${index + 1}`; }

function getTabData(index: number): any[] {
  const data = filteredCases.value;
  if (index === 0) return data.filter(c => c.status === 'open');
  if (index === 1) return data.filter(c => c.status === 'in_review');
  return data.filter(c => ['accepted', 'rejected', 'expired'].includes(c.status));
}

type TagVariant = 'blue' | 'green' | 'grey' | 'orange' | 'red' | 'white';
type StatusVariant = 'blue' | 'green' | 'grey' | 'orange' | 'red' | 'yellow';

function scoreVariant(score: number): TagVariant {
  if (score >= 80) return 'red';
  if (score >= 60) return 'orange';
  return 'green';
}

function statusVariant(status: CaseStatus): StatusVariant {
  const map: Record<CaseStatus, StatusVariant> = { open: 'blue', in_review: 'orange', accepted: 'green', rejected: 'red', expired: 'grey' };
  return map[status];
}

function statusLabel(status: CaseStatus): string {
  const map: Record<CaseStatus, string> = { open: 'Open', in_review: 'In review', accepted: 'Accepted', rejected: 'Rejected', expired: 'Expired' };
  return map[status];
}
</script>

<style lang="scss" scoped>
.cm {
  &__tags {
    display: flex;
    gap: var(--b-spacer-020);
    flex-wrap: wrap;
  }
}
</style>
