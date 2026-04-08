<template>
  <div>
    <bento-header title="Uplift Overview">
      View and manage revenue uplift opportunities and performance
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Uplift Metrics
          <template #description>Monitor key uplift performance indicators</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Revenue Opportunities
          <template #description>Identify and track revenue enhancement opportunities</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Performance Analysis
          <template #description>Analyze uplift performance trends and patterns</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
