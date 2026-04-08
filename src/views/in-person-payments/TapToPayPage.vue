<template>
  <div>
    <bento-header title="Tap to Pay & Card Reader">
      Manage tap-to-pay functionality and card readers
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Tap to Pay Setup
          <template #description>Configure tap-to-pay payment options</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Card Reader Management
          <template #description>Manage card reader devices and settings</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Contactless Payments
          <template #description>Monitor contactless payment performance</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
