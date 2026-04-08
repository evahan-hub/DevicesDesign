<template>
  <div>
    <bento-header title="Checkout">
      View checkout performance and optimization insights
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Checkout Analytics
          <template #description>Monitor checkout conversion rates and performance</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Checkout Optimization
          <template #description>View checkout flow optimization opportunities</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Performance Metrics
          <template #description>Track checkout performance indicators</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
