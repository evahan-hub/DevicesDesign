<template>
  <div class="page page--locked">
    <bento-data-grid-template 
      class="content-section--flex" 
      :header="headerConfig" 
      :tabs="tabsConfig" 
      sticky-tabs
    >
      <template v-for="(tab, index) in tabsConfig.tabs" v-slot:[getTabSlotName(index)]>
        <bento-data-grid
          :key="index"
          class="disputes-grid"
          :columns="columns"
          :data="getTabData(index)"
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
            <bento-button variant="secondary" size="small" :condensed="true" class="no-wrap-btn">
              Assign
            </bento-button>
          </template>

          <template #item-pspReference="{ item }">
            <bento-link is-not-routing to="#" :title="item.pspReference">
              {{ item.pspReference }}
            </bento-link>
          </template>
        </bento-data-grid>
      </template>
    </bento-data-grid-template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  BentoButton,
  BentoDataGrid,
  BentoDataGridTemplate,
  BentoLink,
  BentoColumnOverflow,
  BentoFilterItemType
} from '@adyen/bento-vue2';
import type { 
  BentoColumn, 
  BentoDatagridSelection,
  BentoFilterBarModel,
  BentoFilterValues
} from '@adyen/bento-vue2';

export default Vue.extend({
  name: 'DisputesPage',
  components: {
    BentoButton,
    BentoDataGrid,
    BentoDataGridTemplate,
    BentoLink
  },
  data() {
    return {
      headerConfig: {
        title: 'Disputes'
      },
      
      tabsConfig: {
        tabs: [
          { title: 'Chargebacks' },
          { title: 'Requests for information' },
          { title: 'Notification of fraud' }
        ]
      },

      selection: [] as BentoDatagridSelection,
      
      pagination: {
        page: 1,
        size: 20,
        totalCount: 16,
        pageSizes: [10, 20, 50, 100]
      },

      searchTerm: '',
      filterValues: [] as BentoFilterValues,
      filtersConfig: [
        {
          field: 'reason',
          label: 'Dispute Reason',
          value: null,
          type: BentoFilterItemType.INPUT,
        },
        {
          field: 'lastEvent',
          label: 'Last Event',
          value: undefined,
          options: {
            listboxItems: [
              { value: 'Chargeback', name: 'Chargeback' },
              { value: 'DisputeOpenedWithChargeback', name: 'DisputeOpenedWithChargeback' },
              { value: 'DisputeExpired', name: 'DisputeExpired' }
            ],
            variant: 'name'
          },
          type: BentoFilterItemType.SELECT,
        }
      ] as BentoFilterBarModel,

      columns: [
        { field: 'assignee', label: 'Assignee', width: 120 },
        { field: 'pspReference', label: 'Dispute PSP reference', minWidth: 200, overflow: BentoColumnOverflow.ELLIPSIS },
        { field: 'reason', label: 'Dispute reason', minWidth: 260, overflow: BentoColumnOverflow.ELLIPSIS },
        { field: 'lastEvent', label: 'Last event', minWidth: 260, overflow: BentoColumnOverflow.ELLIPSIS },
        { field: 'date', label: 'Dispute date', minWidth: 180, overflow: BentoColumnOverflow.ELLIPSIS }
      ] as BentoColumn[],
      
      disputes: [
        { id: '1', assignee: null, pspReference: 'KDN8FPRT3BGT9Y7C', reason: 'R01 Insufficient Funds', lastEvent: 'Chargeback', date: 'Feb 14, 2025, 08:15' },
        { id: '2', assignee: null, pspReference: 'VXZ2LMNQ5JHW6R4P', reason: 'AC01:IncorrectAccountNumber', lastEvent: 'DisputeOpenedWithChargeback', date: 'Mar 22, 2025, 12:30' },
        { id: '3', assignee: null, pspReference: 'S4G7CKB9Z1DFM3V', reason: 'No Instruction', lastEvent: 'Chargeback', date: 'Apr 01, 2025, 09:00' },
        { id: '4', assignee: null, pspReference: 'T8YHJN5R2WEXQ6A9', reason: 'Improper Effective Entry Date', lastEvent: 'Chargeback', date: 'May 30, 2025, 17:45' },
        { id: '5', assignee: null, pspReference: 'P6M3C7V1L9KDF2Z8', reason: 'Account not found', lastEvent: 'DisputeExpired', date: 'Jun 06, 2025, 21:05' },
        { id: '6', assignee: null, pspReference: 'B5N4W7S8G9R2T1Q', reason: 'Not Sufficient Funds (Debit Only)', lastEvent: 'Chargeback', date: 'Jul 04, 2025, 10:10' },
        { id: '7', assignee: null, pspReference: 'F3H2J6K1L5P9M7N8', reason: 'MS03:NotSpecifiedReasonAgentGenerated', lastEvent: 'DisputeOpenedWithChargeback', date: 'Aug 19, 2025, 14:22' },
        { id: '8', assignee: null, pspReference: 'ZXC7VBNM4LKJHG2F', reason: 'R01 Insufficient Funds', lastEvent: 'Chargeback', date: 'Sep 05, 2025, 11:11' },
        { id: '9', assignee: null, pspReference: 'QWERT9YUI1OPASDF', reason: 'No Instruction', lastEvent: 'Chargeback', date: 'Oct 31, 2025, 23:59' },
        { id: '10', assignee: null, pspReference: 'G5HJK3L4M2NBVCX', reason: 'Account not found', lastEvent: 'DisputeExpired', date: 'Nov 27, 2025, 06:45' },
        { id: '11', assignee: null, pspReference: 'R4T6Y8U1I3O5P7A9', reason: 'AC01:IncorrectAccountNumber', lastEvent: 'Chargeback', date: 'Dec 25, 2025, 07:00' },
        { id: '12', assignee: null, pspReference: 'S2D4F6G8H1J3K5L7', reason: 'Not Sufficient Funds (Debit Only)', lastEvent: 'DisputeOpenedWithChargeback', date: 'Jan 15, 2025, 18:00' },
        { id: '13', assignee: null, pspReference: 'X1C3V5B7N9M2L4K6', reason: 'MS03:NotSpecifiedReasonAgentGenerated', lastEvent: 'Chargeback', date: 'Jul 20, 2025, 03:45' },
        { id: '14', assignee: null, pspReference: 'A8S7D6F5G4H3J2K1', reason: 'Improper Effective Entry Date', lastEvent: 'DisputeExpired', date: 'Sep 22, 2025, 16:55' },
        { id: '15', assignee: null, pspReference: 'POIU9YTRE6WQAS2D', reason: 'R01 Insufficient Funds', lastEvent: 'DisputeOpenedWithChargeback', date: 'Nov 11, 2025, 13:13' },
        { id: '16', assignee: null, pspReference: 'MNB4VCX5ZLKJHG3F', reason: 'No Instruction', lastEvent: 'Chargeback', date: 'Dec 31, 2025, 23:00' }
      ]
    };
  },
  computed: {
    filteredAndSortedData(): any[] {
      return this.disputes.filter(item => {
        const foundFilteredItem = this.filterValues.length > 0
          ? this.filterValues.every((filter: any) => {
              if (!filter.value) return true;
              return String(item[filter.field as keyof typeof item])
                .toLowerCase()
                .includes(String(filter.value).toLowerCase());
            })
          : true;
          
        const foundSearchFilteredItem = this.searchTerm
          ? String(item.pspReference).toLowerCase().includes(this.searchTerm.toLowerCase())
          : true;

        return foundFilteredItem && foundSearchFilteredItem;
      });
    }
  },
  methods: {
    // FIX: Method to safely generate dynamic slot names for Vue 2 compiler
    getTabSlotName(index: number) {
      return `tab-${index + 1}`;
    },

    getTabData(index: number) {
      const data = this.filteredAndSortedData;
      
      if (index === 0) return data.filter((d: any) => d.lastEvent === 'Chargeback');
      if (index === 1) return data.filter((d: any) => d.lastEvent === 'DisputeOpenedWithChargeback');
      if (index === 2) return data.filter((d: any) => d.lastEvent === 'DisputeExpired');
      
      return data;
    }
  }
});
</script>

<style scoped>
.disputes-grid {
  flex: 1;
  min-height: 0;
}

.no-wrap-btn {
  white-space: nowrap;
}
</style>