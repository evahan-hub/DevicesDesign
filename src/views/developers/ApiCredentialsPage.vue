<template>
  <div>
    <bento-header title="API Credentials">
      Manage API keys and authentication credentials
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          API Keys
          <template #description>Manage and rotate API keys</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Authentication
          <template #description>Configure authentication methods</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Security Settings
          <template #description>Manage API security and access controls</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
