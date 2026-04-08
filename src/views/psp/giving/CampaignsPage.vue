<template>
  <div>
    <bento-header title="Campaigns">
      Manage and track giving campaigns and initiatives
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Campaign Management
          <template #description>Manage and monitor giving campaigns</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Campaign Analytics
          <template #description>Track campaign performance and impact</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Campaign Configuration
          <template #description>Set up and configure new campaigns</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
