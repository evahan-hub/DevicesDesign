<template>
  <div>
    <bento-header title="Monitors">
      View and manage active finance monitors
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Active Monitors
          <template #description>List of all currently active finance monitors and their status</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Monitor Configuration
          <template #description>Create and edit finance monitors with custom thresholds and triggers</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
