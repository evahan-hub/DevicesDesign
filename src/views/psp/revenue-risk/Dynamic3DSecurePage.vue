<template>
  <div class="d3ds">
    <bento-header title="Dynamic 3D Secure" variant="page">
      <template #actions>
        <bento-button variant="secondary" @click="console.log('Learn more')">
          <template #iconLeft>
            <info-icon svg-title="Learn more" />
          </template>
          Learn more
        </bento-button>
        <bento-button @click="console.log('Create rule')">
          <template #iconLeft>
            <add-icon svg-title="Create" />
          </template>
          Create rule
        </bento-button>
      </template>
    </bento-header>

    <bento-alert type="highlight" class="b-margin-top-090 b-margin-bottom-070">
      <template #default>Dynamic 3D Secure authentication</template>
      <template #description>
        Configure rules to dynamically apply 3D Secure authentication based on transaction characteristics.
        Optimize your authentication strategy to balance security and conversion.
      </template>
    </bento-alert>

    <bento-tabs
      :active-tab-index="activeTab"
      @update:active-tab-index="activeTab = $event"
      class="b-margin-bottom-070"
    >
      <bento-tab title="Authentication rules" />
      <bento-tab title="Exemption rules" />
      <bento-tab title="Performance" />
    </bento-tabs>

    <bento-data-grid
      v-if="activeTab < 2"
      :columns="columns"
      :data="activeTab === 0 ? authRules : exemptionRules"
      fit-content
      :pagination="pagination"
      @update:columns="columns = $event"
    >
      <template #item-status="{ item }">
        <bento-status :variant="item.enabled ? 'green' : 'grey'">
          {{ item.enabled ? 'Active' : 'Inactive' }}
        </bento-status>
      </template>

      <template #item-action="{ item }">
        <bento-tag :label="item.action" :variant="item.action === 'Challenge' ? 'orange' : 'green'" size="small" />
      </template>

      <template #item-priority="{ item }">
        {{ item.priority }}
      </template>
    </bento-data-grid>

    <div v-else class="d3ds__perf b-margin-top-070">
      <div class="d3ds__perf-grid">
        <bento-card>
          <template #default>Authentication rate</template>
          <template #content>
            <span class="d3ds__perf-value">34.2%</span>
            <span class="d3ds__perf-sub">of total transactions</span>
          </template>
        </bento-card>
        <bento-card>
          <template #default>Challenge success rate</template>
          <template #content>
            <span class="d3ds__perf-value">92.1%</span>
            <span class="d3ds__perf-sub">successful challenges</span>
          </template>
        </bento-card>
        <bento-card>
          <template #default>Frictionless rate</template>
          <template #content>
            <span class="d3ds__perf-value">78.5%</span>
            <span class="d3ds__perf-sub">of authenticated transactions</span>
          </template>
        </bento-card>
        <bento-card>
          <template #default>Exemption rate</template>
          <template #content>
            <span class="d3ds__perf-value">22.3%</span>
            <span class="d3ds__perf-sub">transactions exempted</span>
          </template>
        </bento-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  BentoHeader, BentoButton, BentoAlert, BentoTabs, BentoTab,
  BentoDataGrid, BentoStatus, BentoTag, BentoCard,
} from '@adyen/bento-vue2';
import type { BentoColumn } from '@adyen/bento-vue2';
import InfoIcon from '@adyen/ui-assets-icons-16/vue/info';
import AddIcon from '@adyen/ui-assets-icons-16/vue/plus';
import { BentoColumnOverflow } from '@adyen/bento-vue2';

const activeTab = ref(0);
const pagination = ref({ page: 1, size: 20, totalCount: 6, pageSizes: [10, 20, 50] });

const columns = ref<BentoColumn[]>([
  { field: 'name', label: 'Rule name', minWidth: 260, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'condition', label: 'Condition', minWidth: 300, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'action', label: 'Action', width: 140 },
  { field: 'status', label: 'Status', width: 120 },
  { field: 'priority', label: 'Priority', width: 100 },
]);

const authRules = [
  { name: 'High-value card transactions', condition: 'Amount > EUR 500 AND paymentMethod in (visa, mc)', action: 'Challenge', enabled: true, priority: 1 },
  { name: 'New shoppers ecommerce', condition: 'shopperInteraction == Ecommerce AND isNewShopper == true', action: 'Challenge', enabled: true, priority: 2 },
  { name: 'Cross-border transactions', condition: 'issuerCountry != shopperCountry', action: 'Challenge', enabled: true, priority: 3 },
  { name: 'Recurring low-risk', condition: 'shopperInteraction == ContAuth AND riskScore < 30', action: 'Frictionless', enabled: true, priority: 4 },
  { name: 'High-risk countries', condition: 'issuerCountry in (NG, PH, BR) AND amount > EUR 100', action: 'Challenge', enabled: true, priority: 5 },
  { name: 'Mobile app transactions', condition: 'channel == Android OR channel == iOS', action: 'Frictionless', enabled: false, priority: 6 },
];

const exemptionRules = [
  { name: 'Low value exemption', condition: 'Amount < EUR 30', action: 'Exempt', enabled: true, priority: 1 },
  { name: 'Trusted beneficiary', condition: 'shopperReference in trustedList', action: 'Exempt', enabled: true, priority: 2 },
  { name: 'Transaction risk analysis', condition: 'riskScore < 15 AND amount < EUR 250', action: 'Exempt', enabled: true, priority: 3 },
  { name: 'Recurring payments', condition: 'shopperInteraction == ContAuth', action: 'Exempt', enabled: false, priority: 4 },
];
</script>

<style lang="scss" scoped>
.d3ds {
  &__perf-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--b-spacer-090);
  }

  &__perf-value {
    display: block;
    font-size: var(--b-text-title-l-font-size);
    font-weight: 600;
    color: var(--b-color-text-primary);
  }

  &__perf-sub {
    display: block;
    font-size: var(--b-text-caption-font-size);
    color: var(--b-color-text-secondary);
    margin-top: var(--b-spacer-020);
  }
}
</style>
