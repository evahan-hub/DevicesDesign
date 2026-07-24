<template>
  <div class="uo">
    <bento-header title="Uplift overview" variant="page">
      <template #actions>
        <bento-button variant="secondary" @click="console.log('Settings')">
          <template #iconLeft>
            <settings-icon svg-title="Settings" />
          </template>
          Settings
        </bento-button>
        <bento-button variant="secondary" @click="console.log('Learn more')">
          <template #iconLeft>
            <info-icon svg-title="Learn more" />
          </template>
          Learn more
        </bento-button>
      </template>
    </bento-header>

    <div class="uo__filter-bar b-margin-top-090 b-margin-bottom-070">
      <bento-filter-bar
        :config="filterConfig"
        :filter-values-object="filterValues"
        @update:filter-values-object="filterValues = $event"
      />
    </div>

    <div class="uo__kpi-grid b-margin-bottom-090">
      <bento-card v-for="kpi in kpis" :key="kpi.label">
        <template #default>{{ kpi.label }}</template>
        <template #content>
          <span class="uo__kpi-value">{{ kpi.value }}</span>
          <div class="uo__kpi-trend" :class="kpi.trendClass">
            {{ kpi.trend }}
          </div>
        </template>
      </bento-card>
    </div>

    <div class="uo__grid">
      <bento-card>
        <template #default>Revenue impact</template>
        <template #description>Estimated additional revenue from risk optimization</template>
        <template #content>
          <bento-structured-list>
            <bento-structured-list-item label="Authorization uplift">
              <strong>+0.8%</strong> (EUR 94,200)
            </bento-structured-list-item>
            <bento-structured-list-item label="False positive reduction">
              <strong>-15%</strong> (EUR 23,400 saved)
            </bento-structured-list-item>
            <bento-structured-list-item label="Fraud reduction">
              <strong>-22%</strong> (EUR 31,900 saved)
            </bento-structured-list-item>
            <bento-structured-list-item label="Net revenue impact">
              <strong class="uo__positive">+EUR 149,500</strong>
            </bento-structured-list-item>
          </bento-structured-list>
        </template>
      </bento-card>

      <bento-card>
        <template #default>Optimization opportunities</template>
        <template #description>Recommendations to improve your risk setup</template>
        <template #content>
          <div v-for="opp in opportunities" :key="opp.title" class="uo__opportunity b-margin-bottom-060">
            <div class="uo__opp-header">
              <bento-tag :label="opp.impact" :variant="opp.impact === 'High' ? 'green' : 'orange'" size="small" />
              <strong>{{ opp.title }}</strong>
            </div>
            <p class="uo__opp-desc">{{ opp.description }}</p>
          </div>
        </template>
      </bento-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  BentoHeader, BentoButton, BentoCard, BentoStructuredList,
  BentoStructuredListItem, BentoTag, BentoFilterBar, BentoFilterItemType,
} from '@adyen/bento-vue2';
import type { BentoFilterBarModel, BentoFilterValueObject } from '@adyen/bento-vue2';
import SettingsIcon from '@adyen/ui-assets-icons-16/vue/settings';
import InfoIcon from '@adyen/ui-assets-icons-16/vue/info';

const filterValues = ref<BentoFilterValueObject>({});

const filterConfig: BentoFilterBarModel = [
  { field: 'dateRange', label: 'Date range', type: BentoFilterItemType.DATE_RANGE, visible: true },
  { field: 'merchantAccount', label: 'Merchant account', type: BentoFilterItemType.SELECT, visible: true, options: { multiple: true, listboxItems: [{ label: 'AdyenTechSupport_TEST', value: 'test' }, { label: 'AdyenTechSupport_LIVE_NL', value: 'live_nl' }] } },
];

const kpis = [
  { label: 'Authorization rate', value: '96.2%', trend: '+0.8% vs prev. period', trendClass: 'uo__kpi-trend--up' },
  { label: 'Fraud rate', value: '0.04%', trend: '-22% vs prev. period', trendClass: 'uo__kpi-trend--up' },
  { label: 'False positive rate', value: '0.03%', trend: '-15% vs prev. period', trendClass: 'uo__kpi-trend--up' },
  { label: 'Review rate', value: '4.8%', trend: '-8% vs prev. period', trendClass: 'uo__kpi-trend--up' },
];

const opportunities = [
  { title: 'Enable ML automation on MOTO profile', impact: 'High', description: 'Your MOTO profile still uses score-based rules. Enabling ML automation could improve block rate by 15%.' },
  { title: 'Update velocity time window', impact: 'High', description: 'Shortening the velocity window from 24h to 6h on the High-Value profile could reduce false positives by 10%.' },
  { title: 'Review unused referral rules', impact: 'Medium', description: '3 referral rules have not triggered in the last 90 days. Consider removing to simplify your setup.' },
];
</script>

<style lang="scss" scoped>
.uo {
  &__filter-bar {
    display: flex;
    align-items: center;
  }

  &__kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--b-spacer-070);
  }

  &__kpi-value {
    display: block;
    font-size: var(--b-text-title-l-font-size);
    font-weight: 600;
    color: var(--b-color-text-primary);
  }

  &__kpi-trend {
    font-size: var(--b-text-caption-font-size);
    margin-top: var(--b-spacer-020);

    &--up { color: var(--b-color-text-success); }
    &--down { color: var(--b-color-text-critical); }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--b-spacer-090);
  }

  &__positive {
    color: var(--b-color-text-success);
  }

  &__opportunity {
    padding-bottom: var(--b-spacer-060);
    border-bottom: 1px solid var(--b-color-border-secondary);

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }

  &__opp-header {
    display: flex;
    align-items: center;
    gap: var(--b-spacer-040);
    margin-bottom: var(--b-spacer-020);
  }

  &__opp-desc {
    font-size: var(--b-text-body-font-size);
    color: var(--b-color-text-secondary);
    margin: 0;
  }
}
</style>
