<template>
  <div>
    <bento-header title="Future Balances">
      View projected balances and upcoming settlements
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Projected Balances
          <template #description>Forecast balance positions based on pending settlements and sweeps</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Upcoming Settlements
          <template #description>View all scheduled and pending settlement amounts by date</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
