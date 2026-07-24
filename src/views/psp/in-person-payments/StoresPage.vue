<template>
  <div class="st">
    <bento-header
      title="Stores"
      description="Last updated: just now"
      :actions="headerActions"
    />

    <bento-inspector
      title="Store details"
      size="small"
      :is-open="!!selectedStore"
      :active-page="inspectorActivePage"
      @update:is-open="onInspectorClose"
      @update:active-page="inspectorActivePage = $event"
    >
      <template #page>
        <bento-data-grid
          :columns="columns"
          :data="rows"
          :filters="filtersConfig"
          :filter-values="filterValues"
          :filter-search-config="searchConfig"
          :filter-search-term="searchTerm"
          :pagination="pagination"
          selectable
          fit-content
          :selection="selection"
          @update:selection="selection = $event"
          @update:pagination="pagination = $event"
          @update:filter-values="filterValues = $event"
          @update:filter-search-term="searchTerm = $event"
          @click:row="onStoreSelect"
        >
          <template #item-name="{ item }">
            <bento-link is-not-routing to="#" @click.prevent="onStoreSelect(item)">
              {{ item.name }}
            </bento-link>
          </template>

          <template #item-status="{ item }">
            <bento-tag :color="statusColor(item.status)">{{ item.status }}</bento-tag>
          </template>

          <template #item-merchantAccount="{ item }">
            <bento-link is-not-routing to="#">{{ item.merchantAccount }}</bento-link>
          </template>

          <template #item-terminalCount="{ item }">
            <span v-if="item.terminalCount > 0">{{ item.terminalCount }}</span>
            <span v-else class="st__placeholder-dash">-</span>
          </template>

          <template #item-actions="{ item }">
            <bento-button variant="tertiary" @click.stop="() => {}">
              <template #iconLeft>
                <options-vertical-icon :svg-title="'Actions for ' + item.name" />
              </template>
            </bento-button>
          </template>
        </bento-data-grid>
      </template>

      <template #content>
        <div v-if="selectedStore" class="st__detail">
          <!-- Detail header -->
          <div class="st__detail-header">
            <span class="st__detail-name">{{ selectedStore.name }}</span>
            <bento-button variant="tertiary" @click="selectedStore = null">
              <template #iconLeft>
                <cross-icon svg-title="Close" />
              </template>
            </bento-button>
          </div>

          <!-- Store hero -->
          <div class="st__detail-hero">
            <div class="st__store-thumb">
              <shopping-cart-icon svg-title="Store" />
            </div>
            <div class="st__store-meta">
              <p class="st__store-name">{{ selectedStore.name }}</p>
              <bento-tag :color="statusColor(selectedStore.status)">{{ selectedStore.status }}</bento-tag>
            </div>
          </div>

          <div class="st__detail-body">
            <!-- Store details section -->
            <div class="st__section">
              <p class="st__section-title">Store details</p>
              <bento-structured-list layout="42-58">
                <bento-structured-list-item label="Store ID" :copy="selectedStore.storeId">
                  {{ selectedStore.storeId }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Address">
                  <span v-if="selectedStore.address">{{ selectedStore.address }}</span>
                  <span v-else class="st__placeholder-dash">-</span>
                </bento-structured-list-item>
                <bento-structured-list-item label="City">
                  <span v-if="selectedStore.city">{{ selectedStore.city }}</span>
                  <span v-else class="st__placeholder-dash">-</span>
                </bento-structured-list-item>
                <bento-structured-list-item label="Postal code">
                  <span v-if="selectedStore.postalCode">{{ selectedStore.postalCode }}</span>
                  <span v-else class="st__placeholder-dash">-</span>
                </bento-structured-list-item>
                <bento-structured-list-item label="Country/Region">
                  {{ selectedStore.country }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Phone">
                  <span v-if="selectedStore.phone">{{ selectedStore.phone }}</span>
                  <span v-else class="st__placeholder-dash">-</span>
                </bento-structured-list-item>
                <bento-structured-list-item label="Email">
                  <span v-if="selectedStore.email">{{ selectedStore.email }}</span>
                  <span v-else class="st__placeholder-dash">-</span>
                </bento-structured-list-item>
              </bento-structured-list>
            </div>

            <!-- Account section -->
            <div class="st__section">
              <p class="st__section-title">Account</p>
              <bento-structured-list layout="42-58">
                <bento-structured-list-item label="Merchant account">
                  <bento-link is-not-routing to="#">{{ selectedStore.merchantAccount }}</bento-link>
                </bento-structured-list-item>
              </bento-structured-list>
            </div>

            <!-- Devices section -->
            <div class="st__section">
              <p class="st__section-title">Devices</p>
              <bento-structured-list layout="42-58">
                <bento-structured-list-item label="Terminals">
                  <bento-link v-if="selectedStore.terminalCount > 0" is-not-routing to="#">
                    {{ selectedStore.terminalCount }} terminals
                  </bento-link>
                  <span v-else class="st__placeholder-dash">-</span>
                </bento-structured-list-item>
                <bento-structured-list-item label="Mobile devices">
                  <bento-link v-if="selectedStore.deviceCount > 0" is-not-routing to="#">
                    {{ selectedStore.deviceCount }} devices
                  </bento-link>
                  <span v-else class="st__placeholder-dash">-</span>
                </bento-structured-list-item>
              </bento-structured-list>
            </div>
          </div>
        </div>
      </template>
    </bento-inspector>

    <bento-action-bar
      v-if="selection.length > 0"
      :actions="bulkActions"
      :item-counter="selection.length"
      @close="selection = []"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  BentoHeader, BentoDataGrid, BentoLink, BentoTag, BentoButton,
  BentoInspector, BentoStructuredList, BentoStructuredListItem,
  BentoActionBar, BentoFilterItemType, BentoColumnOverflow,
} from '@adyen/bento-vue2';
import type { BentoColumn, BentoFilterBarModel, BentoFilterValues, BentoDatagridSelection } from '@adyen/bento-vue2';
import CrossIcon from '@adyen/ui-assets-icons-16/vue/cross';
import AddIcon from '@adyen/ui-assets-icons-16/vue/plus';
import DownloadIcon from '@adyen/ui-assets-icons-16/vue/download';
import OptionsVerticalIcon from '@adyen/ui-assets-icons-16/vue/options-vertical';
import ShoppingCartIcon from '@adyen/ui-assets-icons-16/vue/shopping-cart';
import DeleteIcon from '@adyen/ui-assets-icons-16/vue/bin';

interface Store {
  id: string;
  storeId: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  status: 'Active' | 'Inactive';
  merchantAccount: string;
  terminalCount: number;
  deviceCount: number;
  phone: string;
  email: string;
  [key: string]: unknown;
}

const MOCK_STORES: Store[] = [
  { id: '1',  storeId: 'ST224Z223225T5JSJMXN',   name: 'Camp Cantina',              address: '456 Oak Avenue',         city: 'Rivertown',   postalCode: '78701',    country: 'United States',  status: 'Active',   merchantAccount: 'NikePOS_US',       terminalCount: 4, deviceCount: 3, phone: '+1 512 555 0101', email: 'cantina@example.com' },
  { id: '2',  storeId: 'ST98765ABCD12345WXYZ',   name: 'Riverside Café',             address: '12 Main Street',         city: 'Austin',      postalCode: '78702',    country: 'United States',  status: 'Active',   merchantAccount: 'NikePOS_US',       terminalCount: 2, deviceCount: 4, phone: '+1 512 555 0202', email: 'riverside@example.com' },
  { id: '3',  storeId: 'STUS12398765443ABCDE',   name: 'Union Square',               address: '101 Union Square',       city: 'New York',    postalCode: '10003',    country: 'United States',  status: 'Active',   merchantAccount: 'NikePOS_US',       terminalCount: 6, deviceCount: 2, phone: '+1 212 555 0303', email: 'unionsq@example.com' },
  { id: '4',  storeId: 'STAU001SYDNEY20230901',  name: 'UC SG',                      address: 'The Street, 1234',       city: 'Sydney',      postalCode: '2000',     country: 'Australia',      status: 'Active',   merchantAccount: 'NikePOS_AU',       terminalCount: 2, deviceCount: 0, phone: '',                email: '' },
  { id: '5',  storeId: 'STGB002LONDON20230401',  name: 'TestyMcTestface',            address: 'McTestface Street, 10',  city: 'London',      postalCode: 'EC1A 1BB', country: 'United Kingdom', status: 'Active',   merchantAccount: 'AdyenTechSupport', terminalCount: 1, deviceCount: 0, phone: '+44 20 7946 0958', email: 'testy@example.com' },
  { id: '6',  storeId: 'STFR003PARIS20240601',   name: 'Joffrey store 2',            address: 'Paris center',           city: 'Paris',       postalCode: '75001',    country: 'France',         status: 'Active',   merchantAccount: 'AdyenTechSupport', terminalCount: 1, deviceCount: 0, phone: '+33 1 42 00 00 00', email: '' },
  { id: '7',  storeId: 'STJP004GINZA20230801',   name: 'Store03005',                 address: 'Ginza Grasse 3-2-15',    city: 'Tokyo',       postalCode: '104-0061', country: 'Japan',           status: 'Active',   merchantAccount: 'NikePOS_JP',       terminalCount: 1, deviceCount: 0, phone: '+81 3 0000 0000', email: '' },
  { id: '8',  storeId: 'STUS005FAKEST12345ABC',  name: 'FakeStore',                  address: 'Fake St, 12345',         city: 'Somecity',    postalCode: '12345',    country: 'United States',  status: 'Active',   merchantAccount: 'AdyenTechSupport', terminalCount: 1, deviceCount: 0, phone: '',                email: '' },
  { id: '9',  storeId: 'STUS006CREEKSIDE1740XY', name: '1234',                       address: '1740 Creekside Oaks Dr', city: 'Sacramento',  postalCode: '95833',    country: 'United States',  status: 'Active',   merchantAccount: 'NikePOS_US',       terminalCount: 1, deviceCount: 0, phone: '',                email: '' },
  { id: '10', storeId: 'STUS007WHITEHORSE768AB', name: '17885',                      address: '768 White Horse Dr',     city: 'Sandy',       postalCode: '84070',    country: 'United States',  status: 'Inactive', merchantAccount: 'NikePOS_US',       terminalCount: 0, deviceCount: 0, phone: '',                email: '' },
  { id: '11', storeId: 'STUS008WESTCHESTER220CD',name: '0056l',                      address: '220 W. Westchester Pl',  city: 'Houston',     postalCode: '77001',    country: 'United States',  status: 'Active',   merchantAccount: 'NikePOS_US',       terminalCount: 1, deviceCount: 0, phone: '',                email: '' },
  { id: '12', storeId: 'STCA001PAULBAL20230501', name: 'AdyenTechSupport_PaulBal',   address: '',                       city: '',            postalCode: '',         country: 'Canada',         status: 'Active',   merchantAccount: 'AdyenTechSupport', terminalCount: 2, deviceCount: 0, phone: '',                email: '' },
  { id: '13', storeId: 'STAU002UNIFIED20240301', name: 'AdyenTechSupport_Unified',   address: '',                       city: '',            postalCode: '',         country: 'Australia',      status: 'Active',   merchantAccount: 'AdyenTechSupport', terminalCount: 1, deviceCount: 0, phone: '',                email: '' },
  { id: '14', storeId: 'STUS009REUBEN20220601',  name: 'ReubenStorePOS',             address: '',                       city: '',            postalCode: '',         country: 'United States',  status: 'Inactive', merchantAccount: 'AdyenTechSupport', terminalCount: 0, deviceCount: 0, phone: '',                email: '' },
  { id: '15', storeId: 'STHK001YAVUZ20230401',   name: 'YavuzYurdusevPOS',           address: '',                       city: '',            postalCode: '',         country: 'Hong Kong',      status: 'Active',   merchantAccount: 'NikePOS_HK',       terminalCount: 1, deviceCount: 0, phone: '',                email: '' },
];

const columns: BentoColumn[] = [
  { field: 'name',            label: 'Store name',       minWidth: 180, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'storeId',        label: 'Store ID',         minWidth: 210, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'address',        label: 'Address',          minWidth: 200, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'country',        label: 'Country/Region',   minWidth: 140 },
  { field: 'status',         label: 'Status',           minWidth: 100 },
  { field: 'terminalCount',  label: 'Terminals',        minWidth: 100 },
  { field: 'merchantAccount', label: 'Merchant account', minWidth: 180, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'actions',        label: '',                 minWidth: 56,  sortable: false },
];

const filtersConfig: BentoFilterBarModel = [
  {
    field: 'country',
    label: 'Country/Region',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'au', label: 'Australia' },
      { value: 'ca', label: 'Canada' },
      { value: 'jp', label: 'Japan' },
      { value: 'fr', label: 'France' },
      { value: 'hk', label: 'Hong Kong' },
    ] },
  },
  {
    field: 'status',
    label: 'Status',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }] },
  },
  {
    field: 'merchantAccount',
    label: 'Merchant account',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [
      { value: 'nikePosUs', label: 'NikePOS_US' },
      { value: 'nikePosAu', label: 'NikePOS_AU' },
      { value: 'nikePosJp', label: 'NikePOS_JP' },
      { value: 'nikePosHk', label: 'NikePOS_HK' },
      { value: 'adyenTech', label: 'AdyenTechSupport' },
    ] },
  },
];

