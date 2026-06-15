<template>
  <div>
    <bento-header title="Revenue Accelerate Settings">
      Configure optimization features and recovery preferences
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Retry Logic
          <template #description>Configure intelligent retry rules for soft-declined transactions</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Tokenization Preferences
          <template #description>Set network tokenization preferences by card scheme and geography</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
