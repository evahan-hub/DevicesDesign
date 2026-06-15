<template>
  <div>
    <bento-header title="Matching Screen">
      Match and reconcile transactions across data sources
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Unmatched Items
          <template #description>Transactions and records that have not yet been matched to a counterpart</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Match Proposals
          <template #description>Suggested matches for review and confirmation by the reconciliation team</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Reconciliation Status
          <template #description>Overall reconciliation health by period and account</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
