<template>
  <div class="rec">
    <bento-header title="Recommendations" variant="page">
      <template #actions>
        <bento-button variant="secondary" @click="console.log('Refresh')">
          <template #iconLeft>
            <refresh-icon svg-title="Refresh" />
          </template>
          Refresh
        </bento-button>
      </template>
    </bento-header>

    <bento-tabs
      :active-tab-index="activeTab"
      @update:active-tab-index="activeTab = $event"
      class="b-margin-top-070"
    >
      <bento-tab title="Active (5)" />
      <bento-tab title="Implemented (8)" />
      <bento-tab title="Dismissed (2)" />
    </bento-tabs>

    <div class="rec__list b-margin-top-090">
      <bento-card v-for="rec in filteredRecs" :key="rec.id" class="b-margin-bottom-070">
        <template #default>
          <div class="rec__header">
            <bento-tag :label="rec.category" :variant="categoryVariant(rec.category)" size="small" />
            {{ rec.title }}
          </div>
        </template>
        <template #description>
          <div class="rec__meta">
            <span>Impact: <strong>{{ rec.impact }}</strong></span>
            <span>Effort: <strong>{{ rec.effort }}</strong></span>
            <span>Profile: <strong>{{ rec.profile }}</strong></span>
          </div>
        </template>
        <template #actions>
          <bento-button v-if="rec.status === 'active'" variant="secondary" size="small" @click="console.log('Implement')">
            Implement
          </bento-button>
          <bento-button v-if="rec.status === 'active'" variant="tertiary" size="small" @click="console.log('Dismiss')">
            Dismiss
          </bento-button>
        </template>
        <template #content>
          <p class="rec__desc">{{ rec.description }}</p>
          <bento-structured-list v-if="rec.metrics">
            <bento-structured-list-item
              v-for="m in rec.metrics"
              :key="m.label"
              :label="m.label"
            >
              {{ m.value }}
            </bento-structured-list-item>
          </bento-structured-list>
        </template>
      </bento-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import {
  BentoHeader, BentoButton, BentoTabs, BentoTab,
  BentoCard, BentoTag, BentoStructuredList, BentoStructuredListItem,
} from '@adyen/bento-vue2';
import RefreshIcon from '@adyen/ui-assets-icons-16/vue/refresh';

const activeTab = ref(0);

interface Recommendation {
  id: string;
  title: string;
  category: string;
  impact: string;
  effort: string;
  profile: string;
  status: 'active' | 'implemented' | 'dismissed';
  description: string;
  metrics?: { label: string; value: string }[];
}

const recommendations: Recommendation[] = [
  { id: 'REC01', title: 'Enable ML automation for MOTO profile', category: 'Automation', impact: 'High', effort: 'Low', profile: 'MOTO Transactions', status: 'active', description: 'ML automation is not enabled on your MOTO profile. Based on similar merchants, enabling it could reduce fraud by 18% while improving authorization rates by 0.5%.', metrics: [{ label: 'Expected fraud reduction', value: '-18%' }, { label: 'Expected auth uplift', value: '+0.5%' }] },
  { id: 'REC02', title: 'Adjust blocking threshold on High-Value profile', category: 'Threshold', impact: 'Medium', effort: 'Low', profile: 'High-Value Transactions', status: 'active', description: 'Your blocking threshold is set to 90. Lowering to 85 could catch an additional 12% of fraud with minimal impact on false positives.', metrics: [{ label: 'Additional fraud caught', value: '+12%' }, { label: 'False positive increase', value: '+0.01%' }] },
  { id: 'REC03', title: 'Remove inactive referral rules', category: 'Cleanup', impact: 'Low', effort: 'Low', profile: 'Default Action Based', status: 'active', description: '3 referral rules have not triggered in the last 90 days. Removing them simplifies your rule set and reduces processing time.' },
  { id: 'REC04', title: 'Enable Shopper DNA for US market', category: 'Enhancement', impact: 'High', effort: 'Medium', profile: 'Default Action Based', status: 'active', description: 'Shopper DNA is not enabled for your US merchant accounts. Enabling it could improve fraud detection by 25% in the US market.', metrics: [{ label: 'Expected fraud reduction', value: '-25%' }, { label: 'Implementation time', value: '~2 hours' }] },
  { id: 'REC05', title: 'Add velocity check for email', category: 'Rules', impact: 'Medium', effort: 'Low', profile: 'Low-Risk Markets', status: 'active', description: 'Adding a velocity check for email (max 10 attempts per 24h) could prevent 8% of fraud attempts in your Low-Risk Markets profile.' },
  { id: 'REC06', title: 'Network signals integration', category: 'Enhancement', impact: 'High', effort: 'Low', profile: 'Default Action Based', status: 'implemented', description: 'Network signals have been enabled and are contributing to fraud prevention.' },
  { id: 'REC07', title: 'Reduced review threshold', category: 'Threshold', impact: 'Medium', effort: 'Low', profile: 'Default Action Based', status: 'implemented', description: 'Review threshold was lowered from 70 to 60, catching an additional 5% of risky transactions.' },
  { id: 'REC08', title: 'Deprecated rules removed', category: 'Cleanup', impact: 'Low', effort: 'Low', profile: 'Legacy Score Profile', status: 'dismissed', description: 'Recommendation to remove deprecated rules was dismissed as they are needed for audit purposes.' },
];

const filteredRecs = computed(() => {
  const statusMap = ['active', 'implemented', 'dismissed'];
  return recommendations.filter(r => r.status === statusMap[activeTab.value]);
});

type TagVariant = 'blue' | 'green' | 'grey' | 'orange' | 'red' | 'white';

function categoryVariant(category: string): TagVariant {
  const map: Record<string, TagVariant> = { Automation: 'blue', Threshold: 'orange', Cleanup: 'grey', Enhancement: 'green', Rules: 'blue' };
  return map[category] || 'grey';
}
</script>

<style lang="scss" scoped>
.rec {
  &__header {
    display: flex;
    align-items: center;
    gap: var(--b-spacer-040);
  }

  &__meta {
    display: flex;
    gap: var(--b-spacer-090);
    font-size: var(--b-text-body-font-size);
    color: var(--b-color-text-secondary);
  }

  &__desc {
    font-size: var(--b-text-body-font-size);
    color: var(--b-color-text-secondary);
    margin: 0 0 var(--b-spacer-060);
  }
}
</style>
