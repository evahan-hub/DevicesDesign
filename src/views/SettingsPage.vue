<template>
  <div>
    <bento-header title="Settings">
      Manage your account settings and preferences
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Account Settings
          <template #description>Manage your account information and security</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Preferences
          <template #description>Configure your application preferences</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          API Configuration
          <template #description>Set up API keys and integration settings</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
