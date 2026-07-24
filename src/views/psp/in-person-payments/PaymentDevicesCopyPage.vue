<template>
  <div class="pd">
    <bento-header
      title="Payment devices"
      description="Last updated: just now"
      :actions="headerActions"
    />

    <bento-tabs
      :active-tab-index="activeTabIndex"
      @update:active-tab-index="activeTabIndex = $event"
    >
      <bento-tab title="Terminals" />
      <bento-tab title="Mobile devices" />
    </bento-tabs>

    <!-- ── Terminals: grid ──────────────────────────────────────────────── -->
    <bento-data-grid
      v-if="activeTabIndex === 0"
      :columns="terminalColumns"
      :data="terminalRows"
      :filters="terminalFiltersConfig"
      :filter-values="terminalFilterValues"
      :filter-search-config="terminalSearchConfig"
      :filter-search-term="terminalSearchTerm"
      :pagination="terminalPagination"
      selectable
      fit-content
      :selection="terminalSelection"
      @update:selection="terminalSelection = $event"
      @update:pagination="terminalPagination = $event"
      @update:filter-values="terminalFilterValues = $event"
      @update:filter-search-term="terminalSearchTerm = $event"
    >
      <template #item-lastActivity="{ item }">
        <div class="pd__status-cell">
          <bento-status :variant="terminalActivityVariant(item.lastActivityStatus)" />
          <span v-if="item.lastActivity">{{ item.lastActivity }}</span>
          <span v-else class="pd__placeholder-dash">-</span>
        </div>
      </template>

      <template #item-assignmentStatus="{ item }">
        <bento-tag :color="assignmentStatusColor(item.assignmentStatus)">
          {{ item.assignmentStatus }}
        </bento-tag>
      </template>

      <template #item-store="{ item }">
        <bento-link v-if="item.store" is-not-routing to="#">{{ item.store }}</bento-link>
        <span v-else class="pd__placeholder-dash">-</span>
      </template>

      <template #item-storeAddress="{ item }">
        <span v-if="item.storeAddress">{{ item.storeAddress }}</span>
        <span v-else class="pd__placeholder-dash">-</span>
      </template>

      <template #item-actions="{ item }">
        <bento-button variant="tertiary" @click.stop="() => {}">
          <template #iconLeft>
            <options-vertical-icon :svg-title="'Actions for ' + item.serialNumber" />
          </template>
        </bento-button>
      </template>
    </bento-data-grid>

    <!-- ── Terminals: action bar ───────────────────────────────────────── -->
    <bento-action-bar
      v-if="activeTabIndex === 0 && terminalSelection.length > 0"
      :actions="terminalBulkActions"
      :item-counter="terminalSelection.length"
      @close="terminalSelection = []"
    />

    <!-- ── SoftPOS: grid + inspector ──────────────────────────────────── -->
    <bento-inspector
      v-if="activeTabIndex === 1"
      title="Device details"
      size="small"
      :is-open="!!selectedDevice"
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
          :filters-container-size-layout="{ large: 'multi-line', medium: 'multi-line', small: 'multi-line' }"
          :pagination="pagination"
          selectable
          fit-content
          :selection="selection"
          @update:selection="selection = $event"
          @update:pagination="pagination = $event"
          @update:filter-values="filterValues = $event"
          @update:filter-search-term="searchTerm = $event"
          @click:row="onDeviceSelect"
        >
          <template #item-lastActivity="{ item }">
            <div class="pd__status-cell">
              <template v-if="item.lastActivity !== '-'">
                <bento-status :variant="item.activityStatus" />
              </template>
              {{ item.lastActivity }}
            </div>
          </template>

          <template #item-installationId="{ item }">
            <bento-link is-not-routing to="#" @click.prevent="onDeviceSelect(item)">
              {{ item.installationId }}
            </bento-link>
          </template>

          <template #item-lastTransaction="{ item }">
            {{ item.lastTransaction }}
          </template>

          <template #item-sdkStatus="{ item }">
            <bento-tag :color="sdkTagColor(item.sdkStatus)">{{ item.sdkStatus }}</bento-tag>
          </template>
        </bento-data-grid>

        <!-- Last activity info popover -->
        <span
          @mouseenter="openPopover"
          @mouseleave="closePopover"
        >
          <bento-popover
            v-if="activityInfoTarget"
            :open="activityPopoverOpen"
            :target-element="activityInfoTarget"
            position="bottom-start"
            disable-focus-trap
            role="tooltip"
            fit-content
          >
            <div class="pd__activity-legend">
              <div class="pd__activity-legend-row">
                <bento-status variant="green" />
                <span class="pd__activity-legend-label">Green</span>
                <span>Active less than 1 hour ago.</span>
              </div>
              <div class="pd__activity-legend-row">
                <bento-status variant="orange" />
                <span class="pd__activity-legend-label">Orange</span>
                <span>Active in the last 24 hours.</span>
              </div>
              <div class="pd__activity-legend-row">
                <bento-status variant="red" />
                <span class="pd__activity-legend-label">Red</span>
                <span>Active more than 24 hours ago.</span>
              </div>
            </div>
          </bento-popover>
        </span>
      </template>

      <template #content>
        <div v-if="selectedDevice" class="pd__detail">
          <!-- Detail header -->
          <div class="pd__detail-header">
            <span class="pd__detail-id">{{ selectedDevice.installationId }}</span>
            <bento-button variant="tertiary" @click="selectedDevice = null">
              <template #iconLeft>
                <cross-icon svg-title="Close" />
              </template>
            </bento-button>
          </div>

          <!-- Device hero -->
          <div class="pd__detail-hero">
            <div class="pd__device-thumb">
              <mobile-icon svg-title="Mobile device" />
            </div>
            <div class="pd__device-meta">
              <p class="pd__device-name">{{ selectedDevice.deviceModel }}</p>
              <bento-status variant="green">{{ selectedDevice.lastActivity }}</bento-status>
            </div>
          </div>

          <div class="pd__detail-body">
            <!-- Device section -->
            <div class="pd__section">
              <p class="pd__section-title">Device</p>
              <bento-structured-list layout="42-58">
                <bento-structured-list-item label="Installation ID">
                  {{ selectedDevice.installationId }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Model">
                  {{ selectedDevice.deviceModel }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Device name">
                  {{ selectedDevice.deviceName }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Last activity">
                  <div class="pd__status-cell">
                    <bento-status variant="green" />
                    {{ selectedDevice.lastActivity }}
                  </div>
                </bento-structured-list-item>
                <bento-structured-list-item label="Last transaction">
                  <div class="pd__status-cell">
                    <bento-status variant="green" />
                    {{ selectedDevice.lastTransaction }}
                  </div>
                </bento-structured-list-item>
                <bento-structured-list-item label="OS version">
                  {{ selectedDevice.osVersion }}
                </bento-structured-list-item>
              </bento-structured-list>
            </div>

            <!-- Store section -->
            <div class="pd__section">
              <p class="pd__section-title">Store</p>
              <bento-structured-list layout="42-58">
                <bento-structured-list-item label="Name">
                  <bento-link is-not-routing to="#">{{ selectedDevice.store.name }}</bento-link>
                </bento-structured-list-item>
                <bento-structured-list-item label="Address">
                  {{ selectedDevice.store.address }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Country/Region">
                  {{ selectedDevice.store.country }}
                </bento-structured-list-item>
                <bento-structured-list-item
                  label="Store ID"
                  :copy="selectedDevice.store.storeId"
                >
                  {{ selectedDevice.store.storeId }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Merchant account">
                  <bento-link is-not-routing to="#">{{ selectedDevice.store.merchantAccount }}</bento-link>
                </bento-structured-list-item>
              </bento-structured-list>
            </div>

            <!-- Integration section -->
            <div class="pd__section">
              <p class="pd__section-title">Integration</p>
              <bento-structured-list layout="42-58">
                <bento-structured-list-item label="Type">
                  {{ selectedDevice.integration.type }}
                </bento-structured-list-item>
                <bento-structured-list-item label="SDK version">
                  {{ selectedDevice.integration.sdkVersion }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Expiry date">
                  {{ selectedDevice.integration.expiryDate }}
                </bento-structured-list-item>
                <bento-structured-list-item label="Status">
                  <bento-tag :color="sdkTagColor(selectedDevice.integration.status)">
                    {{ selectedDevice.integration.status }}
                  </bento-tag>
                </bento-structured-list-item>
              </bento-structured-list>
            </div>
          </div>
        </div>
      </template>
    </bento-inspector>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import {
  BentoHeader, BentoTabs, BentoTab,
  BentoDataGrid, BentoLink, BentoStatus, BentoStatusVariant,
  BentoTag, BentoButton, BentoInspector,
  BentoStructuredList, BentoStructuredListItem,
  BentoFilterItemType, BentoColumnOverflow, BentoActionBar,
  BentoPopover,
} from '@adyen/bento-vue2';
import type { BentoColumn, BentoFilterBarModel, BentoFilterValues, BentoDatagridSelection } from '@adyen/bento-vue2';
import CrossIcon from '@adyen/ui-assets-icons-16/vue/cross';
import RefundIcon from '@adyen/ui-assets-icons-16/vue/refund';
import AccountSwitchIcon from '@adyen/ui-assets-icons-16/vue/account-switch';
import DownloadIcon from '@adyen/ui-assets-icons-16/vue/download';
import OptionsVerticalIcon from '@adyen/ui-assets-icons-16/vue/options-vertical';
import MobileIcon from '@adyen/ui-assets-icons-16/vue/mobile';
import ShoppingCartIcon from '@adyen/ui-assets-icons-16/vue/shopping-cart';

interface DeviceStore {
  name: string;
  address: string;
  country: string;
  storeId: string;
  merchantAccount: string;
}

interface DeviceIntegration {
  type: string;
  sdkVersion: string;
  expiryDate: string;
  status: string;
}

interface PaymentDevice {
  id: string;
  deviceModel: string;
  deviceName: string;
  installationId: string;
  lastActivity: string;
  activityStatus: 'green' | 'orange' | 'red';
  lastTransaction: string;
  lastTransactionStatus: 'active' | 'inactive';
  osVersion: string;
  country: string;
  sdkStatus: string;
  store: DeviceStore;
  integration: DeviceIntegration;
  [key: string]: unknown;
}

const STORE_CAMP_CANTINA: DeviceStore = {
  name: 'Camp Cantina',
  address: '456 Oak Avenue Rivertown, TX...',
  country: 'United States',
  storeId: '345345r34t34t34',
  merchantAccount: 'NikePOS_US',
};

const STORE_RIVERSIDE: DeviceStore = {
  name: 'Riverside Café',
  address: '12 Main Street, Austin, TX',
  country: 'United States',
  storeId: '98765abcd12345',
  merchantAccount: 'NikePOS_US',
};

const STORE_UNION_SQUARE: DeviceStore = {
  name: 'Union Square',
  address: '101 Union Sq, New York, NY',
  country: 'United States',
  storeId: 'US-12398765443',
  merchantAccount: 'NikePOS_US',
};

const INTEGRATION_EXPIRED: DeviceIntegration = {
  type: 'SDK',
  sdkVersion: 'iOS 3.2.3',
  expiryDate: '23-12-2025',
  status: 'Expired',
};

const INTEGRATION_EXPIRING: DeviceIntegration = {
  type: 'SDK',
  sdkVersion: 'iOS 3.14.0',
  expiryDate: '08-07-2026',
  status: 'Expiring',
};

const MOCK_DEVICES: PaymentDevice[] = [
  { id: '1',  deviceModel: 'iPhone 14',      deviceName: 'SFO1 Chicago 2', installationId: 'DDBA0AD9-3938-4FFF-9CD7-A7B1A66ECD25', lastActivity: 'Jun 2, 2026, 13:25',    activityStatus: 'green',  lastTransaction: 'Today, 20:54', lastTransactionStatus: 'active',   osVersion: 'iOS17', country: 'United States', sdkVersion: '3.14.0', sdkStatus: 'Expiring', store: STORE_CAMP_CANTINA,  integration: INTEGRATION_EXPIRED },
  { id: '2',  deviceModel: 'iPhone 14',      deviceName: 'SFO1 Chicago 3', installationId: 'F2AC1BE5-7741-4CDA-8E23-B6C9D0A14F78', lastActivity: 'May 27, 2026, 06:49',   activityStatus: 'red',    lastTransaction: 'Today, 20:54', lastTransactionStatus: 'active',   osVersion: 'iOS17', country: 'United States', sdkVersion: '3.14.0', sdkStatus: 'Expiring', store: STORE_CAMP_CANTINA,  integration: INTEGRATION_EXPIRED },
  { id: '3',  deviceModel: 'iPhone 14',      deviceName: 'SFO1 Chicago 4', installationId: 'A3D72F0C-BB2E-4981-A1C4-E587293F6D12', lastActivity: 'Apr 4, 2026, 16:06',    activityStatus: 'red',    lastTransaction: 'Today, 20:54', lastTransactionStatus: 'active',   osVersion: 'iOS17', country: 'United States', sdkVersion: '3.14.0', sdkStatus: 'Expiring', store: STORE_RIVERSIDE,     integration: INTEGRATION_EXPIRED },
  { id: '4',  deviceModel: 'iPhone 14',      deviceName: 'SFO1 Chicago 5', installationId: 'C9E45BD7-2163-4FAB-B3D9-17A08E2C5690', lastActivity: 'Nov 25, 2025, 19:19',   activityStatus: 'red',    lastTransaction: 'Today, 20:54', lastTransactionStatus: 'active',   osVersion: 'iOS17', country: 'United States', sdkVersion: '3.14.0', sdkStatus: 'Expiring', store: STORE_RIVERSIDE,     integration: INTEGRATION_EXPIRED },
  { id: '5',  deviceModel: 'iPhone 14',      deviceName: 'SFO1 Chicago 6', installationId: '8B16F3A2-54EC-4907-D2E1-39B7A0FC8451', lastActivity: '-',                      activityStatus: 'red',    lastTransaction: 'Today, 20:54', lastTransactionStatus: 'active',   osVersion: 'iOS17', country: 'United States', sdkVersion: '3.15.0', sdkStatus: 'Active',   store: STORE_CAMP_CANTINA,  integration: INTEGRATION_EXPIRED },
  { id: '6',  deviceModel: 'iPhone 16 Pro',  deviceName: 'NYC1 Union 1',   installationId: 'E07A9D84-C3F2-48B1-A56E-2D4C870FA193', lastActivity: 'Mar 17, 2026, 00:12',   activityStatus: 'red',    lastTransaction: 'Today, 20:54', lastTransactionStatus: 'active',   osVersion: 'iOS18', country: 'United States', sdkVersion: '2.14.0', sdkStatus: 'Active',   store: STORE_UNION_SQUARE,  integration: INTEGRATION_EXPIRED },
  { id: '7',  deviceModel: 'iPhone 16 Pro',  deviceName: 'NYC1 Union 2',   installationId: '12D3E456-7890-ABCD-EF01-234567890ABC', lastActivity: 'May 26, 2026, 10:57',   activityStatus: 'orange', lastTransaction: 'Today, 20:54', lastTransactionStatus: 'active',   osVersion: 'iOS18', country: 'United States', sdkVersion: '2.6.1',  sdkStatus: 'Expired',  store: STORE_UNION_SQUARE,  integration: INTEGRATION_EXPIRED },
  { id: '8',  deviceModel: 'iPhone 16 Pro',  deviceName: 'NYC1 Union 3',   installationId: '6F8C1047-3D25-4E9B-B7A0-F1523908DE46', lastActivity: 'Oct 18, 2025, 09:41',   activityStatus: 'red',    lastTransaction: 'Today, 20:54', lastTransactionStatus: 'active',   osVersion: 'iOS18', country: 'United States', sdkVersion: '2.9.0',  sdkStatus: 'Expired',  store: STORE_CAMP_CANTINA,  integration: INTEGRATION_EXPIRED },
  { id: '9',  deviceModel: 'iPhone 15 Pro',  deviceName: 'AMS1 Dam 1',     installationId: 'B45F7EA1-9C80-43D6-A2B3-FEDC12078956', lastActivity: 'Apr 1, 2025, 12:59',    activityStatus: 'red',    lastTransaction: 'Today, 20:54', lastTransactionStatus: 'active',   osVersion: 'iOS17', country: 'Netherlands',   sdkVersion: '2.11.0', sdkStatus: 'Expiring', store: STORE_RIVERSIDE,     integration: INTEGRATION_EXPIRING },
  { id: '10', deviceModel: 'iPhone 16 Pro',  deviceName: 'AMS1 Dam 2',     installationId: '3C9D2B6F-0E71-4815-9A4C-8DB76F012345', lastActivity: 'Sep 26, 2023, 07:27',   activityStatus: 'red',    lastTransaction: 'Today, 20:54', lastTransactionStatus: 'active',   osVersion: 'iOS18', country: 'Netherlands',   sdkVersion: '2.5.1',  sdkStatus: 'Expired',  store: STORE_RIVERSIDE,     integration: INTEGRATION_EXPIRING },
];

const columns: BentoColumn[] = [
  { field: 'deviceModel',      label: 'Device model',    minWidth: 150 },
  { field: 'installationId',   label: 'Installation ID', minWidth: 220, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'lastActivity',     label: 'Last activity',   minWidth: 160, infoIconTooltip: ' ' },
  { field: 'lastTransaction',  label: 'Last transaction', minWidth: 160 },
  { field: 'country',          label: 'Country',         minWidth: 130 },
  { field: 'sdkVersion',       label: 'SDK version',     minWidth: 130 },
  { field: 'sdkStatus',        label: 'SDK status',      minWidth: 130 },
];

const filtersConfig: BentoFilterBarModel = [
  {
    field: 'lastActivity',
    label: 'Last activity',
    value: null,
    visible: true,
    type: BentoFilterItemType.DATE_RANGE,
    options: { numberOfMonths: 2 },
  },
  {
    field: 'lastTransaction',
    label: 'Last transaction',
    value: null,
    visible: true,
    type: BentoFilterItemType.DATE_RANGE,
    options: { numberOfMonths: 2 },
  },
  {
    field: 'platform',
    label: 'Platform',
    value: null,
    visible: false,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [
      { value: 'ios', label: 'iOS' },
      { value: 'android', label: 'Android' },
    ]},
  },
  {
    field: 'sdkVersion',
    label: 'SDK version',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [
      { value: 'ios-3.2.3',  label: 'iOS 3.2.3' },
      { value: 'ios-3.12.0', label: 'iOS 3.12.0' },
      { value: 'ios-3.13.0', label: 'iOS 3.13.0' },
      { value: 'ios-3.14.0', label: 'iOS 3.14.0' },
      { value: 'and-2.6.1',  label: 'Android 2.6.1' },
      { value: 'and-2.9.0',  label: 'Android 2.9.0' },
      { value: 'and-2.10.0', label: 'Android 2.10.0' },
      { value: 'and-2.11.0', label: 'Android 2.11.0' },
    ]},
  },
  {
    field: 'store',
    label: 'Store',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [
      { value: 'camp-cantina',   label: 'Camp Cantina' },
      { value: 'riverside',      label: 'Riverside Café' },
      { value: 'union-square',   label: 'Union Square' },
      { value: 'downtown',       label: 'Downtown Flagship' },
      { value: 'westside',       label: 'Westside Market' },
      { value: 'harbor',         label: 'Harbor Point' },
    ]},
  },
  {
    field: 'osVersion',
    label: 'OS version',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [
      { value: 'ios-16',  label: 'iOS 16' },
      { value: 'ios-17',  label: 'iOS 17' },
      { value: 'ios-18',  label: 'iOS 18' },
      { value: 'and-12',  label: 'Android 12' },
      { value: 'and-13',  label: 'Android 13' },
      { value: 'and-14',  label: 'Android 14' },
      { value: 'and-15',  label: 'Android 15' },
    ]},
  },
  {
    field: 'brand',
    label: 'Brand',
    value: null,
    visible: false,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'apple', label: 'Apple' }, { value: 'samsung', label: 'Samsung' }, { value: 'google', label: 'Google' }] },
  },
  {
    field: 'country',
    label: 'Country/Region',
    value: null,
    visible: false,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'us', label: 'United States' }, { value: 'nl', label: 'Netherlands' }, { value: 'uk', label: 'United Kingdom' }] },
  },
  {
    field: 'integrationType',
    label: 'Integration type',
    value: null,
    visible: true,
    type: BentoFilterItemType.SELECT,
    options: { multiple: true, listboxItems: [{ value: 'merchant-app', label: 'Merchant app' }, { value: 'adyen-payments-app', label: 'Adyen payments app' }] },
  },
  {
    field: 'model',
    label: 'Model',
    value: null,
    visible: false,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'iphone14', label: 'iPhone 14' }, { value: 'iphone15pro', label: 'iPhone 15 Pro' }, { value: 'iphone16pro', label: 'iPhone 16 Pro' }] },
  },
  {
    field: 'osStatus',
    label: 'OS status',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'up-to-date', label: 'Up to date' }, { value: 'update-available', label: 'Update available' }] },
  },
  {
    field: 'sdkStatus',
    label: 'SDK status',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'expired', label: 'Expired' }, { value: 'expiring', label: 'Expiring' }, { value: 'up-to-date', label: 'Up to date' }] },
  },
];

