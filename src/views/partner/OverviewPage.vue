<template>
  <div>
    <bento-header title="Overview">
      Partner program overview and management dashboard
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Partner Metrics
          <template #description>View key partner performance metrics</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Program Overview
          <template #description>Partner program details and benefits</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Performance Analytics
          <template #description>Analyze partner program performance</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
