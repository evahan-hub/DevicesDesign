<template>
  <div>
    <bento-header title="Experimentation Platform">
      Run and analyze A/B tests and feature experiments
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Active Experiments
          <template #description>Experiments currently running with live traffic allocation</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Experiment Results
          <template #description>Statistical analysis and outcomes for completed experiments</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