const searchConfig = {
  placeholder: 'Search installation ID',
  inputFieldAriaLabel: 'Search device',
};

const headerActions = [
  { title: 'Order now',   variant: 'primary'   as const, icon: ShoppingCartIcon,    event: () => {} },
  { title: 'Export',      variant: 'secondary' as const, icon: DownloadIcon,         event: () => {} },
  { title: 'More actions', variant: 'secondary' as const, icon: OptionsVerticalIcon, iconOnly: true, event: () => {} },
];

// ── Terminal (Terminals tab) ────────────────────────────────────────────────

interface Terminal {
  id: string;
  deviceModel: string;
  serialNumber: string;
  lastActivity: string | null;
  lastActivityStatus: 'active' | 'inactive' | 'none';
  assignmentStatus: 'Boarded' | 'Deployed' | 'Reassignment';
  country: string;
  store: string;
  storeAddress: string;
  [key: string]: unknown;
}

const MOCK_TERMINALS: Terminal[] = [
  { id: 't1',  deviceModel: 'AMS1', serialNumber: '000168222950716', lastActivity: 'May 7, 2026, 15:17',   lastActivityStatus: 'inactive', assignmentStatus: 'Reassignment', country: 'Hong Kong',      store: 'YavuzYurdusevPOS',              storeAddress: '' },
  { id: 't2',  deviceModel: 'AMS1', serialNumber: '000168222950831', lastActivity: 'Mar 3, 2026, 01:18',   lastActivityStatus: 'inactive', assignmentStatus: 'Boarded',      country: 'United Kingdom', store: 'TestyMcTestface',               storeAddress: 'McTestface Street, 10...' },
  { id: 't3',  deviceModel: 'AMS1', serialNumber: '000168222950860', lastActivity: null,                   lastActivityStatus: 'none',     assignmentStatus: 'Deployed',     country: 'Canada',         store: 'AdyenTechSupport_PaulBal...',   storeAddress: '' },
  { id: 't4',  deviceModel: 'AMS1', serialNumber: '000168222950896', lastActivity: 'Jul 25, 2024, 06:07',  lastActivityStatus: 'inactive', assignmentStatus: 'Reassignment', country: '',               store: 'JonathanRosario',               storeAddress: '' },
  { id: 't5',  deviceModel: 'AMS1', serialNumber: '000168222950982', lastActivity: 'Nov 25, 2025, 19:19',  lastActivityStatus: 'inactive', assignmentStatus: 'Boarded',      country: 'United States',  store: 'FakeStore',                     storeAddress: 'fake st, 12345, Someci...' },
  { id: 't6',  deviceModel: 'AMS1', serialNumber: '000168223459759', lastActivity: 'Nov 22, 2023, 14:21',  lastActivityStatus: 'inactive', assignmentStatus: 'Boarded',      country: 'Australia',      store: 'ST3224Z223225T5JSJMXN...',      storeAddress: 'ji ji, 0000, sydney' },
  { id: 't7',  deviceModel: 'AMS1', serialNumber: '000168223460161', lastActivity: 'May 27, 2026, 06:49',  lastActivityStatus: 'inactive', assignmentStatus: 'Boarded',      country: 'Japan',          store: 'Store03005',                    storeAddress: 'Ginza Grasse 3-2-15, G...' },
  { id: 't8',  deviceModel: 'AMS1', serialNumber: '000168223604815', lastActivity: 'Apr 4, 2026, 16:06',   lastActivityStatus: 'inactive', assignmentStatus: 'Boarded',      country: 'United States',  store: 'store123',                      storeAddress: 'The Street, 1234, The C...' },
  { id: 't9',  deviceModel: 'AMS1', serialNumber: '000168223604819', lastActivity: 'Apr 1, 2025, 12:59',   lastActivityStatus: 'inactive', assignmentStatus: 'Boarded',      country: 'United States',  store: '0056l',                         storeAddress: '220 W. Westchester Pl...' },
  { id: 't10', deviceModel: 'AMS1', serialNumber: '000168223618064', lastActivity: 'Feb 9, 2024, 23:45',   lastActivityStatus: 'inactive', assignmentStatus: 'Reassignment', country: 'Canada',         store: 'AdyenTechSupport_PaulBal...',   storeAddress: '' },
  { id: 't11', deviceModel: 'AMS1', serialNumber: '000168223618066', lastActivity: 'Mar 17, 2026, 00:12',  lastActivityStatus: 'inactive', assignmentStatus: 'Boarded',      country: 'United States',  store: '1234',                          storeAddress: '1740 Creekside Oaks D...' },
  { id: 't12', deviceModel: 'AMS1', serialNumber: '000168223619578', lastActivity: 'Jun 5, 2023, 18:59',   lastActivityStatus: 'inactive', assignmentStatus: 'Deployed',     country: 'United States',  store: 'ReubenStorePOS',                storeAddress: '' },
  { id: 't13', deviceModel: 'AMS1', serialNumber: '000168223619584', lastActivity: 'Mar 22, 2024, 06:37',  lastActivityStatus: 'inactive', assignmentStatus: 'Reassignment', country: 'United States',  store: '17885',                         storeAddress: '768 White Horse Dr, 84...' },
  { id: 't14', deviceModel: 'AMS1', serialNumber: '000168230430799', lastActivity: 'May 26, 2026, 10:57',  lastActivityStatus: 'inactive', assignmentStatus: 'Boarded',      country: 'Australia',      store: 'AdyenTechSupport_Unified...',   storeAddress: '' },
  { id: 't15', deviceModel: 'AMS1', serialNumber: '000168230430852', lastActivity: 'Oct 18, 2025, 09:41',  lastActivityStatus: 'inactive', assignmentStatus: 'Boarded',      country: 'France',         store: 'Joffrey store 2',               storeAddress: 'Paris center, 75001, Pa...' },
  { id: 't16', deviceModel: 'AMS1', serialNumber: '000168230867848', lastActivity: 'Sep 26, 2023, 07:27',  lastActivityStatus: 'inactive', assignmentStatus: 'Boarded',      country: 'United States',  store: 'AdyenTechSupport_Cosmin...',    storeAddress: '' },
  { id: 't17', deviceModel: 'AMS1', serialNumber: '000168230867853', lastActivity: 'May 29, 2026, 12:31',  lastActivityStatus: 'active',   assignmentStatus: 'Boarded',      country: 'Australia',      store: 'UC SG',                         storeAddress: 'The Street, 1234, The C...' },
];

