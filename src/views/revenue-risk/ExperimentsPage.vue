<template>
  <div>
    <bento-header title="Experiments">
      Manage and monitor risk experiments and A/B tests
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Active Experiments
          <template #description>View and manage currently running experiments</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Experiment Results
          <template #description>Analyze experiment performance and results</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Experiment Configuration
          <template #description>Set up and configure new experiments</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
