<template>
  <div>
    <bento-header title="Payment Batches">
      Manage batch payment processing operations
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Active Batches
          <template #description>Payment batches currently being processed or awaiting submission</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Batch History
          <template #description>Historical batch operations with processing status and file details</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