const terminalColumns: BentoColumn[] = [
  { field: 'deviceModel',       label: 'Device model',       minWidth: 120 },
  { field: 'serialNumber',      label: 'Serial number',      minWidth: 190, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'lastActivity',      label: 'Last activity',      minWidth: 190 },
  { field: 'assignmentStatus',  label: 'Assignment status',  minWidth: 160 },
  { field: 'country',           label: 'Country/Region',     minWidth: 140 },
  { field: 'store',             label: 'Store',              minWidth: 180, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'storeAddress',      label: 'Store address',      minWidth: 200, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'actions',           label: '',                   minWidth: 56,  sortable: false },
];

const terminalFiltersConfig: BentoFilterBarModel = [
  {
    field: 'deviceModel',
    label: 'Device model',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'ams1', label: 'AMS1' }] },
  },
  {
    field: 'assignmentStatus',
    label: 'Assignment status',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'Boarded', label: 'Boarded' }, { value: 'Deployed', label: 'Deployed' }, { value: 'Reassignment', label: 'Reassignment' }] },
  },
  {
    field: 'country',
    label: 'Country/Region',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'us', label: 'United States' }, { value: 'uk', label: 'United Kingdom' }, { value: 'au', label: 'Australia' }, { value: 'ca', label: 'Canada' }, { value: 'jp', label: 'Japan' }, { value: 'fr', label: 'France' }] },
  },
  {
    field: 'store',
    label: 'Store',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [] },
  },
  {
    field: 'versions',
    label: 'Versions',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [] },
  },
  {
    field: 'activity',
    label: 'Activity',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [] },
  },
  {
    field: 'lastTransaction',
    label: 'Last transaction',
    value: null,
    type: BentoFilterItemType.DATE_RANGE,
    options: { numberOfMonths: 2 },
  },
];

