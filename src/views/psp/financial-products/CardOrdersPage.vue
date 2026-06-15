<template>
  <div>
    <bento-header title="Card Orders">
      Manage physical card orders and delivery tracking
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Active Orders
          <template #description>Card orders currently being processed or in transit</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Order History
          <template #description>Complete history of all card orders with delivery status</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
