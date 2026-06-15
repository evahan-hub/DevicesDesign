<template>
  <div>
    <bento-header title="System Checks">
      Automated health checks and validation results
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Check Results
          <template #description>Current status of all automated system checks across services</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Check Configuration
          <template #description>Manage and schedule automated health check routines</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
