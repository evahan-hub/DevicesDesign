<template>
  <div>
    <bento-header title="Score">
      View and manage account scoring and risk assessment
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Score Overview
          <template #description>View account scores and risk assessments</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Score History
          <template #description>Track score changes and trends over time</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Score Configuration
          <template #description>Configure scoring rules and parameters</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
