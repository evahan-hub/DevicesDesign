<template>
  <div>
    <bento-header title="Settings">
      Configure risk management settings and preferences
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          General Settings
          <template #description>Configure general risk management settings</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Notification Settings
          <template #description>Set up risk notifications and alerts</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Integration Settings
          <template #description>Configure third-party integrations</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
