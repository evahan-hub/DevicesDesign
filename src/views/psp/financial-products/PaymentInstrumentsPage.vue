<template>
  <div>
    <bento-header title="Payment Instruments">
      Manage issued payment instruments including cards and bank accounts
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Issued Cards
          <template #description>View and manage issued physical and virtual payment cards</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Bank Accounts
          <template #description>Manage connected bank accounts used as payment instruments</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Instrument Status
          <template #description>Monitor activation, suspension, and closure of payment instruments</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
