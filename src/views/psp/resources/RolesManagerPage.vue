<template>
  <div>
    <bento-header title="Roles Manager">
      Manage IAM roles and permission assignments
    </bento-header>
    <bento-layout class="b-p-090">
      <bento-layout-row>
        <bento-card>
          Custom Roles
          <template #description>Create and manage custom IAM roles with granular permission sets</template>
        </bento-card>
      </bento-layout-row>
      <bento-layout-row>
        <bento-card>
          Role Assignments
          <template #description>View and modify role assignments across users and merchant accounts</template>
        </bento-card>
      </bento-layout-row>
    </bento-layout>
  </div>
</template>

<script lang="ts" setup>
import { BentoHeader, BentoLayout, BentoLayoutRow, BentoCard } from '@adyen/bento-vue2';
</script>
