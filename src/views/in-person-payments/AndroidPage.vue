<template>
  <div>
    <bento-header title="Android">
      Manage Android-based payment terminals and applications
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Android Terminal Management
          <template #description>Manage Android-based terminal devices</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          App Configuration
          <template #description>Configure Android payment applications</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          System Updates
          <template #description>Manage Android system updates and patches</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
