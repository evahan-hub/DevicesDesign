<template>
  <div class="data-recency">
    <bento-tag label="Last updated: more than 1 week ago" />
    <bento-info-icon tooltip-text="Data may be delayed due to processing times" />
  </div>
</template>

<script lang="ts" setup>
import { BentoTag, BentoInfoIcon } from '@adyen/bento-vue2';
</script>

<style lang="scss" scoped>
.data-recency {
  display: flex;
  align-items: center;
  gap: var(--b-spacer-040);
}
</style>
