<template>
  <div>
    <bento-header title="Pricing Schedules">
      Manage merchant pricing schedules and rate agreements
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Active Schedules
          <template #description>View all current pricing schedules and their associated merchants</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Schedule Templates
          <template #description>Manage reusable pricing schedule templates for faster merchant onboarding</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
