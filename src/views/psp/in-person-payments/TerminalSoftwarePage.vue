<template>
  <div class="tsw">
    <bento-header
      title="Terminal software"
      description="Manage terminal software packages, update schedules, and software profiles"
      variant="page"
    >
    </bento-header>

    <bento-tabs
      :active-tab-index="activeTabIndex"
      @update:active-tab-index="activeTabIndex = $event"
    >
      <bento-tab title="Updates" />
      <bento-tab title="Releases" />
      <bento-tab title="Default versions" />
    </bento-tabs>

    <!-- ── Updates ────────────────────────────────────────────────────── -->
    <template v-if="activeTabIndex === 0">
      <div class="tsw__grid-wrap b-margin-top-070">
        <div class="tsw__action-banner">
          <p class="u-margin-0">Make sure your terminal fleet runs on the latest software and schedule updates yourself. You can either choose to update in preconfigured batches for the safest rollout, or take full control and create your own batches.</p>
          <bento-button variant="secondary">Schedule update</bento-button>
        </div>
        <bento-data-grid
          class="tsw__data-grid"
          :columns="updateColumns"
          :data="updatesData"
          :pagination="updatesPagination"
          @update:pagination="updatesPagination = $event"
        >
          <template #item-validation="{ item }">
            <bento-tag>{{ item.validation }}</bento-tag>
          </template>
          <template #item-updateStatus="{ item }">
            <span v-if="item.updateStatus === 'Finished'" class="tsw__status-cell">
              <checkmark-circle-icon svg-title="Finished" />
              Finished
            </span>
            <span v-else-if="item.updateStatus === 'Scheduled'" class="tsw__status-cell">
              <clock-icon svg-title="Scheduled" />
              Scheduled
            </span>
            <span v-else>{{ item.updateStatus }}</span>
          </template>
          <template #item-creationDate="{ item }">
            {{ item.creationDate }} <span class="tsw__by-text">by</span> {{ item.createdBy }}
          </template>
          <template #item-actions>
            <bento-button variant="tertiary" size="small">···</bento-button>
          </template>
        </bento-data-grid>
      </div>
    </template>

    <!-- ── Releases ───────────────────────────────────────────────────── -->
    <template v-if="activeTabIndex === 1">
      <div class="tsw__grid-wrap b-margin-top-070">
        <div class="tsw__toolbar">
          <div class="tsw__toolbar-right">
            <bento-button variant="secondary" @click="showScheduleDialog = true">
              <template #iconLeft>
                <add-icon svg-title="Add" />
              </template>
              New schedule
            </bento-button>
          </div>
        </div>
        <bento-data-grid
          class="tsw__data-grid"
          :columns="scheduleColumns"
          :data="schedulesData"
          :pagination="schedulesPagination"
          @update:pagination="schedulesPagination = $event"
        >
          <template #item-status="{ item }">
            <bento-status :variant="scheduleStatusVariant(item.status)">{{ item.status }}</bento-status>
          </template>
        </bento-data-grid>
      </div>
    </template>

    <!-- ── Default versions ──────────────────────────────────────────── -->
    <template v-if="activeTabIndex === 2">
      <div class="tsw__grid-wrap b-margin-top-070">
        <div class="tsw__toolbar">
          <div class="tsw__toolbar-right">
            <bento-button variant="secondary">
              <template #iconLeft>
                <add-icon svg-title="Add" />
              </template>
              New profile
            </bento-button>
          </div>
        </div>
        <bento-data-grid
          class="tsw__data-grid"
          :columns="profileColumns"
          :data="profilesData"
          :pagination="profilesPagination"
          @update:pagination="profilesPagination = $event"
        >
          <template #item-appliedTo="{ item }">
            <span>{{ item.appliedTo }} {{ item.appliedTo === 1 ? 'terminal' : 'terminals' }}</span>
          </template>
        </bento-data-grid>
      </div>
    </template>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  BentoHeader, BentoTabs, BentoTab,
  BentoDataGrid, BentoTag, BentoStatus, BentoStatusVariant, BentoButton,
  BentoColumnOverflow,
} from '@adyen/bento-vue2';
import type { BentoColumn } from '@adyen/bento-vue2';
import AddIcon from '@adyen/ui-assets-icons-16/vue/plus';
import CheckmarkCircleIcon from '@adyen/ui-assets-icons-16/vue/checkmark-circle';
import ClockIcon from '@adyen/ui-assets-icons-16/vue/clock';

const activeTabIndex = ref(0);
const showScheduleDialog = ref(false);

// ── Updates tab ─────────────────────────────────────────────────────────────

interface UpdateRow {
  id: string;
  deploymentBatch: string;
  validation: string;
  updateStatus: string;
  versions: string;
  scheduledDate: string;
  total: number;
  fleetPercentage: string;
  successful: number;
  failed: number;
  pending: number;
  cancelled: number;
  creationDate: string;
  createdBy: string;
  [key: string]: unknown;
}

const updatesPagination = ref({ page: 1, size: 10, totalCount: 6, pageSizes: [10, 25, 50] });

