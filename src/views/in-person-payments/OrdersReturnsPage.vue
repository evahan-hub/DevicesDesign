<template>
  <div>
    <bento-header title="Orders and Returns">
      Manage in-person orders and customer returns
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Order Management
          <template #description>Process and track in-person orders</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Returns Processing
          <template #description>Handle customer returns and refunds</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Order Analytics
          <template #description>Analyze order trends and performance</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
