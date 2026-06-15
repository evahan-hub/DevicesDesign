<template>
  <div>
    <bento-header title="AML Case Management">
      Manage AML investigation cases and escalations
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Open Cases
          <template #description>Active AML investigations requiring case management and escalation decisions</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Case Assignment
          <template #description>Assign and reassign cases to compliance analysts and teams</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
