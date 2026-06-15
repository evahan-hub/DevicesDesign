<template>
  <div>
    <bento-header title="Alerts">
      View and manage finance monitoring alerts
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Active Alerts
          <template #description>All currently firing finance alerts requiring attention</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Alert History
          <template #description>Historical log of all triggered alerts and their resolution status</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
