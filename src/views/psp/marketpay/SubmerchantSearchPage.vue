<template>
  <div>
    <bento-header title="Sub-merchant Search">
      Search and manage sub-merchant accounts
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Sub-merchant Directory
          <template #description>Search and filter sub-merchant accounts by name, status, or tier</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Sub-merchant Details
          <template #description>View detailed profiles, transaction history, and payout records for sub-merchants</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
