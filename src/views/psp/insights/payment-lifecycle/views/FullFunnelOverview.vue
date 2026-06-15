<template>
  <div>
    <data-recency class="b-margin-bottom-070" />

    <overview-section class="b-margin-bottom-070" :items="overviewItems" />

    <div class="section">
      <div class="u-display-flex u-justify-content-space-between b-margin-bottom-060">
        <bento-typography variant="title" el="h2" medium>
          Payment lifecycle overview
        </bento-typography>
        <bento-segmented-control
          :model-value="showFullFunnelBy"
          :items="chartViewOptions"
          @update:model-value="showFullFunnelBy = $event"
        />
      </div>

      <div class="u-display-flex u-justify-content-space-between u-margin-bottom-24">
        <div class="annotated-toggle">
          <bento-toggle
            :value="showSettledBeforeDateRange"
            aria-label="Toggles previously initiated settlements"
            label-position="after"
            @input="showSettledBeforeDateRange = $event"
          >
            Show previously initiated settlements
          </bento-toggle>
        </div>
        <div class="u-display-flex u-align-items-start">
          <lume-chart-legend :data="chartLegendData" />
        </div>
      </div>

      <div v-if="computedSummaryItems.length" class="u-margin-top-8 full-funnel-headers">
        <div v-for="item in computedSummaryItems" :key="item.label" class="full-funnel-header">
          <div class="full-funnel-header__label">
            <bento-typography variant="caption">
              {{ item.label }}
            </bento-typography>
          </div>
          <div class="full-funnel-header__text">
            <bento-typography variant="title">
              {{ item.value }}
            </bento-typography>
            <bento-tag :label="item.percentage" class="u-margin-left-8" />
          </div>
        </div>
      </div>

      <lume-stacked-bar-chart
        class="u-margin-top-8"
        :data="fullFunnelChartData"
        :labels="fullFunnelChartLabels"
        :options="fullFunnelChartOptions"
      />

      <bento-typography el="p">
        There can be a slight difference between the percentages in this chart and other dashboards.
        <bento-button type="button" variant="tertiary">
          Check details
          <template #iconRight>
            <info-icon />
          </template>
        </bento-button>
      </bento-typography>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import {
  BentoButton, BentoSegmentedControl, BentoTypography, BentoTag,
  BentoToggle,
} from '@adyen/bento-vue2';
import { LumeChartLegend, LumeStackedBarChart } from '@adyen/lume';
import InfoIcon from '@adyen/ui-assets-icons-16/vue/info';

import DataRecency from '../components/DataRecency.vue';
import OverviewSection from '../components/OverviewSection.vue';
import { MOCK_FULL_FUNNEL, formatCount } from '../payment-lifecycle.mock-data';

const data = MOCK_FULL_FUNNEL;
const showFullFunnelBy = ref<'amount' | 'count'>('count');
const showSettledBeforeDateRange = ref(true);

const chartViewOptions = [
  { label: 'Amount', value: 'amount' },
  { label: 'Count', value: 'count' },
];

const fullFunnelChartOptions = {
  margins: { left: 24 },
  paddingInner: 0.33,
  paddingOuter: 0,
  startOnZero: true,
  tooltipOptions: { showTitle: false },
  withLegend: false,
  yAxisOptions: { gridLines: false, tickCount: 5, tickFormat: '~p' },
};

const fullFunnelChartLabels = Array(5).fill('');

const overviewItems = [
  { key: 'initiated', label: 'Initiated transactions', value: 'EUR 1.08M', count: '1.69M' },
  { key: 'failedAuth', label: 'Failed authentications', value: 'EUR 5.36K', count: '6.88K' },
  { key: 'failedTx', label: 'Failed transactions', value: '5.70%', count: '95.07K' },
  { key: 'refunds', label: 'Refunds', value: 'EUR 61.10K', count: '98.5K' },
  { key: 'chargebacks', label: 'Chargebacks', value: '0.02%', count: '277' },
];

const chartLegendData = computed(() => {
  const items = [
    { label: 'Authentication-only transactions', color: 'grey' },
  ];
  if (showSettledBeforeDateRange.value) {
    items.push({ label: 'Initiated before selected date range', color: 'skyblue' });
  }
  return items;
});

function formatAmountShort(minorUnits: number): string {
  const major = minorUnits / 100;
  if (major >= 1000000) return `${(major / 1000000).toFixed(2)}M`;
  if (major >= 1000) return `${(major / 1000).toFixed(2)}K`;
  return major.toFixed(2);
}

const computedSummaryItems = computed(() => {
  const isAmount = showFullFunnelBy.value === 'amount';
  const maxVal = isAmount ? data.initiated.amount : data.initiated.count;

  const stages = [
    { key: 'initiated', label: 'Initiated', raw: isAmount ? data.initiated.amount : data.initiated.count },
    { key: 'received', label: 'Received', raw: isAmount ? data.received.amount : data.received.count },
    { key: 'authorised', label: 'Authorised', raw: isAmount ? data.authorised.amount : data.authorised.count },
    { key: 'grossSettlement', label: 'Gross settlements', raw: isAmount ? data.grossSettlement.amount : data.grossSettlement.count },
    { key: 'netSettlement', label: 'Net settlements', raw: isAmount ? data.netSettlement.amount : data.netSettlement.count },
  ];

  return stages.map(s => ({
    ...s,
    value: isAmount ? formatAmountShort(s.raw) : formatCount(s.raw),
    percentage: `${((s.raw / maxVal) * 100).toFixed(2)}%`,
  }));
});

const fullFunnelChartData = computed(() => {
  const isAmount = showFullFunnelBy.value === 'amount';
  const maxVal = isAmount ? data.initiated.amount : data.initiated.count;

  const getValue = (stage: typeof data.initiated) => {
    const raw = isAmount ? stage.amount : stage.count;
    return raw / maxVal;
  };

  const chartData = [
    {
      values: [
        getValue(data.initiated),
        getValue(data.received),
        getValue(data.authorised),
        getValue(data.grossSettlement),
        getValue(data.netSettlement),
      ],
      color: 'royalblue',
    },
  ];

  // Authentication-only bar on received column
  chartData.push({
    values: [0, getValue(data.authenticationOnly) * 0.02],
    color: 'grey',
  });

  if (showSettledBeforeDateRange.value) {
    chartData.push({
      values: [0, 0, 0, 0.05, 0.05],
      color: 'skyblue',
    });
  }

  return chartData;
});
</script>

<style lang="scss" scoped>
.section {
  margin-top: var(--b-spacer-100);
  border: var(--b-border-width-s) solid var(--b-color-outline-primary);
  border-radius: var(--b-border-radius-l);
  padding: var(--b-spacer-090);
}

.full-funnel-headers {
  display: grid;
  grid-template-columns: repeat(5, minmax(0px, 1fr));
  column-gap: 6.6%;
  padding-left: var(--b-spacer-090);
}

.full-funnel-header {
  &__label {
    color: var(--b-color-label-secondary);
  }

  &__text {
    display: flex;
    align-items: center;
  }
}

.annotated-toggle {
  display: flex;
  align-items: center;
}

.u-display-flex {
  display: flex;
}

.u-justify-content-space-between {
  justify-content: space-between;
}

.u-align-items-start {
  align-items: flex-start;
}

.u-margin-bottom-24 {
  margin-bottom: 24px;
}

.u-margin-top-8 {
  margin-top: 8px;
}

.u-margin-left-8 {
  margin-left: 8px;
}

.u-margin-left-4 {
  margin-left: 4px;
}
</style>
