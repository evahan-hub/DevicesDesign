<template>
  <div>
    <bento-header title="Token Regions">
      Configure geographic regions for token routing and processing
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Region Definitions
          <template #description>Define geographic regions for network token routing preferences</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Token-Region Assignments
          <template #description>Manage which tokens are assigned to which processing regions</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
