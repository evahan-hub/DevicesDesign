<template>
  <div class="rf">
    <bento-header title="Risk fields" variant="page">
      <template #actions>
        <bento-button variant="secondary" @click="console.log('Learn more')">
          <template #iconLeft>
            <info-icon svg-title="Learn more" />
          </template>
          Learn more
        </bento-button>
      </template>
    </bento-header>

    <bento-alert type="highlight" class="b-margin-top-090 b-margin-bottom-070">
      <template #default>Advanced risk fields</template>
      <template #description>
        Configure additional data fields to enhance your risk rules. These fields can be used in custom rules,
        velocity checks, and referral lists.
      </template>
    </bento-alert>

    <div v-for="group in fieldGroups" :key="group.title" class="b-margin-bottom-090">
      <bento-typography variant="title" class="b-margin-bottom-060">
        {{ group.title }}
      </bento-typography>

      <bento-card>
        <template #content>
          <bento-structured-list>
            <bento-structured-list-item
              v-for="field in group.fields"
              :key="field.name"
              :label="field.name"
            >
              <template #description>{{ field.description }}</template>
              <div class="rf__field-actions">
                <bento-tag :label="field.type" size="small" />
                <bento-toggle :checked="field.enabled" @update:checked="field.enabled = $event" />
              </div>
            </bento-structured-list-item>
          </bento-structured-list>
        </template>
      </bento-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  BentoHeader, BentoAlert, BentoCard, BentoStructuredList,
  BentoStructuredListItem, BentoTag, BentoToggle, BentoTypography,
  BentoButton,
} from '@adyen/bento-vue2';
import InfoIcon from '@adyen/ui-assets-icons-16/vue/info';

const fieldGroups = ref([
  {
    title: 'Shopper data',
    fields: [
      { name: 'shopperEmail', description: 'Email address of the shopper', type: 'String', enabled: true },
      { name: 'shopperIP', description: 'IP address of the shopper', type: 'String', enabled: true },
      { name: 'shopperReference', description: 'Unique reference for the shopper', type: 'String', enabled: true },
      { name: 'deliveryAddress', description: 'Delivery address for the order', type: 'Object', enabled: false },
      { name: 'shopperName', description: 'Full name of the shopper', type: 'String', enabled: false },
    ],
  },
  {
    title: 'Transaction data',
    fields: [
      { name: 'merchantOrderReference', description: 'Merchant order reference for cross-referencing', type: 'String', enabled: true },
      { name: 'recurringDetailReference', description: 'Reference for recurring payment details', type: 'String', enabled: true },
      { name: 'deviceFingerprint', description: 'Device fingerprint from client-side collection', type: 'String', enabled: true },
      { name: 'paymentPurpose', description: 'Purpose code for the payment', type: 'String', enabled: false },
    ],
  },
  {
    title: 'Custom fields',
    fields: [
      { name: 'riskdata.custom.field1', description: 'Custom risk data field 1', type: 'Custom', enabled: true },
      { name: 'riskdata.custom.field2', description: 'Custom risk data field 2', type: 'Custom', enabled: true },
      { name: 'riskdata.custom.field3', description: 'Custom risk data field 3', type: 'Custom', enabled: false },
      { name: 'riskdata.basket.itemCount', description: 'Number of items in the shopping basket', type: 'Custom', enabled: false },
    ],
  },
]);
</script>

<style lang="scss" scoped>
.rf {
  &__field-actions {
    display: flex;
    align-items: center;
    gap: var(--b-spacer-060);
  }
}
</style>
