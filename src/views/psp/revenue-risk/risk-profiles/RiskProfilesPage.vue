<template>
  <div class="rp page page--locked page--data-grid-template">
    <bento-data-grid-template
      class="content-section--flex"
      :header="headerConfig"
    >
      <template #header-actions>
        <bento-button @click="console.log('Create profile')">
          <template #iconLeft>
            <add-icon svg-title="Create" />
          </template>
          Create new profile
        </bento-button>
      </template>

      <template #tab-1>
        <bento-data-grid
          :columns="columns"
          :data="profiles"
          fit-content
          :pagination="pagination"
          @update:columns="columns = $event"
          @update:pagination="pagination = $event"
        >
          <template #item-profileName="{ item }">
            <div class="rp__name">
              <bento-link :to="{ name: 'risk-profile-details' }" :title="item.profileName">
                {{ item.profileName }}
              </bento-link>
              <bento-tag v-if="item.defaultProfile" label="Default" variant="blue" size="small" />
              <bento-tag v-if="item.deprecated" label="Deprecated" variant="grey" size="small" />
            </div>
          </template>

          <template #item-profileType="{ item }">
            <bento-tag
              :label="item.profileType"
              :variant="item.actionBased ? 'blue' : 'grey'"
              size="small"
            />
          </template>

          <template #item-premium="{ item }">
            <bento-tag v-if="item.premium" label="Premium" variant="blue" size="small" />
            <span v-else>-</span>
          </template>

          <template #item-runningExperiment="{ item }">
            <bento-status v-if="item.runningExperiment" variant="blue">Running</bento-status>
            <span v-else>-</span>
          </template>

          <template #item-actions>
            <div class="rp__actions">
              <bento-button variant="tertiary" size="small" :condensed="true" @click="console.log('Duplicate')">
                <template #iconLeft>
                  <copy-icon svg-title="Duplicate" />
                </template>
              </bento-button>
              <bento-button variant="tertiary" size="small" :condensed="true" @click="console.log('Delete')">
                <template #iconLeft>
                  <delete-icon svg-title="Delete" />
                </template>
              </bento-button>
            </div>
          </template>
        </bento-data-grid>
      </template>
    </bento-data-grid-template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  BentoButton, BentoDataGrid, BentoDataGridTemplate,
  BentoLink, BentoTag, BentoStatus,
} from '@adyen/bento-vue2';
import type { BentoColumn } from '@adyen/bento-vue2';
import AddIcon from '@adyen/ui-assets-icons-16/vue/plus';
import CopyIcon from '@adyen/ui-assets-icons-16/vue/copy';
import DeleteIcon from '@adyen/ui-assets-icons-16/vue/bin';
import { MOCK_PROFILES } from './risk-profiles.mock-data';

const headerConfig = { title: 'Risk profiles' };
const profiles = MOCK_PROFILES;
const pagination = ref({ page: 1, size: 20, totalCount: profiles.length, pageSizes: [10, 20, 50] });

const columns = ref<BentoColumn[]>([
  { field: 'profileName', label: 'Profile name', minWidth: 260 },
  { field: 'profileType', label: 'Type', width: 140 },
  { field: 'premium', label: 'Tier', width: 100 },
  { field: 'assignedMerchantCodes', label: 'Assigned merchants', width: 160 },
  { field: 'runningExperiment', label: 'Experiment', width: 120 },
  { field: 'lastModified', label: 'Last modified', width: 150 },
  { field: 'actions', label: '', width: 100 },
]);
</script>

<style lang="scss" scoped>
.rp {
  &__name {
    display: flex;
    align-items: center;
    gap: var(--b-spacer-040);
  }

  &__actions {
    display: flex;
    gap: var(--b-spacer-020);
  }
}
</style>
