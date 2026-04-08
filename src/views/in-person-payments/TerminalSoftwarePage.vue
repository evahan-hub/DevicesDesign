<template>
  <div>
    <bento-header title="Terminal Software">
      Manage terminal software and firmware updates
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Software Management
          <template #description>Manage terminal software installations</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Firmware Updates
          <template #description>Update terminal firmware and drivers</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Version Control
          <template #description>Track software versions and compatibility</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
