<template>
  <div>
    <bento-header title="Email Templates">
      Manage reusable email templates for merchant communications
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Templates Library
          <template #description>Browse and manage the library of branded email templates</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Template Editor
          <template #description>Create and customize HTML email templates with variable substitution support</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
