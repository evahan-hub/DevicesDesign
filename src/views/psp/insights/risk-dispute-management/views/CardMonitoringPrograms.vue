<template>
  <div class="cmp">
    <bento-alert type="highlight" class="b-margin-bottom-080">
      <template #description>
        Card monitoring programs track your chargeback and fraud rates against card scheme thresholds.
        Exceeding these thresholds may result in fines or restrictions.
      </template>
    </bento-alert>

    <bento-card v-for="scheme in schemes" :key="scheme" class="b-margin-bottom-080">
      <template #default>{{ scheme }}</template>
      <template #content>
        <bento-data-grid
          :columns="columns"
          :data="programsByScheme(scheme)"
          fit-content
        >
          <template #item-status="{ item }">
            <bento-status :variant="getStatusVariant(item.status)">{{ item.status }}</bento-status>
          </template>
          <template #item-currentRate="{ item }">
            {{ item.currentMonth.rate.toFixed(2) }}%
          </template>
          <template #item-currentCount="{ item }">
            {{ item.currentMonth.count }}
          </template>
          <template #item-threshold="{ item }">
            {{ item.currentMonth.threshold.toFixed(2) }}%
          </template>
          <template #item-previousRate="{ item }">
            {{ item.previousMonth.rate.toFixed(2) }}%
          </template>
        </bento-data-grid>
      </template>
    </bento-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { BentoColumn } from '@adyen/bento-vue2';
import {
  BentoAlert, BentoCard, BentoDataGrid, BentoStatus,
} from '@adyen/bento-vue2';
import { MOCK_CARD_MONITORING } from '../risk-dispute-management.mock-data';

const programs = MOCK_CARD_MONITORING;
const schemes = computed(() => [...new Set(programs.map(p => p.scheme))]);

function programsByScheme(scheme: string) {
  return programs.filter(p => p.scheme === scheme);
}

function getStatusVariant(status: string) {
  if (status === 'safe') return 'green' as const;
  if (status === 'warning') return 'yellow' as const;
  return 'red' as const;
}

const columns = ref<BentoColumn[]>([
  { field: 'program', label: 'Program' },
  { field: 'status', label: 'Status' },
  { field: 'currentRate', label: 'Current rate', numeric: true },
  { field: 'currentCount', label: 'Count', numeric: true },
  { field: 'threshold', label: 'Threshold', numeric: true },
  { field: 'previousRate', label: 'Previous rate', numeric: true },
]);
</script>

<style lang="scss" scoped>
.cmp {}
</style>
