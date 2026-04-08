<template>
  <div>
    <bento-header title="Balances Overview">
      View and manage account balances and financial overview
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Account Balances
          <template #description>View current account balances and status</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Balance History
          <template #description>Track balance changes and transactions</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Balance Analytics
          <template #description>Analyze balance trends and patterns</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
