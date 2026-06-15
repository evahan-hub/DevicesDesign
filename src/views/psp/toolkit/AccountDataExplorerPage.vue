<template>
  <div>
    <bento-header title="Account Data Explorer">
      Explore and query account-level data for internal use
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Data Explorer
          <template #description>Query and browse account data across all data types with filtering and export</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Saved Queries
          <template #description>Manage and reuse saved data queries for common investigative tasks</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
