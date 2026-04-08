<template>
  <div>
    <bento-header title="Risk Lists">
      Manage and configure risk assessment lists
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          List Management
          <template #description>Manage risk lists and blocklists</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          List Configuration
          <template #description>Configure list rules and parameters</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          List Analytics
          <template #description>Analyze list performance and effectiveness</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
