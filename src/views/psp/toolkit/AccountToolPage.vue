<template>
  <div>
    <bento-header title="Account Tool">
      Internal account management and diagnostic tool
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Account Search
          <template #description>Search and view detailed account data for internal debugging and support</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Account Actions
          <template #description>Perform administrative actions on merchant accounts with full audit logging</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
