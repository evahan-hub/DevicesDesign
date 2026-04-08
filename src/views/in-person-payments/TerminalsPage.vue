<template>
  <div>
    <bento-header title="Terminals">
      Manage payment terminals and hardware
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Terminal Management
          <template #description>Manage payment terminal inventory</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Terminal Configuration
          <template #description>Configure terminal settings and features</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Terminal Monitoring
          <template #description>Monitor terminal status and performance</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
