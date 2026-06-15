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
        <bento-tag :variant="assignmentStatusColor(item.assignmentStatus)">
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

    <!-- ── Terminals: assignment status popover ────────────────────────── -->
    <span
      @mouseenter="openAssignmentPopover"
      @mouseleave="closeAssignmentPopover"
    >
      <bento-popover
        v-if="assignmentInfoTarget"
        :open="assignmentPopoverOpen"
        :target-element="assignmentInfoTarget"
        position="bottom-start"
        disable-focus-trap
        role="tooltip"
        fit-content
      >
        <div class="pd__assignment-legend">
          <div class="pd__assignment-legend-item">
            <bento-tag variant="grey">In inventory</bento-tag>
            <p class="pd__assignment-legend-desc">Device cannot process payments.<br>The device is not assigned to a store or merchant account and not boarded.</p>
          </div>
          <div class="pd__assignment-legend-item">
            <bento-tag variant="grey">Deployed</bento-tag>
            <p class="pd__assignment-legend-desc">Device cannot process payments.<br>The device is assigned to a store or merchant without payment methods.</p>
          </div>
          <div class="pd__assignment-legend-item">
            <bento-tag variant="orange">Assigning</bento-tag>
            <p class="pd__assignment-legend-desc">Device cannot process payments.<br>The device is waiting for to be assigned to a store or merchant account.</p>
          </div>
          <div class="pd__assignment-legend-item">
            <bento-tag variant="red">Pending assignment</bento-tag>
            <p class="pd__assignment-legend-desc">Device cannot process payments.<br>The device might assigned. But it is offline and to be turned on.</p>
          </div>
          <div class="pd__assignment-legend-item">
            <bento-tag variant="green">Boarded</bento-tag>
            <p class="pd__assignment-legend-desc">Device can process payments.</p>
          </div>
        </div>
      </bento-popover>
    </span>

    <!-- ── Terminals: action bar ───────────────────────────────────────── -->
    <bento-action-bar
      v-if="activeTabIndex === 0 && terminalSelection.length > 0"
      :actions="terminalBulkActions"
      :item-counter="terminalSelection.length"
      @close="terminalSelection = []"
      @close-action-bar="terminalSelection = []"
    />

    <!-- ── Assign confirmation modal ─────────────────────────────────────── -->
    <bento-modal
      :is-open="isAssignModalOpen"
      :actions="assignModalActions"
      variant="dialog"
      @close-modal="isAssignModalOpen = false"
    >
      Confirm changes?
      <template #content>
        <div class="pd__confirm">
          <p class="pd__confirm-intro">These changes will apply to:</p>
          <div class="pd__confirm-row">
            <accounts-icon svg-title="Company account" />
            <div class="pd__confirm-detail">
              <p class="pd__confirm-label">PaymentsMadeEasy</p>
              <p class="pd__confirm-value">Company account</p>
            </div>
          </div>
          <div class="pd__confirm-row">
            <terminal-1-icon svg-title="Terminals" />
            <div class="pd__confirm-detail">
              <p class="pd__confirm-label">Up to {{ terminalRows.length }} terminals</p>
              <p class="pd__confirm-value">These are the active terminals assigned to this account. Estimated monthly charge based on the current fleet is €[X]</p>
            </div>
          </div>
        </div>
      </template>
    </bento-modal>

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
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import {
  BentoHeader, BentoTabs, BentoTab,
  BentoDataGrid, BentoLink, BentoStatus, BentoStatusVariant,
  BentoTag, BentoButton, BentoInspector,
  BentoStructuredList, BentoStructuredListItem,
  BentoFilterItemType, BentoColumnOverflow, BentoActionBar,
  BentoPopover, BentoModal,
} from '@adyen/bento-vue2';
import type { BentoColumn, BentoFilterBarModel, BentoFilterValues, BentoDatagridSelection } from '@adyen/bento-vue2';
import CrossIcon from '@adyen/ui-assets-icons-16/vue/cross';
import RefundIcon from '@adyen/ui-assets-icons-16/vue/refund';
import AccountSwitchIcon from '@adyen/ui-assets-icons-16/vue/account-switch';
import DownloadIcon from '@adyen/ui-assets-icons-16/vue/download';
import OptionsVerticalIcon from '@adyen/ui-assets-icons-16/vue/options-vertical';
import MobileIcon from '@adyen/ui-assets-icons-16/vue/mobile';
import ShoppingCartIcon from '@adyen/ui-assets-icons-16/vue/shopping-cart';
import ClickIcon from '@adyen/ui-assets-icons-16/vue/click';
import ClockIcon from '@adyen/ui-assets-icons-16/vue/clock';
import AccountsIcon from '@adyen/ui-assets-icons-16/vue/accounts';
import Terminal1Icon from '@adyen/ui-assets-icons-16/vue/terminal-1';


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
  { title: 'Order new',   variant: 'primary'   as const, icon: ShoppingCartIcon,    event: () => {} },
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
  assignmentStatus: 'Boarded' | 'Deployed' | 'Inventory' | 'Assigning' | 'Reassignment' | 'Pending';
  country: string;
  store: string;
  storeAddress: string;
  [key: string]: unknown;
}

