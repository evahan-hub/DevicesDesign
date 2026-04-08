<template>
  <div>
    <bento-header title="Reporting Manager">
      Manage financial reporting and analytics
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Report Generation
          <template #description>Generate financial reports and statements</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Report Scheduling
          <template #description>Schedule automated report generation</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Report Analytics
          <template #description>Analyze financial reporting metrics</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
