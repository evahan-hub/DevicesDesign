<template>
  <div>
    <bento-header title="Fee Framework Explorer">
      Explore and configure payment fee frameworks and structures
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Fee Frameworks
          <template #description>View all configured fee frameworks and their applicable rules</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Fee Components
          <template #description>Breakdown of interchange, processing, and scheme fees per transaction type</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Simulation Tool
          <template #description>Simulate fees for hypothetical transactions to validate framework configuration</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
