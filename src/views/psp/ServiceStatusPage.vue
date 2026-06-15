<template>
  <div>
    <bento-header title="Service Status">
      Monitor system health and service availability
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          System Health
          <template #description>Real-time overview of all Adyen platform service statuses</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Incidents
          <template #description>Current and recent incidents affecting platform availability</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Maintenance Windows
          <template #description>Scheduled maintenance events and their impact on services</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