const terminalSearchConfig = {
  placeholder: 'Search serial number',
  inputFieldAriaLabel: 'Search by serial number',
};

const terminalBulkActions = [
  { title: 'Return',  icon: RefundIcon,        event: () => {} },
  { title: 'Replace', icon: AccountSwitchIcon, event: () => {} },
];

const terminalFilterValues  = ref<BentoFilterValues>([]);
const terminalSearchTerm    = ref('');
const terminalSelection     = ref<BentoDatagridSelection>([]);
const terminalPagination    = ref({ page: 1, size: 50, totalCount: 571, pageSizes: [10, 25, 50, 100] });
const terminalRows          = ref<Terminal[]>(MOCK_TERMINALS.map(t => ({ ...t })));

function terminalActivityVariant(status: Terminal['lastActivityStatus']): BentoStatusVariant {
  if (status === 'active')   return BentoStatusVariant.GREEN;
  if (status === 'inactive') return BentoStatusVariant.RED;
  return BentoStatusVariant.GREY;
}

function assignmentStatusColor(status: Terminal['assignmentStatus']): string {
  if (status === 'Boarded')      return 'green';
  if (status === 'Deployed')     return 'blue';
  if (status === 'Reassignment') return 'yellow';
  return 'grey';
}

// ── SoftPOS (Mobile devices tab) ────────────────────────────────────────────

