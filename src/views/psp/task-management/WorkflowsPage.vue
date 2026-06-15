<template>
  <div>
    <bento-header title="Workflows">
      Manage and monitor automated business workflows
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Active Workflows
          <template #description>Currently executing workflow instances with their current state</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Workflow Definitions
          <template #description>BPMN workflow definitions available for instantiation</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
