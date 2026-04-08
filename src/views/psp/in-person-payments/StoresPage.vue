<template>
  <div>
    <bento-header title="Stores">
      Manage physical store locations and settings
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Store Management
          <template #description>Manage store locations and information</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Store Configuration
          <template #description>Configure store settings and preferences</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Store Analytics
          <template #description>Analyze store performance metrics</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
