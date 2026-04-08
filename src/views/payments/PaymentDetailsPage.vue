<template>
  <div class="page overflow-y-auto">
    <div class="details-toolbar">
      <bento-button variant="tertiary" @click="goBackToPayments">
        <template #iconLeft>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M14 8H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path d="M6.5 3.5L2 8L6.5 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </template>
        Back to Payments
      </bento-button>

      <bento-button variant="tertiary" @click="customisePage">
        <template #iconLeft>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M8 4.5C6.067 4.5 4.5 6.067 4.5 8C4.5 9.933 6.067 11.5 8 11.5C9.933 11.5 11.5 9.933 11.5 8C11.5 6.067 9.933 4.5 8 4.5Z" stroke="currentColor" stroke-width="1.5" />
            <path d="M8 1.75V3.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path d="M8 12.75V14.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path d="M3.58008 3.58008L4.64074 4.64074" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path d="M11.3594 11.3594L12.4201 12.4201" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path d="M1.75 8H3.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path d="M12.75 8H14.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path d="M3.58008 12.4201L4.64074 11.3594" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path d="M11.3594 4.64074L12.4201 3.58008" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </template>
        Customise this page
      </bento-button>
    </div>

    
    <bento-header 
      title="Payment details"
      variant="page"
      class="mb-6"
      :actions="[
        { title: 'Refund payment', event: () => undefined },
        { title: 'Download refund letter', event: () => undefined }
      ]"
    />

    <div class="content-stack">
      
      <bento-card class="details-card">
        <template #content>
          <div class="summary-header">
            <h2>Summary</h2>
            <bento-button variant="secondary" size="small">
              <template #iconLeft>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11 2L14 5L5 14H2V11L11 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
              </template>
              Customize
            </bento-button>
          </div>
          
          <bento-summary-grid>
            <template #cell-1-1>
              <bento-summary-grid-item-text title="PSP reference" :label="pspReference" copy="Copy PSP Reference" />
            </template>
            <template #cell-1-2>
              <bento-summary-grid-item-custom title="Last status">
                <div class="status-indicator">
                  <bento-status variant="green" />
                  <span>SentForSettle</span>
                </div>
              </bento-summary-grid-item-custom>
            </template>
            <template #cell-1-3>
              <bento-summary-grid-item-amount title="Authorized amount" label="220.00" currency="EUR" />
            </template>
            <template #cell-1-4>
              <bento-summary-grid-item-text title="Date" label="Dec 28, 2020, 10:26:53 GMT+2" />
            </template>
            
            <template #cell-2-1>
              <bento-summary-grid-item-text title="Merchant reference" label="abc-00014-xyz-store123" copy="Copy Merchant Reference" />
            </template>
            <template #cell-2-2>
              <bento-summary-grid-item-text title="Acquirer response" label="Fraud scoring: 43" />
            </template>
            <template #cell-2-3>
              <bento-summary-grid-item-custom title="Payment method">
                <div class="payment-method">
                  <svg width="24" height="16" viewBox="0 0 40 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="26" fill="white" rx="4"/>
                    <path d="M15.6688 7.38455L10.955 18.6289H7.88L5.56063 9.65705C5.42 9.10393 5.29813 8.90143 4.86875 8.66893C4.16938 8.29017 3.01437 7.93393 2 7.71268L2.06938 7.38643H7.01938C7.64938 7.38643 8.2175 7.80642 8.36 8.53392L9.58438 15.0402L12.6125 7.38643H15.6688V7.38455ZM27.7156 14.9596C27.7288 11.9914 23.6113 11.8283 23.6394 10.5027C23.6488 10.0995 24.0331 9.67018 24.8731 9.56143C25.2894 9.50705 26.4387 9.4658 27.7419 10.0639L28.2519 7.67893C27.5525 7.4258 26.6506 7.18018 25.5312 7.18018C22.655 7.18018 20.6319 8.7083 20.615 10.8983C20.5963 12.5164 22.0588 13.4202 23.1613 13.9583C24.2956 14.5096 24.6763 14.8639 24.6706 15.3552C24.6631 16.1089 23.7669 16.4427 22.9287 16.4558C21.4662 16.4783 20.6187 16.0602 19.9419 15.7452L19.415 18.2089C20.0938 18.5202 21.35 18.792 22.6494 18.807C25.7075 18.807 27.7063 17.2977 27.7156 14.9596ZM35.3094 18.6308H38L35.6506 7.38455H33.1681C32.6094 7.38455 32.1388 7.70893 31.9306 8.20955L27.5656 18.6289H30.62L31.2275 16.9489H34.9588L35.3094 18.6308ZM32.0637 14.6464L33.5956 10.4239L34.4769 14.6464H32.0637ZM19.8238 7.38455L17.4181 18.6289H14.51L16.9156 7.38455H19.8238Z" fill="#1434CB"/>
                  </svg>
                  <span>4123 **** **** 5627</span>
                </div>
              </bento-summary-grid-item-custom>
            </template>
            <template #cell-2-4>
              <bento-summary-grid-item-custom title="Shopper">
                <div class="shopper-info">
                  <strong>john.smith@gmail.com</strong>
                  <span class="sub-text">Shopper name: John Smith</span>
                </div>
              </bento-summary-grid-item-custom>
            </template>
          </bento-summary-grid>
        </template>
      </bento-card>

      <bento-card expandable class="details-card">
        Amounts
        <template #content>
          <bento-summary-grid>
            <template #cell-1-1>
              <bento-summary-grid-item-amount title="Adjusted amount" label="220.00" currency="EUR" />
            </template>
            <template #cell-1-2>
              <bento-summary-grid-item-amount title="Surcharge amount" label="17.57" currency="EUR" />
            </template>
            <template #cell-1-3>
              <bento-summary-grid-item-amount title="Tipping amount" label="5.35" currency="EUR" />
            </template>
          </bento-summary-grid>
        </template>
      </bento-card>

      <bento-card expandable class="details-card">
        Payment lifecycle
        <template #description>
          Last status: <a href="#" class="text-blue font-medium">SentForSettle ↗</a>
        </template>
        <template #content>
          <bento-data-grid
            class="embedded-grid"
            :columns="lifecycleColumns"
            :data="lifecycleData"
          />
        </template>
      </bento-card>

      <bento-card expandable class="details-card">
        Payment Events
        <template #content>
          <bento-data-grid
            class="embedded-grid"
            :columns="eventsColumns"
            :data="eventsData"
          >
            <template #item-type="{ item }">
              <bento-link is-not-routing to="#">{{ item.type }}</bento-link>
            </template>
          </bento-data-grid>
        </template>
      </bento-card>

      <bento-layout size="full-width">
        <bento-layout-row columns-layout="6-6">
          
          <template #col-1>
            <div class="col-stack">
              
              <bento-card expandable class="details-card">
                Card details
                <template #content>
                  <table class="kv-table">
                    <tr><td class="kv-key">Payment method</td><td class="kv-val text-blue">Visa</td></tr>
                    <tr><td class="kv-key">Card type</td><td class="kv-val">Visa</td></tr>
                    <tr><td class="kv-key">Card holder</td><td class="kv-val text-muted">+++REDACTED+++</td></tr>
                    <tr><td class="kv-key">Card number</td><td class="kv-val">411111******1111 🔍</td></tr>
                    <tr><td class="kv-key">Expiry date</td><td class="kv-val">01/2040</td></tr>
                    <tr><td class="kv-key">Issuer name</td><td class="kv-val">ADYEN TEST BANK</td></tr>
                    <tr><td class="kv-key">Issuer country/region</td><td class="kv-val">Netherlands 🔍</td></tr>
                    <tr><td class="kv-key">IBAN</td><td class="kv-val text-muted">+++REDACTED+++</td></tr>
                  </table>
                </template>
              </bento-card>

              <bento-card expandable class="details-card">
                Shopper details
                <template #content>
                  <table class="kv-table">
                    <tr><td class="kv-key">IP</td><td class="kv-val text-muted">+++REDACTED+++</td></tr>
                    <tr><td class="kv-key">Locale</td><td class="kv-val text-muted">+++REDACTED+++</td></tr>
                    <tr><td class="kv-key">Email</td><td class="kv-val text-muted">+++REDACTED+++</td></tr>
                  </table>
                </template>
              </bento-card>

              <bento-card expandable class="details-card">
                Information
                <template #content>
                  <table class="kv-table">
                    <tr><td class="kv-key">Creation date</td><td class="kv-val-dim">Jun 24, 2025, 11:55:50 GMT+2</td></tr>
                    <tr><td class="kv-key">Skin code</td><td class="kv-val-dim">pub.v2.LCCMR...</td></tr>
                    <tr><td class="kv-key">Referrer</td><td class="kv-val-dim text-blue">https://checkoutshoppertest.adyen.com</td></tr>
                    <tr><td class="kv-key">Persistent cookie</td><td class="kv-val-dim">25c42552-7f75-1015-70a8...</td></tr>
                    <tr><td class="kv-key">Browser</td><td class="kv-val-dim">Chrome</td></tr>
                    <tr><td class="kv-key">Device type</td><td class="kv-val-dim">Other</td></tr>
                    <tr><td class="kv-key">Number of installments</td><td class="kv-val-dim">1</td></tr>
                    <tr><td class="kv-key">Shopper paid</td><td class="kv-val-dim">EUR 180.00</td></tr>
                    <tr><td class="kv-key">Integration type</td><td class="kv-val-dim">Checkout session</td></tr>
                    <tr><td class="kv-key">Integration version</td><td class="kv-val-dim">71</td></tr>
                    <tr><td class="kv-key">Checkout Session ID</td><td class="kv-val-dim">CSC3C40673D...</td></tr>
                  </table>
                </template>
              </bento-card>

            </div>
          </template>

          <template #col-2>
            <div class="col-stack">
              
              <bento-card expandable class="details-card">
                Processing
                <template #content>
                  <table class="kv-table">
                    <tr>
                      <td class="kv-key">Acquirer response</td>
                      <td class="kv-val">
                        <span style="color: #666; margin-right: 6px;">●</span> CVC Declined (DECLINED CVC)
                      </td>
                    </tr>
                    <tr><td class="kv-key">Shopper interaction</td><td class="kv-val-dim">Ecommerce</td></tr>
                    <tr><td class="kv-key">CVC/CVV</td><td class="kv-val-dim">Supplied, Doesn't match (N)</td></tr>
                    <tr><td class="kv-key">AVS</td><td class="kv-val-dim">Address matches, postal code doesn't</td></tr>
                    <tr><td class="kv-key">Retried</td><td class="kv-val-dim">true</td></tr>
                    <tr><td class="kv-key">Fraud scoring</td><td class="kv-val-dim">7</td></tr>
                  </table>
                </template>
              </bento-card>

              <bento-card expandable class="details-card">
                3DS
                <template #content>
                  <table class="kv-table">
                    <tr><td class="kv-key">Liability shift</td><td class="kv-val-dim">No, Issuer will not bear the financial risk</td></tr>
                    <tr><td class="kv-key">3DS reason</td><td class="kv-val-dim">Merchant requested 3DS through Default rule</td></tr>
                    <tr><td class="kv-key">Dynamic 3D secure</td><td class="kv-val-dim">Default rule triggered (Always prepare)</td></tr>
                  </table>
                  <div class="mt-4 text-right">
                    <a href="#" class="download-link">⤓ Download 3DS data</a>
                  </div>
                </template>
              </bento-card>

              <bento-card expandable class="details-card">
                Fraud control
                <template #content>
                  <div class="fraud-form">
                    <label class="form-label">Reason</label>
                    <input type="text" class="full-input" value="PSP reference: XEWJQCTR56GH3275" readonly />
                    
                    <a href="#" class="merchant-link">Use merchant reference</a>
                    
                    <div class="checkbox-list">
                      <label class="check-item"><input type="checkbox" /> Card holder / consumer name</label>
                      <label class="check-item"><input type="checkbox" /> Shopper email address</label>
                      <label class="check-item"><input type="checkbox" /> Shopper reference</label>
                      <label class="check-item"><input type="checkbox" /> Used card / bank account number</label>
                    </div>

                    <div class="action-row">
                      <div class="radio-list">
                        <label class="radio-item"><input type="radio" name="fraud" /> Block</label>
                        <label class="radio-item"><input type="radio" name="fraud" /> Trust</label>
                        <label class="radio-item"><input type="radio" name="fraud" /> Remove from list</label>
                      </div>
                      <bento-button variant="primary">Apply</bento-button>
                    </div>

                    <div class="mt-6">
                      <bento-button variant="secondary" :full-width="true">Unlink card number from shopper reference</bento-button>
                    </div>
                  </div>
                </template>
              </bento-card>

            </div>
          </template>
          
        </bento-layout-row>
      </bento-layout>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import {
  BentoHeader, BentoButton, BentoCard, BentoStatus,
  BentoSummaryGrid, BentoSummaryGridItemText, BentoSummaryGridItemAmount, BentoSummaryGridItemCustom,
  BentoLayout, BentoLayoutRow, BentoDataGrid, BentoLink,
} from '@adyen/bento-vue2';
import { useRoute, useRouter } from 'vue-router/composables';
import { LIFECYCLE_COLUMNS, LIFECYCLE_DATA, EVENTS_COLUMNS, EVENTS_DATA } from './payment-details.mock-data';

