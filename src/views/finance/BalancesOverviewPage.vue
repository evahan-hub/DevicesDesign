<template>
  <div class="balances-overview-page">
    <div class="page-header">
      <h1>Balances Overview</h1>
      <p>View and manage account balances and financial overview</p>
    </div>
    
    <!-- Default Overview Content -->
    <div v-if="!$slots.details" class="content-section">
      <div class="info-card">
        <h3>Account Balances</h3>
        <p>View current account balances and status</p>
      </div>
      
      <div class="info-card">
        <h3>Balance History</h3>
        <p>Track balance changes and transactions</p>
      </div>
      
      <div class="info-card">
        <h3>Balance Analytics</h3>
        <p>Analyze balance trends and patterns</p>
      </div>
    </div>
    
    <!-- Details View Slot -->
    <div v-else class="details-view">
      <slot name="details"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BalancesOverviewPage',
});
</script>

<style scoped>
.balances-overview-page {
  padding: var(--b-spacer-090);
}

.page-header {
  margin-bottom: var(--b-spacer-090);
}

.page-header h1 {
  font-family: var(--b-text-heading-font-family);
  font-size: var(--b-text-heading-l-font-size);
  font-weight: var(--b-text-heading-font-weight);
  color: var(--b-color-label-primary);
  margin-bottom: var(--b-spacer-040);
}

.page-header p {
  font-family: var(--b-text-body-font-family);
  font-size: var(--b-text-body-font-size);
  color: var(--b-color-label-secondary);
}

.content-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--b-spacer-090);
}

.info-card {
  padding: var(--b-spacer-090);
  background-color: var(--b-color-background-secondary);
  border-radius: var(--b-border-radius-m);
  border: 1px solid var(--b-color-outline-secondary);
}

.info-card h3 {
  font-family: var(--b-text-body-font-family);
  font-size: var(--b-text-body-font-size);
  font-weight: var(--b-text-body-stronger-font-weight);
  color: var(--b-color-label-primary);
  margin-bottom: var(--b-spacer-040);
}

.info-card p {
  font-family: var(--b-text-body-font-family);
  font-size: var(--b-text-body-font-size);
  color: var(--b-color-label-secondary);
}

.details-view {
  width: 100%;
}
</style>
