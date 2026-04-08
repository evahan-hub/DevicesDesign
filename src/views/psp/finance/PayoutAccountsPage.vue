<template>
  <div>
    <bento-header title="Payout Accounts">
      Manage payout accounts and banking information
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Account Management
          <template #description>Manage payout accounts and banking details</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Account Verification
          <template #description>Verify and validate payout accounts</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Transaction History
          <template #description>View payout account transaction history</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