const updateColumns: BentoColumn[] = [
  { field: 'deploymentBatch', label: 'Deployment & batch', minWidth: 220 },
  { field: 'validation',      label: 'Validation',         minWidth: 140 },
  { field: 'updateStatus',    label: 'Update Status',      minWidth: 160 },
  { field: 'versions',        label: 'Versions',           minWidth: 180 },
  { field: 'scheduledDate',   label: 'Scheduled Date',     minWidth: 200 },
  { field: 'total',           label: 'Total',              minWidth: 100 },
  { field: 'fleetPercentage', label: 'Fleet percentage',   minWidth: 140 },
  { field: 'successful',      label: 'Successful',         minWidth: 120 },
  { field: 'failed',          label: 'Failed',             minWidth: 100 },
  { field: 'pending',         label: 'Pending',            minWidth: 100 },
  { field: 'cancelled',       label: 'Cancelled',          minWidth: 120 },
  { field: 'creationDate',    label: 'Creation Date',      minWidth: 240 },
  { field: 'actions',         label: '',                   minWidth: 60 },
];

const updatesData: UpdateRow[] = [
  { id: 'u-01', deploymentBatch: 'Batch 1 / Update group A', validation: 'Production', updateStatus: 'Finished',  versions: '3.42.0 → 3.43.0', scheduledDate: 'May 20, 2026, 08:00', total: 1240, fleetPercentage: '100%', successful: 1238, failed: 2, pending: 0,    cancelled: 0, creationDate: 'May 18, 2026, 14:00', createdBy: 'eva.han'     },
  { id: 'u-02', deploymentBatch: 'Batch 2 / Update group B', validation: 'Production', updateStatus: 'Finished',  versions: '3.41.1 → 3.42.0', scheduledDate: 'May 10, 2026, 08:00', total: 840,  fleetPercentage: '100%', successful: 840,  failed: 0, pending: 0,    cancelled: 0, creationDate: 'May 8, 2026, 10:22',  createdBy: 'tim.j'       },
  { id: 'u-03', deploymentBatch: 'Batch 1 / Update group A', validation: 'Staging',    updateStatus: 'Scheduled', versions: '3.43.0 → 3.44.0', scheduledDate: 'Jun 3, 2026, 06:00',  total: 1240, fleetPercentage: '100%', successful: 0,    failed: 0, pending: 1240, cancelled: 0, creationDate: 'May 28, 2026, 09:10', createdBy: 'eva.han'     },
  { id: 'u-04', deploymentBatch: 'Batch 1 / Update group C', validation: 'Production', updateStatus: 'Finished',  versions: '6.3.0 → 6.4.1',  scheduledDate: 'Apr 28, 2026, 08:00', total: 620,  fleetPercentage: '100%', successful: 618,  failed: 0, pending: 0,    cancelled: 2, creationDate: 'Apr 26, 2026, 11:00', createdBy: 'system'      },
  { id: 'u-05', deploymentBatch: 'Custom / Retail DE',       validation: 'Production', updateStatus: 'Finished',  versions: '2.1.0 → 2.3.1',  scheduledDate: 'May 2, 2026, 09:00',  total: 200,  fleetPercentage: '50%',  successful: 198,  failed: 2, pending: 0,    cancelled: 0, creationDate: 'Apr 30, 2026, 14:22', createdBy: 'integration' },
  { id: 'u-06', deploymentBatch: 'Batch 2 / Update group D', validation: 'Staging',    updateStatus: 'Scheduled', versions: '1.0.0 → 1.1.0',  scheduledDate: 'Jun 10, 2026, 07:00', total: 80,   fleetPercentage: '100%', successful: 0,    failed: 0, pending: 80,   cancelled: 0, creationDate: 'May 30, 2026, 15:30', createdBy: 'devteam'     },
];

// ── Schedules tab ───────────────────────────────────────────────────────────

interface ScheduleRow {
  id: string;
  name: string;
  software: string;
  targetModel: string;
  scheduledAt: string;
  status: string;
  affectedTerminals: number;
  createdBy: string;
  [key: string]: unknown;
}

const schedulesPagination = ref({ page: 1, size: 10, totalCount: 6, pageSizes: [10, 25, 50] });

const scheduleColumns: BentoColumn[] = [
  { field: 'name',              label: 'Schedule name',       minWidth: 200 },
  { field: 'software',          label: 'Software',            minWidth: 200 },
  { field: 'targetModel',       label: 'Terminal model',      minWidth: 160 },
  { field: 'scheduledAt',       label: 'Scheduled at',        minWidth: 200 },
  { field: 'affectedTerminals', label: 'Affected terminals',  minWidth: 160 },
  { field: 'status',            label: 'Status',              minWidth: 140 },
  { field: 'createdBy',         label: 'Created by',          minWidth: 160 },
];

