<template>
  <div class="exp page page--locked page--data-grid-template">
    <bento-data-grid-template
      class="content-section--flex"
      :header="headerConfig"
      :tabs="tabsConfig"
      sticky-tabs
    >
      <template #header-actions>
        <bento-button @click="console.log('Create experiment')">
          <template #iconLeft>
            <add-icon svg-title="Create" />
          </template>
          Create experiment
        </bento-button>
      </template>

      <template v-for="index in tabsConfig.tabs.length" v-slot:[getTabSlotName(index-1)]>
        <bento-data-grid
          :key="index"
          :columns="columns"
          :data="getTabData(index - 1)"
          fit-content
          :pagination="pagination"
          @update:columns="columns = $event"
          @update:pagination="pagination = $event"
        >
          <template #item-name="{ item }">
            <bento-link is-not-routing to="#" :title="item.name">
              {{ item.name }}
            </bento-link>
          </template>

          <template #item-status="{ item }">
            <bento-status :variant="statusVariant(item.status)">
              {{ statusLabel(item.status) }}
            </bento-status>
          </template>

          <template #item-trafficSplit="{ item }">
            {{ item.trafficSplit }}%
          </template>

          <template #item-blockRate="{ item }">
            <span v-if="item.metrics.transactionCount > 0">
              {{ item.metrics.blockRate.toFixed(1) }}%
              <span class="exp__vs">vs {{ item.metrics.blockRateControl.toFixed(1) }}%</span>
            </span>
            <span v-else>-</span>
          </template>

          <template #item-uplift="{ item }">
            <bento-tag
              v-if="item.metrics.uplift > 0"
              :label="`+${item.metrics.uplift.toFixed(1)}%`"
              variant="green"
              size="small"
            />
            <span v-else>-</span>
          </template>

          <template #item-transactions="{ item }">
            {{ item.metrics.transactionCount > 0 ? new Intl.NumberFormat('en-US').format(item.metrics.transactionCount) : '-' }}
          </template>

          <template #item-actions="{ item }">
            <div class="exp__actions">
              <bento-button
                v-if="item.status === 'running'"
                variant="tertiary" size="small" :condensed="true"
                @click="console.log('Pause', item.id)"
              >
                <template #iconLeft>
                  <pause-icon svg-title="Pause" />
                </template>
              </bento-button>
              <bento-button
                v-if="item.status === 'paused'"
                variant="tertiary" size="small" :condensed="true"
                @click="console.log('Resume', item.id)"
              >
                <template #iconLeft>
                  <play-icon svg-title="Resume" />
                </template>
              </bento-button>
              <bento-button
                variant="tertiary" size="small" :condensed="true"
                @click="console.log('Delete', item.id)"
              >
                <template #iconLeft>
                  <delete-icon svg-title="Delete" />
                </template>
              </bento-button>
            </div>
          </template>
        </bento-data-grid>
      </template>
    </bento-data-grid-template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  BentoButton, BentoDataGrid, BentoDataGridTemplate,
  BentoLink, BentoTag, BentoStatus,
} from '@adyen/bento-vue2';
import type { BentoColumn } from '@adyen/bento-vue2';
import AddIcon from '@adyen/ui-assets-icons-16/vue/plus';
import PauseIcon from '@adyen/ui-assets-icons-16/vue/pauze';
import PlayIcon from '@adyen/ui-assets-icons-16/vue/play';
import DeleteIcon from '@adyen/ui-assets-icons-16/vue/bin';
import { MOCK_EXPERIMENTS, EXPERIMENT_TABS } from './experiments.mock-data';
import type { ExperimentStatus } from './experiments.types';

const headerConfig = { title: 'Experiments' };
const tabsConfig = { tabs: EXPERIMENT_TABS.map(t => ({ title: t })) };
const pagination = ref({ page: 1, size: 20, totalCount: MOCK_EXPERIMENTS.length, pageSizes: [10, 20, 50] });

const columns = ref<BentoColumn[]>([
  { field: 'name', label: 'Experiment name', minWidth: 240 },
  { field: 'profileName', label: 'Profile', width: 200 },
  { field: 'status', label: 'Status', width: 120 },
  { field: 'trafficSplit', label: 'Traffic split', width: 120 },
  { field: 'startDate', label: 'Start date', width: 150 },
  { field: 'blockRate', label: 'Block rate (test vs control)', width: 200 },
  { field: 'uplift', label: 'Uplift', width: 100 },
  { field: 'transactions', label: 'Transactions', width: 130 },
  { field: 'actions', label: '', width: 100 },
]);

function getTabSlotName(index: number): string { return `tab-${index + 1}`; }

function getTabData(index: number): any[] {
  if (index === 0) return MOCK_EXPERIMENTS.filter(e => e.status === 'running' || e.status === 'paused');
  if (index === 1) return MOCK_EXPERIMENTS.filter(e => e.status === 'completed');
  return MOCK_EXPERIMENTS.filter(e => e.status === 'draft');
}

type StatusVariant = 'blue' | 'green' | 'grey' | 'orange' | 'red' | 'yellow';

function statusVariant(status: ExperimentStatus): StatusVariant {
  const map: Record<ExperimentStatus, StatusVariant> = { running: 'green', completed: 'blue', draft: 'grey', paused: 'orange' };
  return map[status];
}

function statusLabel(status: ExperimentStatus): string {
  const map: Record<ExperimentStatus, string> = { running: 'Running', completed: 'Completed', draft: 'Draft', paused: 'Paused' };
  return map[status];
}
</script>

<style lang="scss" scoped>
.exp {
  &__actions {
    display: flex;
    gap: var(--b-spacer-020);
  }

  &__vs {
    color: var(--b-color-text-secondary);
    font-size: var(--b-text-caption-font-size);
  }
}
</style>
