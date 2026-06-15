<template>
  <div>
    <bento-header title="Simulation Tool">
      Simulate capital advancement scenarios and repayment projections
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Advancement Simulator
          <template #description>Model different advancement amounts and durations to compare costs</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Repayment Projections
          <template #description>Visualize repayment schedules based on projected sales volume</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