const activeTabIndex     = ref(0);
const selectedDevice     = ref<PaymentDevice | null>(null);
const inspectorActivePage = ref('detail');
const selection          = ref<BentoDatagridSelection>([]);
const filterValues       = ref<BentoFilterValues>([]);
const searchTerm         = ref('');
const pagination         = ref({ page: 1, size: 50, totalCount: 12342, pageSizes: [10, 25, 50, 100] });
const rows               = ref<PaymentDevice[]>(MOCK_DEVICES.map(d => ({ ...d })));

function onDeviceSelect(item: PaymentDevice): void {
  selectedDevice.value = item;
  inspectorActivePage.value = 'detail';
}

function onInspectorClose(): void {
  selectedDevice.value = null;
}

function transactionStatusVariant(status: 'active' | 'inactive'): BentoStatusVariant {
  return status === 'active' ? BentoStatusVariant.GREEN : BentoStatusVariant.GREY;
}

function sdkTagColor(status: string): string {
  if (status === 'Expired')  return 'red';
  if (status === 'Expiring') return 'yellow';
  return 'green';
}

// ── Last activity info popover ──────────────────────────────────────────────
const activityInfoTarget = ref<HTMLElement | null>(null);
const activityPopoverOpen = ref(false);
let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

function openPopover() {
  if (hoverTimeout) clearTimeout(hoverTimeout);
  activityPopoverOpen.value = true;
}

