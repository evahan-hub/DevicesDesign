<template>
  <div>
    <bento-header title="Non-Transactional Fees">
      Manage fees not tied to individual payment transactions
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Monthly Fees
          <template #description>Configure recurring monthly fees such as minimum processing fees and platform fees</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Setup & One-time Fees
          <template #description>Manage one-time fees for onboarding, hardware, and integration services</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
