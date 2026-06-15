<template>
  <div>
    <bento-header title="Dev Ops">
      Internal DevOps tools and configuration management
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Service Configuration
          <template #description>View and manage service configurations across all environments</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Deployment Status
          <template #description>Track active deployments and rollback capabilities</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