const schedulesData: ScheduleRow[] = [
  { id: 'sch-01', name: 'V400m nightly update',     software: 'Adyen Payment App 3.42.0',  targetModel: 'V400m',     scheduledAt: 'Jun 1, 2026, 02:00',  affectedTerminals: 47, status: 'Pending',    createdBy: 'eva.han'     },
  { id: 'sch-02', name: 'P400 firmware rollout',    software: 'Adyen Terminal Firmware 6.4.1', targetModel: 'P400 Plus', scheduledAt: 'May 31, 2026, 22:00', affectedTerminals: 12, status: 'Pending',    createdBy: 'tim.j'       },
  { id: 'sch-03', name: 'RetailPOS update',          software: 'RetailPOS Integration 2.3.1', targetModel: 'V400m',   scheduledAt: 'May 30, 2026, 01:00', affectedTerminals: 34, status: 'In progress', createdBy: 'integration' },
  { id: 'sch-04', name: 'Tap to Pay upgrade',        software: 'Tap to Pay Extension 1.0.0', targetModel: 'P400 Plus', scheduledAt: 'May 29, 2026, 03:00', affectedTerminals: 8,  status: 'Completed',  createdBy: 'devteam'     },
  { id: 'sch-05', name: 'Receipt driver patch',      software: 'Receipt Printer Driver 1.1.0', targetModel: 'V400m',  scheduledAt: 'May 28, 2026, 00:30', affectedTerminals: 21, status: 'Completed',  createdBy: 'system'      },
  { id: 'sch-06', name: 'V400c firmware update',     software: 'Adyen Terminal Firmware 6.4.1', targetModel: 'V400c', scheduledAt: 'May 25, 2026, 02:00', affectedTerminals: 15, status: 'Failed',     createdBy: 'eva.han'     },
];

function scheduleStatusVariant(status: string): BentoStatusVariant {
  if (status === 'Completed') return BentoStatusVariant.GREEN;
  if (status === 'In progress') return BentoStatusVariant.BLUE;
  if (status === 'Pending') return BentoStatusVariant.GREY;
  if (status === 'Failed') return BentoStatusVariant.RED;
  return BentoStatusVariant.GREY;
}

// ── Profiles tab ────────────────────────────────────────────────────────────

interface ProfileRow {
  id: string;
  name: string;
  description: string;
  terminalModel: string;
  softwareCount: number;
  appliedTo: number;
  lastModified: string;
  [key: string]: unknown;
}

const profilesPagination = ref({ page: 1, size: 10, totalCount: 4, pageSizes: [10, 25, 50] });

const profileColumns: BentoColumn[] = [
  { field: 'name',          label: 'Profile name',      minWidth: 200 },
  { field: 'description',   label: 'Description',       minWidth: 240, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'terminalModel', label: 'Terminal model',    minWidth: 160 },
  { field: 'softwareCount', label: 'Software packages', minWidth: 160 },
  { field: 'appliedTo',     label: 'Applied to',        minWidth: 160 },
  { field: 'lastModified',  label: 'Last modified',     minWidth: 200 },
];

const profilesData: ProfileRow[] = [
  { id: 'pr-01', name: 'Standard POS',      description: 'Default payment app and firmware for all POS terminals',  terminalModel: 'V400m',     softwareCount: 4, appliedTo: 47, lastModified: 'May 21, 2026, 10:30' },
  { id: 'pr-02', name: 'Counter Profile',   description: 'Optimised for counter-top V400c devices',                terminalModel: 'V400c',     softwareCount: 3, appliedTo: 15, lastModified: 'May 14, 2026, 08:05' },
  { id: 'pr-03', name: 'Kiosk Profile',     description: 'Kiosk mode with loyalty and receipt printer support',    terminalModel: 'P400 Plus', softwareCount: 5, appliedTo: 12, lastModified: 'Apr 30, 2026, 15:00' },
  { id: 'pr-04', name: 'Minimal Profile',   description: 'Lightweight firmware-only profile for legacy devices',   terminalModel: 'V240m',     softwareCount: 1, appliedTo: 8,  lastModified: 'Mar 10, 2026, 12:00' },
];

</script>

<style lang="scss" scoped>
.tsw {
  padding: var(--b-spacer-090);

  ::v-deep .b-header-meta__description {
    margin-bottom: var(--b-spacer-070);
  }

  &__grid-wrap {
    padding-bottom: 40px;
  }

  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--b-spacer-060);
    gap: var(--b-spacer-060);
  }

  &__toolbar-right {
    display: flex;
    align-items: center;
    gap: var(--b-spacer-040);
    margin-left: auto;
  }

  &__action-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--b-spacer-060);
    padding: var(--b-spacer-060) var(--b-spacer-070);
    background: var(--b-color-background-secondary);
    border: var(--b-border-width-s) solid var(--b-color-separator-primary);
    border-radius: var(--b-border-radius-m);
    margin-bottom: var(--b-spacer-060);

    p {
      flex: 1;
      font-family: var(--b-text-body-font-family);
      font-size: var(--b-text-body-font-size);
      color: var(--b-color-label-primary);
    }
  }

  &__data-grid {
    border: var(--b-border-width-s) solid var(--b-color-separator-primary);
    border-radius: var(--b-border-radius-m);
    overflow: hidden;
  }

  &__status-cell {
    display: inline-flex;
    align-items: center;
    gap: var(--b-spacer-030);
  }

  &__by-text {
    color: var(--b-color-label-secondary);
    margin: 0 2px;
  }
}
</style>