const searchConfig = {
  placeholder: 'Search store name or ID',
  inputFieldAriaLabel: 'Search stores',
};

const headerActions = [
  { title: 'Add store',    variant: 'primary'   as const, icon: AddIcon,             event: () => {} },
  { title: 'Export',       variant: 'secondary' as const, icon: DownloadIcon,        event: () => {} },
  { title: 'More actions', variant: 'secondary' as const, icon: OptionsVerticalIcon, iconOnly: true, event: () => {} },
];

const bulkActions = [
  { title: 'Delete', icon: DeleteIcon, event: () => {} },
];

const selectedStore       = ref<Store | null>(null);
const inspectorActivePage = ref('detail');
const selection           = ref<BentoDatagridSelection>([]);
const filterValues        = ref<BentoFilterValues>([]);
const searchTerm          = ref('');
const pagination          = ref({ page: 1, size: 50, totalCount: 87, pageSizes: [10, 25, 50, 100] });
const rows                = ref<Store[]>(MOCK_STORES.map(s => ({ ...s })));

function onStoreSelect(item: Store): void {
  selectedStore.value = item;
  inspectorActivePage.value = 'detail';
}

function onInspectorClose(): void {
  selectedStore.value = null;
}

function statusColor(status: Store['status']): string {
  return status === 'Active' ? 'green' : 'grey';
}
</script>