const MOCK_TERMINALS: Terminal[] = [
  { id: 't1',  deviceModel: 'AMS1', serialNumber: '000168220820437', lastActivity: 'Oct 15, 2025, 10:55',  lastActivityStatus: 'active',   assignmentStatus: 'Boarded',       country: 'Netherlands',    store: 'Store_1234',                    storeAddress: 'Kerkstraat 12, Amsterd...' },
  { id: 't2',  deviceModel: 'AMS1', serialNumber: '000168220820440', lastActivity: 'Oct 15, 2025, 10:41',  lastActivityStatus: 'active',   assignmentStatus: 'Reassignment',  country: 'Netherlands',    store: 'Store_5678',                    storeAddress: 'Prinsengracht 45, Ams...' },
  { id: 't3',  deviceModel: 'AMS1', serialNumber: '000168220820505', lastActivity: 'Mar 11, 2025, 11:15',  lastActivityStatus: 'inactive', assignmentStatus: 'Deployed',      country: 'United States',  store: 'Store_9012',                    storeAddress: '2975 Main St, Dallas, T...' },
  { id: 't4',  deviceModel: 'AMS1', serialNumber: '000168220820506', lastActivity: 'Apr 20, 2025, 09:00',  lastActivityStatus: 'inactive', assignmentStatus: 'Inventory',     country: '',               store: '',                              storeAddress: '' },
  { id: 't5',  deviceModel: 'AMS1', serialNumber: '000168220820544', lastActivity: 'May 05, 2025, 17:50',  lastActivityStatus: 'inactive', assignmentStatus: 'Boarded',       country: 'United Kingdom', store: 'Store_7890',                    storeAddress: '23 Baker St, London, W...' },
  { id: 't6',  deviceModel: 'S1F2', serialNumber: '000158000000001', lastActivity: 'Jun 18, 2025, 13:20',  lastActivityStatus: 'active',   assignmentStatus: 'Assigning',     country: 'Netherlands',    store: 'Store_2345',                    storeAddress: 'Damrak 1, Amsterdam,...' },
  { id: 't7',  deviceModel: 'S1F2', serialNumber: '000158123456789', lastActivity: 'Oct 14, 2025, 22:45',  lastActivityStatus: 'inactive', assignmentStatus: 'Boarded',       country: 'United Kingdom', store: 'Store_6789',                    storeAddress: '45 Oxford St, London,...' },
  { id: 't8',  deviceModel: 'S1F2', serialNumber: '000158201229171', lastActivity: 'Oct 15, 2025, 10:32',  lastActivityStatus: 'active',   assignmentStatus: 'Pending',       country: 'United Kingdom', store: 'Store_0123',                    storeAddress: '67 Regent St, London,...' },
  { id: 't9',  deviceModel: 'S1F2', serialNumber: '000158201904264', lastActivity: 'Sep 14, 2025, 10:30',  lastActivityStatus: 'inactive', assignmentStatus: 'Deployed',      country: 'Netherlands',    store: 'Store_4567',                    storeAddress: 'Laan van Meerdervoort...' },
  { id: 't10', deviceModel: 'S1F2', serialNumber: '000158201904275', lastActivity: 'Oct 22, 2025, 19:00',  lastActivityStatus: 'inactive', assignmentStatus: 'Pending',       country: 'Netherlands',    store: 'Store_8901',                    storeAddress: 'Haagse Schouwweg 6,...' },
  { id: 't11', deviceModel: 'S1F2', serialNumber: '000158202514103', lastActivity: 'Nov 09, 2025, 15:35',  lastActivityStatus: 'inactive', assignmentStatus: 'Inventory',     country: '',               store: '',                              storeAddress: '' },
  { id: 't12', deviceModel: 'SFO1', serialNumber: '0543900012',      lastActivity: 'Oct 15, 2025, 10:29',  lastActivityStatus: 'active',   assignmentStatus: 'Boarded',       country: 'Netherlands',    store: 'Store_2468',                    storeAddress: 'Vondelpark 12, Amsterd...' },
  { id: 't13', deviceModel: 'SFO1', serialNumber: '0544000010',      lastActivity: 'Oct 15, 2025, 10:31',  lastActivityStatus: 'active',   assignmentStatus: 'Boarded',       country: 'United States',  store: 'Store_3579',                    storeAddress: '456 Broadway, New Yor...' },
];

