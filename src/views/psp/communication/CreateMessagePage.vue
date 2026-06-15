<template>
  <div>
    <bento-header title="Create New Message">
      Compose and send communications to merchants
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Message Composer
          <template #description>Create targeted messages for specific merchants or merchant groups</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Audience Selection
          <template #description>Select recipients by merchant account, country, or product type</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
