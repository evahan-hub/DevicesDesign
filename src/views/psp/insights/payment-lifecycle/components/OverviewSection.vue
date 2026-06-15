<template>
  <bento-summary-grid v-if="items.length">
    <template v-for="(item, index) in items" #[`cell-1-${index+1}`]>
      <bento-summary-grid-item-custom :key="item.key" :title="item.label" class="grid-item">
        <div class="grid-item__content">
          <info-icon
            role="img"
            class="annotation-icon"
          />
          <div class="grid-item__value">
            <bento-typography variant="title" medium>
              {{ item.value }}
            </bento-typography>
          </div>
          <bento-typography
            v-if="item.count"
            variant="caption"
            stronger
          >
            {{ item.count }}
          </bento-typography>
        </div>
      </bento-summary-grid-item-custom>
    </template>
  </bento-summary-grid>
</template>

<script lang="ts" setup>
import {
  BentoSummaryGrid,
  BentoSummaryGridItemCustom,
  BentoTypography,
} from '@adyen/bento-vue2';
import InfoIcon from '@adyen/ui-assets-icons-16/vue/info';

export interface OverviewItem {
  key: string;
  label: string;
  value: string;
  count?: string;
}

defineProps<{
  items: OverviewItem[];
}>();
</script>

<style lang="scss" scoped>
.grid-item {
  position: relative;

  &__content {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__value {
    display: flex;
    align-items: center;
  }

  .annotation-icon {
    position: absolute;
    top: var(--b-spacer-070);
    right: var(--b-spacer-070);
    opacity: 0;
    transition: opacity var(--b-animation-duration-moderate);
    cursor: pointer;
  }

  &:hover {
    .annotation-icon {
      opacity: 1;
    }
  }
}
</style>
