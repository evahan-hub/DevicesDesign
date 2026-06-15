<template>
  <div>
    <bento-header title="CRR Scope Settings">
      Configure the scope and criteria for Compliance Risk Reviews
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Review Triggers
          <template #description>Configure which events and thresholds trigger a new CRR</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Scope Rules
          <template #description>Define which merchants and account types are in scope for periodic reviews</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
