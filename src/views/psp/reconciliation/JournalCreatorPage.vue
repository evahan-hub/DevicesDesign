<template>
  <div>
    <bento-header title="Journal Creator">
      Create and manage accounting journal entries
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          New Journal Entry
          <template #description>Create manual journal entries for reconciliation adjustments</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Journal Queue
          <template #description>Journal entries pending posting with approval status</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