const route = useRoute();
const router = useRouter();

const lifecycleColumns = LIFECYCLE_COLUMNS;
const lifecycleData = LIFECYCLE_DATA;
const eventsColumns = EVENTS_COLUMNS;
const eventsData = EVENTS_DATA;

const pspReference = computed<string>(() => route.params.id || 'ZNQPBSJD3CTVLD75');

function goBackToPayments(): void {
  router.push({ name: 'payments' });
}

function customisePage(): void {
  return undefined;
}
</script>

<style scoped>
.page {
  padding: var(--b-spacer-090);
  background: var(--b-color-background-primary);
  display: block; 
}

.details-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.content-stack {
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-090);
}

.col-stack {
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-090);
  height: 100%;
}

.summary-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--b-spacer-070);
}

.summary-header h2 {
  font-family: var(--b-text-title-m-font-family);
  font-weight: var(--b-text-title-m-font-weight);
  font-size: var(--b-text-title-m-font-size);
  color: var(--b-color-label-primary);
  margin: 0;
}

::v-deep .details-card {
  box-shadow: none !important;
  border: 1px solid var(--b-color-outline-secondary);
}

/* Custom internal layout elements */
.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.payment-method {
  display: flex;
  align-items: center;
  gap: 8px;
}

.payment-method svg {
  border-radius: 4px;
  border: 1px solid var(--b-color-outline-secondary);
}

