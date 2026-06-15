<template>
  <div class="rl page page--locked page--data-grid-template">
    <bento-data-grid-template
      class="content-section--flex"
      :header="headerConfig"
      :tabs="tabsConfig"
      sticky-tabs
    >
      <template #header-actions>
        <bento-button variant="secondary" @click="console.log('Import')">
          <template #iconLeft>
            <upload-icon svg-title="Import" />
          </template>
          Import list
        </bento-button>
        <bento-button @click="console.log('Create')">
          <template #iconLeft>
            <add-icon svg-title="Create" />
          </template>
          Add entry
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
          column-panel
          fit-content
          :pagination="pagination"
          @update:columns="columns = $event"
          @update:pagination="pagination = $event"
          @update:filter-values="filterValues = $event"
          @update:filter-search-term="searchTerm = $event"
        >
          <template #item-type="{ item }">
            <bento-tag :label="item.type" :variant="item.listType === 'blocked' ? 'red' : 'green'" size="small" />
          </template>

          <template #item-scope="{ item }">
            <bento-tag :label="item.scope" size="small" />
          </template>

          <template #item-actions>
            <bento-button variant="tertiary" size="small" :condensed="true">
              <template #iconLeft>
                <delete-icon svg-title="Delete" />
              </template>
            </bento-button>
          </template>
        </bento-data-grid>
      </template>
    </bento-data-grid-template>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import {
  BentoButton, BentoDataGrid, BentoDataGridTemplate,
  BentoTag, BentoFilterItemType, BentoColumnOverflow,
} from '@adyen/bento-vue2';
import type { BentoColumn, BentoFilterBarModel, BentoFilterValues } from '@adyen/bento-vue2';
import AddIcon from '@adyen/ui-assets-icons-16/vue/plus';
import UploadIcon from '@adyen/ui-assets-icons-16/vue/upload';
import DeleteIcon from '@adyen/ui-assets-icons-16/vue/bin';

const headerConfig = { title: 'Risk lists' };
const tabsConfig = { tabs: [{ title: 'Blocked items (24)' }, { title: 'Trusted items (8)' }] };

const pagination = ref({ page: 1, size: 20, totalCount: 24, pageSizes: [10, 20, 50, 100] });
const searchTerm = ref('');
const filterValues = ref<BentoFilterValues>([]);

const filtersConfig: BentoFilterBarModel = [
  { field: 'type', label: 'Entry type', value: null, type: BentoFilterItemType.SELECT, options: { listboxItems: [{ value: 'Card number', label: 'Card number' }, { value: 'Email', label: 'Email' }, { value: 'IP address', label: 'IP address' }, { value: 'Shopper reference', label: 'Shopper reference' }] } },
  { field: 'scope', label: 'Scope', value: null, type: BentoFilterItemType.SELECT, options: { listboxItems: [{ value: 'Company', label: 'Company' }, { value: 'Merchant', label: 'Merchant' }] } },
];

const columns = ref<BentoColumn[]>([
  { field: 'value', label: 'Value', minWidth: 260, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'type', label: 'Type', width: 160 },
  { field: 'scope', label: 'Scope', width: 120 },
  { field: 'merchantAccount', label: 'Merchant account', width: 200 },
  { field: 'addedBy', label: 'Added by', width: 180 },
  { field: 'addedDate', label: 'Added date', width: 160 },
  { field: 'actions', label: '', width: 60 },
]);

const blockedItems = [
  { value: '4111XXXXXXXX1111', type: 'Card number', listType: 'blocked', scope: 'Company', merchantAccount: '-', addedBy: 'Alice van den Berg', addedDate: 'Apr 8, 2026' },
  { value: '5500XXXXXXXX0001', type: 'Card number', listType: 'blocked', scope: 'Company', merchantAccount: '-', addedBy: 'Alice van den Berg', addedDate: 'Apr 5, 2026' },
  { value: 'fraud@example.com', type: 'Email', listType: 'blocked', scope: 'Company', merchantAccount: '-', addedBy: 'Bob Jansen', addedDate: 'Mar 28, 2026' },
  { value: 'scammer@mail.com', type: 'Email', listType: 'blocked', scope: 'Merchant', merchantAccount: 'AdyenTechSupport_TEST', addedBy: 'Claire Dubois', addedDate: 'Mar 25, 2026' },
  { value: '192.168.1.100', type: 'IP address', listType: 'blocked', scope: 'Company', merchantAccount: '-', addedBy: 'System', addedDate: 'Mar 20, 2026' },
  { value: '10.0.0.55', type: 'IP address', listType: 'blocked', scope: 'Company', merchantAccount: '-', addedBy: 'System', addedDate: 'Mar 15, 2026' },
  { value: 'SHOPPER_REF_12345', type: 'Shopper reference', listType: 'blocked', scope: 'Merchant', merchantAccount: 'AdyenTechSupport_LIVE_NL', addedBy: 'David Schmidt', addedDate: 'Mar 10, 2026' },
  { value: 'bad_actor@test.org', type: 'Email', listType: 'blocked', scope: 'Company', merchantAccount: '-', addedBy: 'Alice van den Berg', addedDate: 'Feb 28, 2026' },
];

const trustedItems = [
  { value: 'vip@company.com', type: 'Email', listType: 'trusted', scope: 'Company', merchantAccount: '-', addedBy: 'Alice van den Berg', addedDate: 'Apr 1, 2026' },
  { value: 'LOYAL_SHOPPER_001', type: 'Shopper reference', listType: 'trusted', scope: 'Merchant', merchantAccount: 'AdyenTechSupport_TEST', addedBy: 'Bob Jansen', addedDate: 'Mar 20, 2026' },
  { value: '4000XXXXXXXX0002', type: 'Card number', listType: 'trusted', scope: 'Company', merchantAccount: '-', addedBy: 'Claire Dubois', addedDate: 'Mar 15, 2026' },
  { value: 'partner@trusted.com', type: 'Email', listType: 'trusted', scope: 'Company', merchantAccount: '-', addedBy: 'Alice van den Berg', addedDate: 'Feb 10, 2026' },
];

function applyFilters(items: any[]): any[] {
  return items.filter(item => {
    const matchesFilters = filterValues.value.length > 0
      ? filterValues.value.every((filter: any) => {
          if (!filter.value) return true;
          const fieldVal = String(item[filter.field] ?? '').toLowerCase();
          return fieldVal.includes(String(filter.value).toLowerCase());
        })
      : true;
    const matchesSearch = searchTerm.value
      ? Object.values(item).some(v => String(v).toLowerCase().includes(searchTerm.value.toLowerCase()))
      : true;
    return matchesFilters && matchesSearch;
  });
}

const filteredBlocked = computed(() => applyFilters(blockedItems));
const filteredTrusted = computed(() => applyFilters(trustedItems));

function getTabSlotName(index: number): string { return `tab-${index + 1}`; }
function getTabData(index: number): any[] {
  return index === 0 ? filteredBlocked.value : filteredTrusted.value;
}
</script>
