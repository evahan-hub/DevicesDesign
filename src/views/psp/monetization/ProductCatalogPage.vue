<template>
  <div>
    <bento-header title="Product Catalog">
      Manage the product catalog for billing and pricing
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Products
          <template #description>View all products available for pricing configuration and merchant assignment</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Product Groups
          <template #description>Organize products into groups for simplified pricing management</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
