<template>
  <div>
    <bento-header title="Sent Messages">
      Review previously sent communications
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Message Log
          <template #description>History of all messages sent to merchants with delivery and open rate statistics</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Scheduled Messages
          <template #description>Messages queued for future delivery</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
