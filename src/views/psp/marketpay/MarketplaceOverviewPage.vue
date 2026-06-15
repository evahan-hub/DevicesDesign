<template>
  <div>
    <bento-header title="Marketplace Overview">
      Overview of marketplace activity and sub-merchant portfolio
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Marketplace Summary
          <template #description>Volume metrics, active sub-merchants, and payout overview for the marketplace</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Sub-merchant Health
          <template #description>Sub-merchant compliance and KYC status overview</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
