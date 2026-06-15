<template>
  <div class="sd b-margin-top-090">
    <bento-alert type="highlight" class="b-margin-bottom-090">
      <template #default>Shopper DNA linking</template>
      <template #description>
        Configure which merchant accounts share Shopper DNA data across regions.
        Linking merchant accounts allows sharing device and behavioral data for improved fraud detection.
      </template>
    </bento-alert>

    <div class="sd__grid">
      <bento-card v-for="config in linkingConfigs" :key="config.region">
        <template #default>{{ config.region }}</template>
        <template #actions>
          <bento-toggle :checked="config.enabled" @update:checked="config.enabled = $event" />
        </template>
        <template #content>
          <bento-structured-list v-if="config.enabled">
            <bento-structured-list-item label="Status">
              <bento-status :variant="config.enabled ? 'green' : 'grey'">
                {{ config.enabled ? 'Enabled' : 'Disabled' }}
              </bento-status>
            </bento-structured-list-item>
            <bento-structured-list-item label="Linked merchant accounts">
              <div v-if="config.merchantAccounts.length > 0" class="sd__merchants">
                <bento-tag
                  v-for="account in config.merchantAccounts"
                  :key="account"
                  :label="account"
                  size="small"
                />
              </div>
              <span v-else class="sd__empty">No merchant accounts linked</span>
            </bento-structured-list-item>
          </bento-structured-list>
          <div v-else class="sd__disabled b-padding-090">
            <bento-typography variant="body" color="secondary">
              Enable Shopper DNA linking for this region to configure merchant accounts.
            </bento-typography>
          </div>
        </template>
      </bento-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  BentoCard, BentoStructuredList, BentoStructuredListItem,
  BentoAlert, BentoToggle, BentoStatus, BentoTag, BentoTypography,
} from '@adyen/bento-vue2';
import { MOCK_SHOPPER_DNA_LINKING } from '../risk-settings.mock-data';

const linkingConfigs = ref([...MOCK_SHOPPER_DNA_LINKING]);
</script>

<style lang="scss" scoped>
.sd {
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: var(--b-spacer-090);
  }

  &__merchants {
    display: flex;
    flex-wrap: wrap;
    gap: var(--b-spacer-030);
  }

  &__empty {
    color: var(--b-color-text-secondary);
    font-size: var(--b-text-body-font-size);
  }
}
</style>
