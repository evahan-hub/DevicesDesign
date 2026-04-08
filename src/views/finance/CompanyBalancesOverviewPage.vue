<template>
  <div>
    <bento-header title="Company Balances Overview">
      View company-wide balances and financial overview
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Company Balances
          <template #description>View overall company balance status</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Department Balances
          <template #description>Track balances by department and division</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Financial Reporting
          <template #description>Generate company financial reports</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
