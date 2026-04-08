<template>
  <div>
    <bento-header title="Payouts">
      Manage payout transactions and settlements
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Payout Overview
          <template #description>View all payout transactions and their status</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Payout Schedules
          <template #description>Configure and manage payout schedules</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Payout Reports
          <template #description>Generate detailed payout reports and analytics</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
