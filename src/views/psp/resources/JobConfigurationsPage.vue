<template>
  <div>
    <bento-header title="Job Configurations">
      Manage background job schedules and processing configurations
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Job Schedules
          <template #description>View and modify the schedule and parameters for all platform background jobs</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Job Execution History
          <template #description>Recent job runs with status, duration, and error details</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
