<template>
  <div>
    <bento-header title="Tracking Configurations">
      Configure finance tracking rules and data sources
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Tracking Rules
          <template #description>Define what financial data streams and metrics to track</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Data Sources
          <template #description>Connect and configure data sources used for finance monitoring</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
