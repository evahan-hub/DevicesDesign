<template>
  <div>
    <bento-header title="Features">
      Manage feature flags and feature rollout configuration
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Feature Flags
          <template #description>Enable or disable feature flags across platforms and merchant segments</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Rollout Configuration
          <template #description>Configure gradual rollout percentages and targeting rules for features</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
