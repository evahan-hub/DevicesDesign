<template>
  <div>
    <bento-header title="Performance">
      View and analyze performance metrics and analytics
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Performance Overview
          <template #description>Monitor key performance indicators and metrics</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Analytics Dashboard
          <template #description>Comprehensive analytics and reporting tools</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Performance Trends
          <template #description>Track performance trends over time</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
