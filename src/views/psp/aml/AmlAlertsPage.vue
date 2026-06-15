<template>
  <div>
    <bento-header title="AML Alerts">
      Review and manage anti-money laundering alerts
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Open Alerts
          <template #description>AML alerts requiring review and disposition by the compliance team</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Alert Queue
          <template #description>Prioritized queue of AML alerts sorted by risk score and age</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Alert History
          <template #description>Completed alerts with disposition outcomes and analyst notes</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
