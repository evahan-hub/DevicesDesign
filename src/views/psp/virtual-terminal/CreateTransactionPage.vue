<template>
  <div>
    <bento-header title="Virtual Terminal">
      Process card-not-present transactions manually
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          New Transaction
          <template #description>Enter card details and amount to manually process a payment</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Recent Transactions
          <template #description>History of transactions processed through the virtual terminal</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