<style lang="scss" scoped>
.st {
  padding: var(--b-spacer-070) var(--b-spacer-090);

  ::v-deep .b-header-meta__description {
    margin-bottom: var(--b-spacer-070);
  }

  &__placeholder-dash {
    color: var(--b-color-label-secondary);
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

  &__detail-name {
    font-family: var(--b-text-title-font-family);
    font-size: var(--b-text-title-font-size);
    font-weight: var(--b-text-title-font-weight);
    color: var(--b-color-label-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }

  &__detail-hero {
    display: flex;
    align-items: center;
    gap: var(--b-spacer-070);
    padding: var(--b-spacer-070) var(--b-spacer-090);
    border-bottom: 1px solid var(--b-color-outline-secondary);
    flex-shrink: 0;
  }

  &__store-thumb {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    background-color: var(--b-color-background-secondary);
    border-radius: var(--b-border-radius-m);
    color: var(--b-color-label-secondary);
  }

  &__store-meta {
    display: flex;
    flex-direction: column;
    gap: var(--b-spacer-020);
    min-width: 0;
  }

  &__store-name {
    margin: 0;
    font-family: var(--b-text-title-font-family);
    font-size: var(--b-text-title-font-size);
    font-weight: var(--b-text-title-font-weight);
    color: var(--b-color-label-primary);
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
