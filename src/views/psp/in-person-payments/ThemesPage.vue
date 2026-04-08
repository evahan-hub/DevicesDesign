<template>
  <div>
    <bento-header title="Themes">
      Customize terminal themes and user interface
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Theme Management
          <template #description>Manage terminal themes and appearances</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          UI Customization
          <template #description>Customize user interface elements</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Brand Settings
          <template #description>Configure branding and logos</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
