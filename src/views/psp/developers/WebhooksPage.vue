<template>
  <div>
    <bento-header title="Webhooks">
      Configure and manage webhook endpoints and events
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Webhook Configuration
          <template #description>Set up and configure webhook endpoints</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Event Management
          <template #description>Manage webhook events and subscriptions</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Webhook Logs
          <template #description>View webhook delivery logs and status</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
