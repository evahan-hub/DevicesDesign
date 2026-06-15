<template>
  <div>
    <bento-header title="Tasks">
      View and manage workflow tasks requiring human action
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          My Tasks
          <template #description>Tasks assigned to you or your team requiring action</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          All Tasks
          <template #description>Full view of all open tasks across all workflows and assignees</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
