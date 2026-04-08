<template>
  <div>
    <bento-header title="Finance">
      Finance Workspace and Balances Overview
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Finance Workspace
          <template #description>Manage financial operations, balances, and reporting.</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Balances Overview
          <template #description>View company balances and financial summaries.</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Payout Management
          <template #description>Handle payouts and financial transactions.</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
