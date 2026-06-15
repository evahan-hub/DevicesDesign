<template>
  <div>
    <bento-header title="Balance Accounts">
      View and manage Balance Platform balance accounts
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Balance Accounts Overview
          <template #description>All balance accounts with current balances, limits, and transaction history</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Fund Transfers
          <template #description>Initiate and review internal transfers between balance accounts</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
