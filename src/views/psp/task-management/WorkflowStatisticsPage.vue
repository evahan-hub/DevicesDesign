<template>
  <div>
    <bento-header title="Workflow Statistics">
      Analytics and performance metrics for workflow execution
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Completion Rates
          <template #description>Workflow completion and SLA compliance rates by workflow type</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Processing Times
          <template #description>Average and percentile processing times per workflow step</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
