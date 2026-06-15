<template>
  <div>
    <bento-header title="Signals">
      Configure and monitor operational signals and triggers
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Active Signals
          <template #description>Operational signals currently firing with threshold and impact information</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Signal Configuration
          <template #description>Define signal thresholds, notification channels, and escalation paths</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