.shopper-info {
  display: flex;
  flex-direction: column;
}

.sub-text {
  font-size: var(--b-text-caption-font-size);
  color: var(--b-color-label-secondary);
  margin-top: 2px;
}

.font-medium {
  font-weight: 500;
}

.text-blue {
  color: #0065C9;
}

.text-muted {
  color: var(--b-color-label-secondary);
}

/* Key-Value Tables for the 2-Column layouts */
.kv-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--b-text-body-font-family);
  font-size: var(--b-text-body-font-size);
  line-height: 20px;
}

.kv-table td {
  padding: 12px 0;
  border-bottom: 1px solid var(--b-color-separator-primary);
}

.kv-table tr:last-child td {
  border-bottom: none;
  padding-bottom: 0;
}

.kv-key {
  width: 45%;
  color: var(--b-color-label-secondary);
  vertical-align: top;
}

.kv-val {
  font-weight: 500;
  color: var(--b-color-label-primary);
}

.kv-val-dim {
  font-weight: 400;
  color: var(--b-color-label-primary);
}

/* Fraud Form Specifics */
.fraud-form {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
}

.full-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--b-color-outline-secondary);
  border-radius: var(--b-border-radius-m);
  color: var(--b-color-label-secondary);
  background-color: var(--b-color-background-secondary);
  margin-bottom: 8px;
}

.merchant-link {
  color: var(--b-color-label-primary);
  text-decoration: underline;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  display: inline-block;
}

.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.check-item, .radio-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}

.action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}

.radio-list {
  display: flex;
  gap: 16px;
}

.download-link {
  font-weight: 600;
  color: var(--b-color-label-primary);
  text-decoration: underline;
}

/* Make sure inner grids don't overflow the cards */
::v-deep .embedded-grid .b-data-grid {
  border: none;
}
::v-deep .embedded-grid .b-data-grid-row-container:last-child .b-data-grid-cell {
  border-bottom: none;
}
</style>