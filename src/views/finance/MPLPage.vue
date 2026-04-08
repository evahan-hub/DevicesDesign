<template>
  <div>
    <bento-header title="MPL">
      Manage Multi-Platform Logistics and operations
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          MPL Operations
          <template #description>Manage multi-platform logistics operations</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Platform Integration
          <template #description>Configure platform integrations and settings</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Performance Tracking
          <template #description>Monitor MPL performance metrics</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
