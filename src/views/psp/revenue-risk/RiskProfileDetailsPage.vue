<template>
  <div>
    <bento-header title="Risk Profile Details">
      View detailed risk profile information and settings
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Profile Overview
          <template #description>View comprehensive risk profile details</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Configuration Details
          <template #description>Access detailed profile configuration settings</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Performance Metrics
          <template #description>View profile performance and effectiveness metrics</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
