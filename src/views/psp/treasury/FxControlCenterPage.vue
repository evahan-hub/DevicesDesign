<template>
  <div>
    <bento-header title="FX Control Center">
      Monitor and manage foreign exchange positions and controls
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          FX Positions
          <template #description>View and manage current foreign exchange positions across all currencies</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          FX Controls
          <template #description>Configure FX conversion rules, limits, and automatic hedging settings</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          FX Rates
          <template #description>View current and historical exchange rates used for settlement</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
