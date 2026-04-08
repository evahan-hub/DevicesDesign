<template>
  <div>
    <bento-header title="Payment Links">
      Create and manage payment links for your customers
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Link Management
          <template #description>Create and manage payment links</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Link Analytics
          <template #description>Track payment link performance and usage</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Link Configuration
          <template #description>Configure payment link settings and options</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
