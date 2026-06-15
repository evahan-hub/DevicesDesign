<template>
  <div>
    <bento-header title="Recharge Data">
      Manage tokenization recharge data and network token configurations
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Token Registry
          <template #description>View all network tokens and their associated payment instrument data</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Recharge Configuration
          <template #description>Configure automatic recharge rules for expired or updated tokens</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
