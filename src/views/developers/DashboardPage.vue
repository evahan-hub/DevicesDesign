<template>
  <div>
    <bento-header title="Dashboard">
      Developer dashboard with analytics and tools
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          API Usage
          <template #description>Monitor API usage and performance metrics</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Integration Status
          <template #description>View integration status and health checks</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Developer Tools
          <template #description>Access developer tools and utilities</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
