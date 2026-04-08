<template>
  <div>
    <bento-header title="Dynamic 3D Secure">
      Manage 3D Secure authentication settings and rules
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          3D Secure Configuration
          <template #description>Configure 3D Secure authentication rules</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Authentication Rules
          <template #description>Set up dynamic authentication requirements</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Performance Monitoring
          <template #description>Monitor 3D Secure performance and impact</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
