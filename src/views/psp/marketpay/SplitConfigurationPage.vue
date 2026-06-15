<template>
  <div>
    <bento-header title="Split Configuration">
      Configure transaction split rules for marketplace payouts
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Split Rules
          <template #description>Define how transaction amounts are split between the platform and sub-merchants</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Fee Configurations
          <template #description>Set platform fees, commission structures, and reserve configurations</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
