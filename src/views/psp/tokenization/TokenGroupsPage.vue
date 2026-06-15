<template>
  <div>
    <bento-header title="Token Groups">
      Manage groups of network tokens for shared authorization logic
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Token Groups
          <template #description>Create and manage token groups to apply shared authorization rules across tokens</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Group Linking
          <template #description>Link tokens to groups and manage cross-group token sharing policies</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
