<template>
  <div class="gs b-margin-top-090">
    <div v-for="cat in categories" :key="cat.key" class="gs__category b-margin-bottom-090">
      <bento-typography variant="title" class="b-margin-bottom-060">
        {{ cat.label }}
      </bento-typography>

      <bento-card>
        <template #content>
          <bento-structured-list>
            <bento-structured-list-item
              v-for="setting in getSettingsByCategory(cat.key)"
              :key="setting.id"
              :label="setting.label"
            >
              <template #description>{{ setting.description }}</template>

              <bento-toggle
                v-if="setting.type === 'toggle'"
                :checked="Boolean(setting.value)"
                @update:checked="setting.value = $event"
              />
              <span v-else-if="setting.type === 'select'">
                {{ getSelectLabel(setting) }}
              </span>
              <span v-else-if="setting.type === 'input'">
                {{ setting.value }}
              </span>
            </bento-structured-list-item>
          </bento-structured-list>
        </template>
      </bento-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  BentoCard, BentoStructuredList, BentoStructuredListItem,
  BentoTypography, BentoToggle,
} from '@adyen/bento-vue2';
import { MOCK_SETTINGS, SETTING_CATEGORIES } from '../risk-settings.mock-data';

const categories = SETTING_CATEGORIES;
const settings = MOCK_SETTINGS;

function getSettingsByCategory(category: string) {
  return settings.filter(s => s.category === category);
}

function getSelectLabel(setting: typeof settings[0]) {
  const opt = (setting.options || []).find(o => o.value === setting.value);
  return opt ? opt.label : setting.value;
}
</script>

<style lang="scss" scoped>
.gs {
  &__category {
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
