<template>
  <div>
    <bento-header title="Monitoring Overview">
      System-wide monitoring dashboard for platform health
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Platform Health
          <template #description>High-level overview of all monitored services and their operational status</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Recent Incidents
          <template #description>Summary of incidents from the past 24 hours with impact assessment</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          SLA Tracking
          <template #description>Service level agreement compliance metrics and breach tracking</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