function closePopover() {
  hoverTimeout = setTimeout(() => {
    activityPopoverOpen.value = false;
  }, 150);
}

function bindInfoIcon() {
  const infoIcon = document.querySelector('.b-data-grid-columns__column-info-icon .b-info-icon') as HTMLElement | null;
  if (infoIcon) {
    activityInfoTarget.value = infoIcon;
    infoIcon.addEventListener('mouseenter', openPopover);
    infoIcon.addEventListener('mouseleave', closePopover);
    infoIcon.addEventListener('focusin', openPopover);
    infoIcon.addEventListener('focusout', closePopover);
  } else {
    setTimeout(bindInfoIcon, 200);
  }
}

onMounted(() => {
  nextTick(bindInfoIcon);
});

onBeforeUnmount(() => {
  if (activityInfoTarget.value) {
    activityInfoTarget.value.removeEventListener('mouseenter', openPopover);
    activityInfoTarget.value.removeEventListener('mouseleave', closePopover);
    activityInfoTarget.value.removeEventListener('focusin', openPopover);
    activityInfoTarget.value.removeEventListener('focusout', closePopover);
  }
  if (hoverTimeout) clearTimeout(hoverTimeout);
});
</script>

<style lang="scss" scoped>
.pd {
  padding: var(--b-spacer-070) var(--b-spacer-090);

  ::v-deep .b-header-meta__description {
    margin-bottom: var(--b-spacer-070);
  }

  ::v-deep .b-data-grid-columns {
    top: 56px;
  }

  ::v-deep .b-data-grid-columns__label {
    white-space: nowrap;
  }

  ::v-deep .b-data-grid__filters {
    margin-left: 0;
    padding-left: 0;
  }

  &__placeholder {
    color: var(--b-color-label-secondary);
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
  }

  &__placeholder-dash {
    color: var(--b-color-label-secondary);
  }

  &__status-cell {
    display: flex;
    align-items: center;
    gap: var(--b-spacer-030);
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

  &__detail-hero {
    display: flex;
    align-items: center;
    gap: var(--b-spacer-070);
    padding: var(--b-spacer-070) var(--b-spacer-090);
    border-bottom: 1px solid var(--b-color-outline-secondary);
    flex-shrink: 0;
  }

  &__device-thumb {
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

  &__device-meta {
    display: flex;
    flex-direction: column;
    gap: var(--b-spacer-020);
    min-width: 0;
  }

  &__device-name {
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

::v-deep .b-data-grid-columns .b-info-icon ~ .b-tooltip {
  display: none !important;
}
</style>

<style lang="scss">
.pd__activity-legend {
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-050, 8px);
  padding: var(--b-spacer-030, 4px) 0;
}

.pd__activity-legend-row {
  display: flex;
  align-items: center;
  gap: var(--b-spacer-050, 8px);
  font-family: var(--b-text-body-font-family);
  font-size: var(--b-text-body-font-size, 14px);
  color: var(--b-color-label-primary, #001222);
}

.pd__activity-legend-label {
  min-width: 56px;
  font-weight: var(--b-text-body-stronger-font-weight, 600);
}
</style>
