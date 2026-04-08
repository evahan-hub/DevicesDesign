<template>
  <div>
    <bento-header title="Merchant Access">
      Manage merchant access and permissions
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Access Management
          <template #description>Manage merchant access permissions</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Permission Configuration
          <template #description>Configure merchant access permissions</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Access Analytics
          <template #description>Monitor merchant access and usage</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
