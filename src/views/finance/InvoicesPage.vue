<template>
  <div class="invoices-page">
    <div class="page-header">
      <div class="header-content">
        <div class="header-title">
          <h1>Invoices</h1>
        </div>
        <div class="header-actions">
          <bento-button 
            label="Download list" 
            variant="primary"
          />
        </div>
      </div>
    </div>
    
    <div class="content-section">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { 
  BentoButton
} from '@adyen/bento-vue2';

export default Vue.extend({
  name: 'InvoicesPage',
  components: {
    BentoButton
  },
  data() {
    return {};
  },
});
</script>

<style scoped>
.invoices-page {
  padding: var(--b-spacer-090);
}

.page-header {
  margin-bottom: var(--b-spacer-090);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.header-title {
  display: flex;
  flex-direction: column;
  font-family: var(--b-text-heading-font-family);
  font-weight: var(--b-text-heading-font-weight);
  justify-content: center;
  line-height: 0;
  position: relative;
  flex-shrink: 0;
  font-size: var(--b-text-heading-l-font-size);
  width: 1096px;
}

.header-title h1 {
  font-family: var(--b-text-heading-font-family);
  font-weight: var(--b-text-heading-font-weight);
  font-size: var(--b-text-heading-l-font-size);
  line-height: var(--b-text-heading-line-height);
  color: var(--b-color-label-primary);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: var(--b-spacer-040);
  align-items: center;
  justify-content: flex-end;
  padding: var(--b-spacer-000);
  position: relative;
  flex-shrink: 0;
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
