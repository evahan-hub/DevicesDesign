<template>
  <div>
    <bento-header title="Target Balancing">
      Manage cash management and target balance configurations
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Balance Targets
          <template #description>Set and monitor target balance thresholds for each account</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Sweep Rules
          <template #description>Configure automatic fund sweeps to maintain target balances</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Funding History
          <template #description>Review historical sweep and funding transactions</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
