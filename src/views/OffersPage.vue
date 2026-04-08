<template>
  <div>
    <bento-header title="Offers">
      Manage promotional offers and discounts
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Active Offers
          <template #description>View and manage currently active promotional offers</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Offer Creation
          <template #description>Create new promotional offers and discount campaigns</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Offer Analytics
          <template #description>Track performance and analytics for your offers</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
