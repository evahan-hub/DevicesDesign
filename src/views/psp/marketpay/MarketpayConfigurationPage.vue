<template>
  <div>
    <bento-header title="Marketplace Configuration">
      Configure marketplace platform settings and integration parameters
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Platform Settings
          <template #description>Core configuration for the marketplace platform including split models and payout rules</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          KYC Configuration
          <template #description>Configure KYC requirements for sub-merchant onboarding</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
