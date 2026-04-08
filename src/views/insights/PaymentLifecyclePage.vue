<template>
  <div>
    <bento-header title="Payment Lifecycle">
      View payment lifecycle analytics and insights
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Lifecycle Analytics
          <template #description>Monitor payment lifecycle performance metrics</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Process Optimization
          <template #description>View payment process optimization opportunities</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Lifecycle Tracking
          <template #description>Track payment lifecycle stages and performance</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
