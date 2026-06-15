<template>
  <div>
    <bento-header title="Merchant Experiments">
      Manage experiments scoped to specific merchant accounts
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Merchant Overrides
          <template #description>View all merchants enrolled in active experiments with their assigned variants</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Enrollment Management
          <template #description>Add or remove merchants from specific experiment cohorts</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
