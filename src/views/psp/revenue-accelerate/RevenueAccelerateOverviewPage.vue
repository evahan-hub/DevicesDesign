<template>
  <div>
    <bento-header title="Revenue Accelerate">
      Optimize authorization rates and maximize revenue recovery
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Performance Dashboard
          <template #description>Overview of authorization rate improvements and revenue uplift from Revenue Accelerate</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Recovery Campaigns
          <template #description>Active campaigns targeting declined transactions for recovery</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Network Tokens
          <template #description>Network tokenization adoption and performance metrics</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