const terminalColumns: BentoColumn[] = [
  { field: 'deviceModel',       label: 'Device model',       minWidth: 120 },
  { field: 'serialNumber',      label: 'Serial number',      minWidth: 190, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'lastActivity',      label: 'Last activity',      minWidth: 190, infoIconTooltip: ' ' },
  { field: 'assignmentStatus',  label: 'Assignment status',  minWidth: 160, infoIconTooltip: ' ' },
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
    options: { listboxItems: [{ value: 'ams1', label: 'AMS1' }, { value: 's1f2', label: 'S1F2' }, { value: 'sfo1', label: 'SFO1' }] },
  },
  {
    field: 'assignmentStatus',
    label: 'Assignment status',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [{ value: 'Boarded', label: 'Boarded' }, { value: 'Deployed', label: 'Deployed' }, { value: 'Inventory', label: 'Inventory' }, { value: 'Assigning', label: 'Assigning' }, { value: 'Reassignment', label: 'Reassignment' }, { value: 'Pending', label: 'Pending' }] },
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

const isAssignModalOpen = ref(false);

const assignModalActions = [
  { title: 'Confirm', event: () => { isAssignModalOpen.value = false; } },
  { title: 'Cancel',  event: () => { isAssignModalOpen.value = false; } },
];

const terminalBulkActions = [
  { title: 'Assign',           icon: ClickIcon,         event: () => { isAssignModalOpen.value = true; } },
  { title: 'Return',           icon: RefundIcon,        event: () => {} },
  { title: 'Replace',          icon: AccountSwitchIcon, event: () => {} },
  { title: 'Schedule actions', icon: ClockIcon,         event: () => {} },
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

function assignmentStatusColor(status: Terminal['assignmentStatus']): 'green' | 'orange' | 'red' | 'blue' | 'grey' {
  if (status === 'Boarded')       return 'green';
  if (status === 'Deployed')      return 'grey';
  if (status === 'Inventory')     return 'grey';
  if (status === 'Assigning')     return 'orange';
  if (status === 'Reassignment')  return 'orange';
  if (status === 'Pending')       return 'red';
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

// ── Assignment status info popover (Terminals tab) ─────────────────────────
const assignmentInfoTarget = ref<HTMLElement | null>(null);
const assignmentPopoverOpen = ref(false);
let assignmentHoverTimeout: ReturnType<typeof setTimeout> | null = null;

function openAssignmentPopover() {
  if (assignmentHoverTimeout) clearTimeout(assignmentHoverTimeout);
  assignmentPopoverOpen.value = true;
}

function closeAssignmentPopover() {
  assignmentHoverTimeout = setTimeout(() => {
    assignmentPopoverOpen.value = false;
  }, 150);
}

function unbindAssignmentIcon() {
  if (assignmentInfoTarget.value) {
    assignmentInfoTarget.value.removeEventListener('mouseenter', openAssignmentPopover);
    assignmentInfoTarget.value.removeEventListener('mouseleave', closeAssignmentPopover);
    assignmentInfoTarget.value.removeEventListener('focusin', openAssignmentPopover);
    assignmentInfoTarget.value.removeEventListener('focusout', closeAssignmentPopover);
    assignmentInfoTarget.value = null;
  }
}

function bindAssignmentInfoIcon() {
  unbindAssignmentIcon();
  const icons = document.querySelectorAll('.b-data-grid-columns__column-info-icon .b-info-icon');
  if (icons.length >= 2) {
    const icon = icons[1] as HTMLElement;
    assignmentInfoTarget.value = icon;
    icon.addEventListener('mouseenter', openAssignmentPopover);
    icon.addEventListener('mouseleave', closeAssignmentPopover);
    icon.addEventListener('focusin', openAssignmentPopover);
    icon.addEventListener('focusout', closeAssignmentPopover);
  } else {
    setTimeout(bindAssignmentInfoIcon, 200);
  }
}

// ── Last activity info popover (Mobile devices tab) ─────────────────────────
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

function unbindActivityIcon() {
  if (activityInfoTarget.value) {
    activityInfoTarget.value.removeEventListener('mouseenter', openPopover);
    activityInfoTarget.value.removeEventListener('mouseleave', closePopover);
    activityInfoTarget.value.removeEventListener('focusin', openPopover);
    activityInfoTarget.value.removeEventListener('focusout', closePopover);
    activityInfoTarget.value = null;
  }
}

function bindActivityInfoIcon() {
  unbindActivityIcon();
  const icon = document.querySelector('.b-data-grid-columns__column-info-icon .b-info-icon') as HTMLElement | null;
  if (icon) {
    activityInfoTarget.value = icon;
    icon.addEventListener('mouseenter', openPopover);
    icon.addEventListener('mouseleave', closePopover);
    icon.addEventListener('focusin', openPopover);
    icon.addEventListener('focusout', closePopover);
  } else {
    setTimeout(bindActivityInfoIcon, 200);
  }
}

// ── Tab-aware icon binding ──────────────────────────────────────────────────
function bindIconsForTab() {
  unbindAssignmentIcon();
  unbindActivityIcon();
  if (activeTabIndex.value === 0) {
    bindAssignmentInfoIcon();
  } else {
    bindActivityInfoIcon();
  }
}

watch(activeTabIndex, () => {
  nextTick(bindIconsForTab);
});

onMounted(() => {
  nextTick(bindIconsForTab);
});

onBeforeUnmount(() => {
  unbindAssignmentIcon();
  unbindActivityIcon();
  if (assignmentHoverTimeout) clearTimeout(assignmentHoverTimeout);
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

  &__assignment-cell {
    display: flex;
    align-items: center;
    gap: var(--b-spacer-030);
  }

  &__assignment-warning {
    flex-shrink: 0;
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

  &__confirm {
    display: flex;
    flex-direction: column;
    gap: var(--b-spacer-070);
  }

  &__confirm-intro {
    margin: 0;
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
    color: var(--b-color-label-primary);
  }

  &__confirm-row {
    display: flex;
    align-items: flex-start;
    gap: var(--b-spacer-040);
    color: var(--b-color-label-primary);

    > svg {
      flex-shrink: 0;
      margin-top: 2px;
    }
  }

  &__confirm-detail {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  &__confirm-label {
    margin: 0;
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
    font-weight: var(--b-text-body-stronger-font-weight, 600);
    color: var(--b-color-label-primary);
    line-height: var(--b-text-body-line-height);
  }

  &__confirm-value {
    margin: 0;
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
    color: var(--b-color-label-primary);
    line-height: var(--b-text-body-line-height);
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

.pd__assignment-legend {
  display: flex;
  flex-direction: column;
  width: 288px;
}

.pd__assignment-legend-item {
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-020, 4px);
  padding: var(--b-spacer-040, 8px) 0;

  & + & {
    border-top: var(--b-border-width-s, 1px) solid var(--b-color-separator-primary, #dadddf);
  }
}

.pd__assignment-legend-desc {
  margin: 0;
  font-family: var(--b-text-body-font-family);
  font-size: var(--b-text-body-font-size, 14px);
  line-height: var(--b-text-body-line-height, 20px);
  color: var(--b-color-label-secondary, #5c6874);
}
</style>
