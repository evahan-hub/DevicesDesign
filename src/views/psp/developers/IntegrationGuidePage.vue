<template>
  <div>
    <bento-header title="Integration Guide">
      Complete guide for integrating with our platform
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Getting Started
          <template #description>Step-by-step integration instructions</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          API Documentation
          <template #description>Comprehensive API documentation and examples</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Integration Support
          <template #description>Get help with integration issues</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
