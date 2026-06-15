<template>
  <div>
    <bento-header title="Issuing Disputes">
      Manage disputes for issued payment instruments
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Open Disputes
          <template #description>Cardholder disputes requiring review and action</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Dispute History
          <template #description>Closed and resolved issuing disputes with outcomes</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
