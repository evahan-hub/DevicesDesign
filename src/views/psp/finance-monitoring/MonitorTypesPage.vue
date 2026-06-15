<template>
  <div>
    <bento-header title="Monitor Types">
      Configure and manage finance monitor type definitions
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Monitor Type Definitions
          <template #description>View and edit the configuration templates for each monitor type</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Threshold Templates
          <template #description>Manage reusable threshold and alert templates for monitors</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
