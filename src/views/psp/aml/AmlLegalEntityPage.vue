<template>
  <div>
    <bento-header title="AML Legal Entity">
      Manage legal entity-level AML compliance and screening
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Legal Entity Screening
          <template #description>Screening results for all monitored legal entities against sanctions and watch lists</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Beneficial Owners
          <template #description>Beneficial owner records and UBO compliance status</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
