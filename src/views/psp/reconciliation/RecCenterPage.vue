<template>
  <div>
    <bento-header title="Rec Center">
      Central reconciliation workspace and exception management
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Exception Queue
          <template #description>Reconciliation exceptions requiring manual review and resolution</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Period Summaries
          <template #description>Reconciliation completion status by period and entity</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
