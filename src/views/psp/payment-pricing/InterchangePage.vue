<template>
  <div>
    <bento-header title="Interchange">
      Manage interchange rate configurations and overrides
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Interchange Rates
          <template #description>Current interchange rate schedules by card type, region, and merchant category</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Rate Overrides
          <template #description>Configure custom interchange rate overrides for specific merchants</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
