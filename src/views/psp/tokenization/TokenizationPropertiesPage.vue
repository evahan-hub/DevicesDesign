<template>
  <div>
    <bento-header title="Tokenization Properties">
      Configure global tokenization settings and network token properties
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Network Token Settings
          <template #description>Configure lifecycle management settings for network tokens</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Token Eligibility Rules
          <template #description>Define rules for which transactions are eligible for network tokenization</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
