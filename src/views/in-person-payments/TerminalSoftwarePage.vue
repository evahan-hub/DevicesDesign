<template>
  <div class="terminal-software-page">
    <div class="page-header">
      <h1>Terminal Software</h1>
      <p>Manage terminal software and firmware updates</p>
    </div>
    
    <div class="content-section">
      <div class="info-card">
        <h3>Software Management</h3>
        <p>Manage terminal software installations</p>
      </div>
      
      <div class="info-card">
        <h3>Firmware Updates</h3>
        <p>Update terminal firmware and drivers</p>
      </div>
      
      <div class="info-card">
        <h3>Version Control</h3>
        <p>Track software versions and compatibility</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TerminalSoftwarePage',
});
</script>

<style scoped>
.terminal-software-page {
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
</style>
