<template>
  <div>
    <bento-header title="Transaction Rules">
      Configure rules to control payment instrument spending behavior
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Active Rules
          <template #description>View all active transaction rules applied to payment instruments</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Spending Limits
          <template #description>Configure daily, weekly, and monthly spending limits per instrument or group</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Merchant Restrictions
          <template #description>Restrict or allow transactions with specific merchants or MCC codes</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
