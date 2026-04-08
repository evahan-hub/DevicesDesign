<template>
  <div>
    <bento-header title="Risk Fields">
      Configure and manage risk assessment fields
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Field Configuration
          <template #description>Configure risk assessment fields and parameters</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Field Validation
          <template #description>Set up field validation rules and checks</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Field Analytics
          <template #description>Analyze field performance and effectiveness</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
