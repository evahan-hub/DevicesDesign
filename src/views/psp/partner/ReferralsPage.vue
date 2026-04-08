<template>
  <div>
    <bento-header title="Referrals">
      Manage partner referrals and referral programs
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Referral Management
          <template #description>Manage and track partner referrals</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Referral Analytics
          <template #description>Analyze referral performance and metrics</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Referral Configuration
          <template #description>Configure referral programs and settings</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
