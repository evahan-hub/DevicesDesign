<template>
  <div>
    <bento-header title="Secrets Manager">
      Securely manage credentials and sensitive configuration values
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Secrets Vault
          <template #description>View and manage encrypted secrets used across platform services</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Access Audit
          <template #description>Audit log of all secret access and modification events</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
