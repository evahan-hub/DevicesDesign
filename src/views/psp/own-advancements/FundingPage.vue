<template>
  <div>
    <bento-header title="Funding">
      Manage capital advancement funding configurations
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Funding Settings
          <template #description>Configure funding sources, limits, and eligibility criteria for advancements</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Active Advancements
          <template #description>Overview of outstanding capital advancements and repayment progress</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
