<template>
  <div class="pd">
    <bento-header :title="profile.profileName" variant="page">
      <template #default>
        <div class="pd__title">
          {{ profile.profileName }}
          <bento-tag v-if="profile.premium" label="Premium" variant="blue" />
          <bento-tag :label="profile.profileType" :variant="profile.actionBased ? 'blue' : 'grey'" />
        </div>
      </template>
      <template #actions>
        <bento-button variant="secondary" @click="console.log('Duplicate')">
          <template #iconLeft>
            <copy-icon svg-title="Duplicate" />
          </template>
          Duplicate
        </bento-button>
        <bento-button variant="secondary" @click="console.log('Edit')">
          <template #iconLeft>
            <edit-icon svg-title="Edit" />
          </template>
          Edit
        </bento-button>
      </template>
    </bento-header>

    <bento-tabs
      :active-tab-index="activeTab"
      @update:active-tab-index="activeTab = $event"
      class="b-margin-top-070"
    >
      <bento-tab v-for="tab in tabs" :key="tab" :title="tab" />
    </bento-tabs>

    <profile-overview v-if="activeTab === 0" />
    <risk-rules v-else-if="activeTab === 1" />
    <automated-risk v-else-if="activeTab === 2" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BentoHeader, BentoTabs, BentoTab, BentoButton, BentoTag } from '@adyen/bento-vue2';
import CopyIcon from '@adyen/ui-assets-icons-16/vue/copy';
import EditIcon from '@adyen/ui-assets-icons-16/vue/edit-1';

import ProfileOverview from './views/ProfileOverview.vue';
import RiskRules from './views/RiskRules.vue';
import AutomatedRisk from './views/AutomatedRisk.vue';
import { MOCK_PROFILE, PROFILE_TABS } from './profile-details.mock-data';

const profile = MOCK_PROFILE;
const tabs = PROFILE_TABS;
const activeTab = ref(0);
</script>

<style lang="scss" scoped>
.pd {
  &__title {
    display: flex;
    align-items: center;
    gap: var(--b-spacer-060);
  }
}
</style>
