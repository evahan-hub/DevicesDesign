<template>
  <div>
    <bento-header title="CRR Reviews">
      Manage Compliance Risk Reviews and their outcomes
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Pending Reviews
          <template #description>CRR cases awaiting review assignment or completion</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Review History
          <template #description>Completed reviews with risk scores, decisions, and follow-up actions</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
