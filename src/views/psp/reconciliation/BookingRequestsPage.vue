<template>
  <div>
    <bento-header title="Booking Requests">
      Manage manual booking requests for reconciliation
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Pending Requests
          <template #description>Booking requests awaiting approval and processing</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Request History
          <template #description>History of processed booking requests with audit trail</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
