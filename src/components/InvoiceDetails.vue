<template>
  <div class="invoice-details">
    <div class="invoice-header">
      <div class="title-section">
        <div class="title-left">
          <h1 class="invoice-title">Invoice 10453</h1>
          <bento-status color="Yellow" />
        </div>
        <div class="title-right">
          <div class="button-group">
            <bento-button 
              label="View Cost Contract" 
              :variant="BentoButtonVariant.SECONDARY"
            />
          </div>
          <bento-button 
            label="FX rate" 
            :variant="BentoButtonVariant.SECONDARY"
          />
          <div class="button-group">
            <bento-button 
              label="Download invoice" 
              :variant="BentoButtonVariant.PRIMARY"
              :icon-start="downloadIcon"
            />
          </div>
        </div>
      </div>
      
      <div class="invoice-meta">
        <div class="meta-item">
          <span class="meta-label">Account:</span>
          <span class="meta-value"> DE-6384QAKZ</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Issued:</span>
          <span class="meta-value"> Oct 3, 2025</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Due:</span>
          <span class="meta-value"> Oct 13, 2025</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Invoice Period:</span>
          <span class="meta-value"> Sep 1, 2025 - Sep 30, 2025</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">FX applied on:</span>
          <span class="meta-value"> Sep 1, 2025 - Sep 30, 2025</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { 
  BentoButtonVariant 
} from '@adyen/bento-vue2';

export default Vue.extend({
  name: 'InvoiceDetails',
  data() {
    return {
      BentoButtonVariant,
      downloadIcon: 'download' // This would be the actual icon component/path
    };
  },
});
</script>

<style scoped>
.invoice-details {
  width: 100%;
}

.invoice-header {
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-040);
  align-items: flex-start;
  justify-content: flex-end;
  padding: var(--b-spacer-000);
  position: relative;
  width: 100%;
}

.title-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  flex-shrink: 0;
  width: 100%;
}

.title-left {
  display: flex;
  gap: var(--b-spacer-060);
  align-items: center;
  position: relative;
  flex-shrink: 0;
  width: 455.5px;
}

.invoice-title {
  font-family: var(--b-text-heading-font-family);
  font-weight: var(--b-text-heading-font-weight);
  font-size: var(--b-text-heading-l-font-size);
  line-height: var(--b-text-heading-line-height);
  color: var(--b-color-label-primary);
  position: relative;
  flex-shrink: 0;
  white-space: nowrap;
  margin: 0;
}

.title-right {
  display: flex;
  gap: var(--b-spacer-070);
  align-items: center;
  position: relative;
  flex-shrink: 0;
}

.button-group {
  display: flex;
  gap: var(--b-spacer-040);
  align-items: center;
  justify-content: flex-end;
  padding: var(--b-spacer-000);
  position: relative;
  flex-shrink: 0;
}

.invoice-meta {
  display: flex;
  font-family: var(--b-text-body-font-family);
  font-weight: var(--b-text-body-medium-font-weight);
  gap: var(--b-spacer-070);
  align-items: flex-start;
  line-height: 0;
  position: relative;
  flex-shrink: 0;
  font-size: var(--b-text-body-font-size);
  color: var(--b-color-label-secondary);
  white-space: nowrap;
}

.meta-item {
  position: relative;
  flex-shrink: 0;
}

.meta-label {
  font-family: var(--b-text-body-font-family);
  font-weight: var(--b-text-body-strong-font-weight);
  line-height: var(--b-text-body-line-height);
  font-style: normal;
  color: var(--b-color-label-primary);
}

.meta-value {
  line-height: var(--b-text-body-line-height);
  color: var(--b-color-label-primary);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .title-section {
    flex-direction: column;
    gap: var(--b-spacer-060);
    align-items: flex-start;
  }
  
  .title-left {
    width: 100%;
  }
  
  .title-right {
    width: 100%;
    justify-content: flex-start;
  }
  
  .invoice-meta {
    flex-wrap: wrap;
    gap: var(--b-spacer-040);
  }
}

@media (max-width: 768px) {
  .title-right {
    flex-direction: column;
    gap: var(--b-spacer-040);
    align-items: flex-start;
  }
  
  .button-group {
    justify-content: flex-start;
  }
}
</style>
