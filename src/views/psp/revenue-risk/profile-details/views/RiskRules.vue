<template>
  <div class="rr b-margin-top-090">
    <div class="rr__toolbar b-margin-bottom-070">
      <bento-filter-bar
        :config="filterConfig"
        :filter-values-object="filterValues"
        @update:filter-values-object="filterValues = $event"
      />
      <bento-button @click="console.log('Create rule')">
        <template #iconLeft>
          <add-icon svg-title="Create" />
        </template>
        Create rule
      </bento-button>
    </div>

    <div v-for="cat in groupedRules" :key="cat.key" class="rr__category b-margin-bottom-090">
      <bento-typography variant="title" class="b-margin-bottom-060">
        {{ cat.label }} ({{ cat.rules.length }})
      </bento-typography>

      <bento-data-grid
        :columns="columns"
        :data="cat.rules"
        fit-content
        :pagination="false"
      >
        <template #item-status="{ item }">
          <bento-status :variant="item.status === 'enabled' ? 'green' : 'grey'">
            {{ item.status === 'enabled' ? 'Enabled' : 'Disabled' }}
          </bento-status>
        </template>
        <template #item-action="{ item }">
          <bento-tag
            :label="item.action"
            :variant="actionVariant(item.action)"
          />
        </template>
        <template #item-triggered="{ item }">
          {{ formatNumber(item.triggered ?? 0) }}
        </template>
        <template #item-blocked="{ item }">
          {{ formatNumber(item.blocked ?? 0) }}
        </template>
      </bento-data-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import {
  BentoDataGrid, BentoButton, BentoFilterBar,
  BentoTypography, BentoStatus, BentoTag,
  BentoFilterItemType,
  BentoColumnOverflow,
} from '@adyen/bento-vue2';
import type { BentoColumn, BentoFilterBarModel, BentoFilterValueObject } from '@adyen/bento-vue2';
import AddIcon from '@adyen/ui-assets-icons-16/vue/plus';
import { MOCK_RULES, RULE_CATEGORIES, formatNumber } from '../profile-details.mock-data';
import type { RuleAction } from '../profile-details.types';

const filterValues = ref<BentoFilterValueObject>({});

const filterConfig: BentoFilterBarModel = [
  {
    field: 'category',
    label: 'Category',
    type: BentoFilterItemType.SELECT,
    visible: true,
    options: {
      multiple: true,
      listboxItems: RULE_CATEGORIES.map(c => ({ label: c.label, value: c.key })),
    },
  },
  {
    field: 'status',
    label: 'Status',
    type: BentoFilterItemType.SELECT,
    visible: true,
    options: {
      listboxItems: [
        { label: 'Enabled', value: 'enabled' },
        { label: 'Disabled', value: 'disabled' },
      ],
    },
  },
  {
    field: 'action',
    label: 'Action',
    type: BentoFilterItemType.SELECT,
    visible: true,
    options: {
      multiple: true,
      listboxItems: [
        { label: 'Allow', value: 'Allow' },
        { label: 'Block', value: 'Block' },
        { label: 'Review', value: 'Review' },
        { label: 'Trust', value: 'Trust' },
        { label: 'Score only', value: 'Score only' },
      ],
    },
  },
];

const columns = ref<BentoColumn[]>([
  { field: 'name', label: 'Rule name', minWidth: 260, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'status', label: 'Status', width: 120 },
  { field: 'action', label: 'Action', width: 120 },
  { field: 'description', label: 'Description', minWidth: 300, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'triggered', label: 'Triggered', width: 120 },
  { field: 'blocked', label: 'Blocked', width: 120 },
  { field: 'lastModified', label: 'Last modified', width: 160 },
]);

const filteredRules = computed(() => {
  return MOCK_RULES.filter(rule => {
    const fv = filterValues.value;
    if (fv.category) {
      const cats = Array.isArray(fv.category) ? fv.category : [fv.category];
      if (cats.length > 0 && !cats.includes(rule.category)) return false;
    }
    if (fv.status) {
      const statuses = Array.isArray(fv.status) ? fv.status : [fv.status];
      if (statuses.length > 0 && !statuses.includes(rule.status)) return false;
    }
    if (fv.action) {
      const actions = Array.isArray(fv.action) ? fv.action : [fv.action];
      if (actions.length > 0 && !actions.includes(rule.action)) return false;
    }
    return true;
  });
});

const groupedRules = computed(() => {
  return RULE_CATEGORIES
    .map(cat => ({
      ...cat,
      rules: filteredRules.value.filter(r => r.category === cat.key),
    }))
    .filter(cat => cat.rules.length > 0);
});

type TagVariant = 'blue' | 'green' | 'grey' | 'orange' | 'red' | 'white';

function actionVariant(action: RuleAction): TagVariant {
  const map: Record<string, TagVariant> = {
    Block: 'red',
    Review: 'orange',
    Allow: 'green',
    Trust: 'blue',
    'Score only': 'grey',
  };
  return map[action] || 'grey';
}
</script>

<style lang="scss" scoped>
.rr {
  &__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--b-spacer-070);
  }

  &__category {
    border-bottom: 1px solid var(--b-color-border-secondary);
    padding-bottom: var(--b-spacer-090);
  }
}
</style>
