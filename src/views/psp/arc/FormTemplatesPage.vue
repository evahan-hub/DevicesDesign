<template>
  <div>
    <bento-header title="Form Templates">
      Manage form templates used in compliance and onboarding workflows
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Template Library
          <template #description>Browse all available form templates for compliance, onboarding, and review processes</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Template Editor
          <template #description>Create and modify form templates with conditional logic and validation rules</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
