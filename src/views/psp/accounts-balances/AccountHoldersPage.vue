<template>
  <div>
    <bento-header title="Account Holders">
      Manage Balance Platform account holders and their profiles
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Account Holder List
          <template #description>View all account holders with their KYC status and account details</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Onboarding Status
          <template #description>Track account holder onboarding progress and pending verifications</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
