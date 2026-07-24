<template>
  <div class="ar b-margin-top-090">
    <bento-alert type="highlight" class="b-margin-bottom-090">
      <template #default>Machine learning protection</template>
      <template #description>
        Adyen's machine learning models analyze hundreds of signals in real time to detect and block fraudulent transactions
        while maximizing conversion for legitimate shoppers.
      </template>
    </bento-alert>

    <div class="ar__grid">
      <bento-card>
        <template #default>Automation configuration</template>
        <template #description>Configure ML-based automated risk decisions</template>
        <template #actions>
          <bento-button variant="secondary" @click="console.log('Configure')">
            <template #iconLeft>
              <settings-icon svg-title="Configure" />
            </template>
            Configure
          </bento-button>
        </template>
        <template #content>
          <bento-structured-list>
            <bento-structured-list-item label="Automation">
              <bento-status :variant="automation.enabled ? 'green' : 'grey'">
                {{ automation.enabled ? 'Enabled' : 'Disabled' }}
              </bento-status>
            </bento-structured-list-item>
            <bento-structured-list-item label="Traffic percentage">
              {{ automation.trafficPercentage }}%
            </bento-structured-list-item>
            <bento-structured-list-item label="Blocking threshold">
              <div class="ar__threshold">
                <div class="ar__bar"><div class="ar__bar-fill ar__bar-fill--critical" :style="{ width: automation.blockingThreshold + '%' }" /></div>
                <span>{{ automation.blockingThreshold }}</span>
              </div>
            </bento-structured-list-item>
            <bento-structured-list-item label="Review threshold">
              <div class="ar__threshold">
                <div class="ar__bar"><div class="ar__bar-fill ar__bar-fill--warning" :style="{ width: automation.reviewThreshold + '%' }" /></div>
                <span>{{ automation.reviewThreshold }}</span>
              </div>
            </bento-structured-list-item>
            <bento-structured-list-item label="Trust threshold">
              <div class="ar__threshold">
                <div class="ar__bar"><div class="ar__bar-fill ar__bar-fill--success" :style="{ width: automation.trustThreshold + '%' }" /></div>
                <span>{{ automation.trustThreshold }}</span>
              </div>
            </bento-structured-list-item>
          </bento-structured-list>
        </template>
      </bento-card>

      <bento-card>
        <template #default>ML performance</template>
        <template #description>Last 30 days</template>
        <template #content>
          <div class="ar__perf-grid">
            <div class="ar__perf-item">
              <span class="ar__perf-value ar__perf-value--critical">2.1%</span>
              <span class="ar__perf-label">Fraud rate (blocked)</span>
            </div>
            <div class="ar__perf-item">
              <span class="ar__perf-value ar__perf-value--success">0.03%</span>
              <span class="ar__perf-label">False positive rate</span>
            </div>
            <div class="ar__perf-item">
              <span class="ar__perf-value">18.4</span>
              <span class="ar__perf-label">Avg. ML score</span>
            </div>
            <div class="ar__perf-item">
              <span class="ar__perf-value ar__perf-value--success">97.2%</span>
              <span class="ar__perf-label">Precision</span>
            </div>
          </div>

          <bento-divider class="b-margin-y-070" />

          <bento-typography variant="body" class="b-margin-bottom-060">
            Score distribution (last 30 days)
          </bento-typography>

          <div class="ar__distribution">
            <div v-for="bucket in scoreBuckets" :key="bucket.range" class="ar__bucket">
              <div class="ar__bucket-bar" :style="{ height: bucket.height + '%' }" :class="bucket.class" />
              <span class="ar__bucket-label">{{ bucket.range }}</span>
            </div>
          </div>
        </template>
      </bento-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  BentoCard, BentoStructuredList, BentoStructuredListItem,
  BentoButton, BentoStatus, BentoAlert,
  BentoDivider, BentoTypography,
} from '@adyen/bento-vue2';
import SettingsIcon from '@adyen/ui-assets-icons-16/vue/settings';
import { MOCK_AUTOMATION } from '../profile-details.mock-data';

const automation = MOCK_AUTOMATION;

const scoreBuckets = [
  { range: '0-10', height: 72, class: 'ar__bucket-bar--trust' },
  { range: '11-20', height: 58, class: 'ar__bucket-bar--trust' },
  { range: '21-30', height: 35, class: 'ar__bucket-bar--neutral' },
  { range: '31-40', height: 22, class: 'ar__bucket-bar--neutral' },
  { range: '41-50', height: 15, class: 'ar__bucket-bar--neutral' },
  { range: '51-60', height: 10, class: 'ar__bucket-bar--review' },
  { range: '61-70', height: 8, class: 'ar__bucket-bar--review' },
  { range: '71-80', height: 5, class: 'ar__bucket-bar--review' },
  { range: '81-90', height: 4, class: 'ar__bucket-bar--block' },
  { range: '91-100', height: 3, class: 'ar__bucket-bar--block' },
];
</script>

<style lang="scss" scoped>
.ar {
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--b-spacer-090);
  }

  &__threshold {
    display: flex;
    align-items: center;
    gap: var(--b-spacer-060);
    min-width: 200px;
  }

  &__bar {
    flex: 1;
    height: 6px;
    background-color: var(--b-color-background-secondary);
    border-radius: 3px;
    overflow: hidden;
  }

  &__bar-fill {
    height: 100%;
    border-radius: 3px;
    &--critical { background-color: var(--b-color-background-critical); }
    &--warning { background-color: var(--b-color-background-warning); }
    &--success { background-color: var(--b-color-background-success); }
  }

  &__perf-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--b-spacer-070);
  }

  &__perf-item {
    display: flex;
    flex-direction: column;
    gap: var(--b-spacer-020);
  }

  &__perf-value {
    font-size: var(--b-text-title-font-size);
    font-weight: 600;

    &--critical { color: var(--b-color-text-critical); }
    &--success { color: var(--b-color-text-success); }
  }

  &__perf-label {
    font-size: var(--b-text-caption-font-size);
    color: var(--b-color-text-secondary);
  }

  &__distribution {
    display: flex;
    align-items: flex-end;
    gap: var(--b-spacer-030);
    height: 120px;
    padding-top: var(--b-spacer-040);
  }

  &__bucket {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--b-spacer-020);
    height: 100%;
    justify-content: flex-end;
  }

  &__bucket-bar {
    width: 100%;
    border-radius: 2px 2px 0 0;
    min-height: 2px;

    &--trust { background-color: var(--b-color-background-success); }
    &--neutral { background-color: var(--b-color-background-secondary); }
    &--review { background-color: var(--b-color-background-warning); }
    &--block { background-color: var(--b-color-background-critical); }
  }

  &__bucket-label {
    font-size: 10px;
    color: var(--b-color-text-secondary);
    white-space: nowrap;
  }
}
</style>
