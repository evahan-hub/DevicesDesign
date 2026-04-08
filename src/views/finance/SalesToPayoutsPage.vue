<template>
  <div>
    <bento-header title="Sales to Payouts">
      Track sales and manage payout processes
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Sales Tracking
          <template #description>Monitor sales performance and metrics</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Payout Processing
          <template #description>Manage payout processing and scheduling</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Revenue Analytics
          <template #description>Analyze sales-to-payout conversion metrics</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
