<template>
  <div>
    <bento-header title="Capital">
      Manage capital advancement products for Balance Platform
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Capital Overview
          <template #description>Overview of active capital advancements across all account holders</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Eligibility
          <template #description>View account holders eligible for capital advancement offers</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
