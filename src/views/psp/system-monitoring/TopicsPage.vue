<template>
  <div>
    <bento-header title="Topics">
      Monitor Kafka topics and message queue health
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Topic Overview
          <template #description>Status and throughput metrics for all monitored Kafka topics</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Consumer Lag
          <template #description>Consumer group lag tracking and alerting configuration</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
