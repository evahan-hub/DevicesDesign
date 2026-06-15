<template>
  <div class="po">
    <div class="po__grid b-margin-top-090">
      <bento-card class="po__card">
        <template #default>Profile information</template>
        <template #content>
          <bento-structured-list>
            <bento-structured-list-item label="Profile name">
              {{ profile.profileName }}
            </bento-structured-list-item>
            <bento-structured-list-item label="Profile type">
              <bento-tag :label="profile.profileType" :variant="profile.actionBased ? 'blue' : 'grey'" />
            </bento-structured-list-item>
            <bento-structured-list-item label="Merchant name">
              {{ profile.merchantName }}
            </bento-structured-list-item>
            <bento-structured-list-item label="Default profile">
              {{ profile.defaultProfile ? 'Yes' : 'No' }}
            </bento-structured-list-item>
            <bento-structured-list-item label="Risk premium">
              <bento-tag :label="profile.riskPremium" variant="blue" />
            </bento-structured-list-item>
            <bento-structured-list-item label="Skip review on liability shift">
              {{ profile.skipReviewOnLiabilityShift ? 'Yes' : 'No' }}
            </bento-structured-list-item>
            <bento-structured-list-item v-if="!profile.actionBased" label="Minimal score for review">
              {{ profile.minimalScoreForReview ?? 'Unset' }}
            </bento-structured-list-item>
            <bento-structured-list-item label="Experiment">
              {{ profile.experiment ?? 'None' }}
            </bento-structured-list-item>
            <bento-structured-list-item label="Assigned merchant accounts">
              {{ profile.assignedMerchantCodes }}
            </bento-structured-list-item>
            <bento-structured-list-item label="Created date">
              {{ profile.createdDate }}
            </bento-structured-list-item>
            <bento-structured-list-item label="Last modified">
              {{ profile.lastModifiedDate }}
            </bento-structured-list-item>
          </bento-structured-list>
        </template>
      </bento-card>

      <bento-card class="po__card">
        <template #default>Analytics</template>
        <template #description>Last 30 days</template>
        <template #content>
          <div class="po__metrics">
            <div class="po__metric">
              <span class="po__metric-value">{{ formatNumber(analytics.totalTransactions) }}</span>
              <span class="po__metric-label">Total transactions</span>
            </div>
            <div class="po__metric">
              <span class="po__metric-value">{{ formatRate(analytics.blockedRate) }}</span>
              <span class="po__metric-label">Blocked rate</span>
            </div>
            <div class="po__metric">
              <span class="po__metric-value">{{ formatRate(analytics.reviewRate) }}</span>
              <span class="po__metric-label">Review rate</span>
            </div>
            <div class="po__metric">
              <span class="po__metric-value">{{ formatRate(analytics.allowedRate) }}</span>
              <span class="po__metric-label">Allowed rate</span>
            </div>
            <div class="po__metric">
              <span class="po__metric-value">{{ analytics.avgScore }}</span>
              <span class="po__metric-label">Avg. risk score</span>
            </div>
          </div>

          <div class="po__bar b-margin-top-070">
            <div class="po__bar-segment po__bar-segment--critical" :style="{ width: analytics.blockedRate + '%' }" />
            <div class="po__bar-segment po__bar-segment--warning" :style="{ width: analytics.reviewRate + '%' }" />
            <div class="po__bar-segment po__bar-segment--success" :style="{ width: analytics.allowedRate + '%' }" />
          </div>
          <div class="po__bar-legend b-margin-top-040">
            <span class="po__legend-item"><span class="po__legend-dot po__legend-dot--critical" /> Blocked {{ formatRate(analytics.blockedRate) }}</span>
            <span class="po__legend-item"><span class="po__legend-dot po__legend-dot--warning" /> Review {{ formatRate(analytics.reviewRate) }}</span>
            <span class="po__legend-item"><span class="po__legend-dot po__legend-dot--success" /> Allowed {{ formatRate(analytics.allowedRate) }}</span>
          </div>
        </template>
      </bento-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  BentoCard, BentoStructuredList, BentoStructuredListItem,
  BentoTag,
} from '@adyen/bento-vue2';
import { MOCK_PROFILE, MOCK_ANALYTICS, formatNumber, formatRate } from '../profile-details.mock-data';

const profile = MOCK_PROFILE;
const analytics = MOCK_ANALYTICS;
</script>

<style lang="scss" scoped>
.po {
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--b-spacer-090);
  }

  &__metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--b-spacer-070);
  }

  &__metric {
    display: flex;
    flex-direction: column;
    gap: var(--b-spacer-020);
  }

  &__metric-value {
    font-size: var(--b-text-title-m-font-size);
    font-weight: 600;
    color: var(--b-color-text-primary);
  }

  &__metric-label {
    font-size: var(--b-text-caption-font-size);
    color: var(--b-color-text-secondary);
  }

  &__bar {
    display: flex;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    gap: 2px;
  }

  &__bar-segment {
    height: 100%;
    &--critical { background-color: var(--b-color-background-critical); }
    &--warning { background-color: var(--b-color-background-warning); }
    &--success { background-color: var(--b-color-background-success); }
  }

  &__bar-legend {
    display: flex;
    gap: var(--b-spacer-070);
    font-size: var(--b-text-caption-font-size);
    color: var(--b-color-text-secondary);
  }

  &__legend-item {
    display: flex;
    align-items: center;
    gap: var(--b-spacer-020);
  }

  &__legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    &--critical { background-color: var(--b-color-background-critical); }
    &--warning { background-color: var(--b-color-background-warning); }
    &--success { background-color: var(--b-color-background-success); }
  }
}
</style>
