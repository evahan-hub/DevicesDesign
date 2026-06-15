<template>
  <div>
    <bento-header title="Pricing Proposals">
      Create and manage pricing proposals for merchants
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Open Proposals
          <template #description>Pricing proposals pending review or merchant acceptance</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Proposal History
          <template #description>View accepted, rejected, and expired pricing proposals</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
