<template>
  <div class="rs">
    <bento-header title="Risk settings" variant="page" />

    <bento-tabs
      :active-tab-index="activeTab"
      @update:active-tab-index="activeTab = $event"
      class="b-margin-top-070"
    >
      <bento-tab v-for="tab in tabs" :key="tab" :title="tab" />
    </bento-tabs>

    <global-settings v-if="activeTab === 0" />
    <shopper-dna-settings v-else-if="activeTab === 1" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BentoHeader, BentoTabs, BentoTab } from '@adyen/bento-vue2';
import GlobalSettings from './views/GlobalSettings.vue';
import ShopperDnaSettings from './views/ShopperDnaSettings.vue';
import { SETTINGS_TABS } from './risk-settings.mock-data';

const tabs = SETTINGS_TABS;
const activeTab = ref(0);
</script>
