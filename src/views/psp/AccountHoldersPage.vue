<template>
  <div>
    <bento-header title="Account Holders">
      Manage account holder information and configurations
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Account Holder List
          <template #description>View and manage all account holders</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Account Details
          <template #description>Access detailed account holder information</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Account Configuration
          <template #description>Configure account settings and preferences</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
