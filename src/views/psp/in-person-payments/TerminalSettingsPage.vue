<template>
  <div class="ts">
    <div class="ts__page-header">
      <h1 class="ts__page-title">Settings</h1>
      <bento-button variant="tertiary" class="ts__more-btn">
        <template #iconLeft>
          <options-vertical-icon svg-title="More options" />
        </template>
      </bento-button>
    </div>
  

    <!-- ── Two-column settings layout ──────────────────────────────────── -->
    <div class="ts__layout">

      <!-- Left sidebar -->
      <aside class="ts__sidebar">
        <div class="ts__search-wrap">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ts__search-icon">
            <circle cx="7" cy="7" r="5.25" stroke="var(--b-color-label-secondary)" stroke-width="1.5"/>
            <path d="M11 11L14 14" stroke="var(--b-color-label-secondary)" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span class="ts__search-placeholder">Search</span>
        </div>

        <div v-for="group in filteredNavGroups" :key="group.id" class="ts__nav-group">
          <p class="ts__nav-group-label">{{ group.label }}</p>
          <button
            v-for="item in group.items"
            :key="item.id"
            type="button"
            :class="['ts__nav-item', { 'ts__nav-item--active': activeItemId === item.id }]"
            @click="activeItemId = item.id"
          >
            {{ item.label }}
          </button>
        </div>
      </aside>

      <!-- Right detail panel -->
      <div class="ts__detail" v-if="activeItem">
        <div class="ts__detail-header">
          <h2 class="ts__detail-title">{{ activeItem.label }}</h2>
          <bento-link
            v-if="activeItem.id === 'p2p-encryption'"
            to="https://docs.adyen.com/point-of-sale/p2pe"
            external
          >
            View Docs
          </bento-link>
        </div>

        <bento-alert
          v-if="activeItem.id === 'p2p-encryption'"
          type="warning"
          variant="tip"
          class="ts__alert"
        >
          Point-to-point encryption (P2PE)
          <template #description>
            Contact your account manager to complete your P2PE SAQ form before you can enable the service.
          </template>
        </bento-alert>

        <div v-for="(field, idx) in activeItem.fields" :key="field.id">
          <!-- Toggle field -->
          <div v-if="field.type === 'toggle'" class="ts__toggle-field">
            <div class="ts__toggle-layout">
              <div class="ts__toggle-text">
                <p class="ts__field-label"><bento-status v-if="field.toggled" variant="blue" class="ts__toggle-dot" />{{ field.label }}</p>
                <p class="ts__field-desc" style="white-space: pre-line;">{{ field.description }}</p>
              </div>
              <bento-toggle v-model="field.toggled" label-position="before" />
            </div>
          </div>
          <!-- Select field -->
          <div v-else class="ts__field">
            <p class="ts__field-label">{{ field.label }}</p>
            <p class="ts__field-desc">{{ field.description }}</p>
            <bento-dropdown
              v-model="field.value"
              :options="field.dropdownOptions || []"
              placeholder="Select"
              class="ts__dropdown"
            />
            <bento-button variant="secondary" class="ts__field-btn">View Cost contract</bento-button>
          </div>
          <hr v-if="idx < activeItem.fields.length - 1" class="ts__divider" />
        </div>

        <div v-if="!activeItem.fields.length" class="ts__placeholder">
          No settings configured for this category.
        </div>
      </div>
    </div>

    <bento-action-bar
      v-if="hasUnsavedChanges"
      :item-counter="1"
      selection-label="unsaved change"
      :actions="actionBarActions"
    />

    <bento-modal
      v-if="showConfirmModal"
      :active-page="'confirm'"
      dialog-type="confirmation"
      @dismiss="showConfirmModal = false"
    >
      <template #confirm>
        <div class="ts__modal">
          <div class="ts__modal-header">
            <h3 class="ts__modal-title">Confirm changes?</h3>
            <bento-button variant="tertiary" @click="showConfirmModal = false">
              <template #iconLeft><cross-icon /></template>
            </bento-button>
          </div>
          <p class="ts__modal-subtitle">These changes will apply to:</p>
          <div class="ts__modal-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="8" r="2" fill="currentColor"/><circle cx="12" cy="8" r="2" fill="currentColor"/><circle cx="6" cy="16" r="2" fill="currentColor"/><circle cx="12" cy="16" r="2" fill="currentColor"/></svg>
            <div>
              <p class="ts__modal-item-title">AdyenTechSupport</p>
              <p class="ts__modal-item-desc">Company account</p>
            </div>
          </div>
          <div class="ts__modal-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="7" y="10" width="10" height="2" rx="1" fill="currentColor"/></svg>
            <div>
              <p class="ts__modal-item-title">Up to 103 terminals</p>
              <p class="ts__modal-item-desc">These are the active terminals assigned to this account</p>
            </div>
          </div>
          <div class="ts__modal-actions">
            <bento-button variant="secondary" @click="showConfirmModal = false">Cancel</bento-button>
            <bento-button variant="primary" @click="confirmSave">Confirm</bento-button>
          </div>
        </div>
      </template>
    </bento-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, watch } from 'vue';
import { BentoAlert, BentoButton, BentoToggle, BentoActionBar, BentoLink, BentoStatus, BentoDropdown, BentoModal } from '@adyen/bento-vue2';
import CrossIcon from '@adyen/ui-assets-icons-16/vue/cross';
import OptionsVerticalIcon from '@adyen/ui-assets-icons-16/vue/options-vertical';

interface SettingField {
  id: string;
  label: string;
  description: string;
  value?: string;
  options?: string[];
  dropdownOptions?: { label: string; value: string }[];
  clearable?: boolean;
  type?: 'select' | 'toggle';
  toggled?: boolean;
}

interface NavItem {
  id: string;
  label: string;
  fields: SettingField[];
}

interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

const navGroups = reactive<NavGroup[]>([
  {
    id: 'device',
    label: 'DEVICE',
    items: [
      {
        id: 'location-language',
        label: 'Location & language',
        fields: [
          { id: 'location', label: 'Location', description: 'The country or region where the terminal is located' },
          { id: 'timezone', label: 'Timezone', description: "The timezone of the terminal's location", value: 'US/Pacific', clearable: true },
          { id: 'language', label: 'Language', description: 'The default language used on the terminal' },
          { id: 'secondary-language', label: 'Secondary language', description: 'A secondary language that shoppers can select from the terminal screen' },
          { id: 'amount-format', label: 'Amount format', description: 'The decimal format for amounts on receipts and daily Totals reports' },
        ],
      },
      { id: 'sound',           label: 'Sound',           fields: [] },
      { id: 'theme',           label: 'Theme',           fields: [] },
      { id: 'home-screen',     label: 'Home screen',     fields: [] },
      { id: 'kiosk-mode',      label: 'Kiosk mode',      fields: [] },
      { id: 'maintenance',     label: 'Maintenance',     fields: [] },
      { id: 'passcodes',       label: 'Passcodes',       fields: [] },
      { id: 'logos',           label: 'Logos',           fields: [] },
      { id: 'barcode-scanner', label: 'Barcode scanner', fields: [] },
    ],
  },
  {
    id: 'device-connectivity',
    label: 'DEVICE CONNECTIVITY',
    items: [
      { id: 'wifi-profiles', label: 'Wi-Fi profiles', fields: [] },
      { id: 'beacons',       label: 'Beacons',        fields: [] },
      { id: 'usb',           label: 'USB',            fields: [] },
      { id: 'bluetooth',     label: 'Bluetooth',      fields: [] },
    ],
  },
  {
    id: 'payment-features',
    label: 'PAYMENT FEATURES',
    items: [
      {
        id: 'p2p-encryption',
        label: 'Point-to-point encryption (P2PE)',
        fields: [
          { id: 'p2pe-allow-moto', label: 'Enable Point-to-point encryption', description: 'Encrypt payment\u2011card data the moment it is entered into a payment device and keep it encrypted until it reaches the acquirer\u2019s network.\nTurning this on will result in a charge of 4 euros x 130 terminals per month. Your monthly charge will be 520 euros per month.', type: 'toggle', toggled: false },
          { id: 'p2pe-version-2', label: 'Cost contract', description: 'The encryption key version used for P2PE.', dropdownOptions: [{ label: 'Contract 1', value: 'contract-1' }, { label: 'Contract 2', value: 'contract-2' }, { label: 'Contract 3', value: 'contract-3' }, { label: 'Contract 4', value: 'contract-4' }], clearable: false },
        ],
      },
      { id: 'card-app-selection', label: 'Card application selection',                       fields: [] },
      { id: 'tipping',            label: 'Tipping',                                          fields: [] },
      { id: 'transaction-limits', label: 'Transaction limits',                               fields: [] },
      { id: 'mke',                label: 'Manual Key Entry (MKE)',                           fields: [] },
      { id: 'refunds',            label: 'Refunds',                                          fields: [] },
      { id: 'offline-processing', label: 'Offline processing',                               fields: [] },
      { id: 'store-and-forward',  label: 'Store-and-forward',                               fields: [] },
      { id: 'contactless-cards',  label: 'Contactless cards',                               fields: [] },
      { id: 'moto-payments',      label: 'Mail order/Telephone order (MOTO) payments',      fields: [] },
      { id: 'receipts',           label: 'Receipts',                                         fields: [] },
      { id: 'pre-auth',           label: 'Pre-authorisation',                               fields: [] },
    ],
  },
]);

const sidebarSearch = ref('');
const activeItemId = ref('location-language');
const hasUnsavedChanges = ref(false);
const showConfirmModal = ref(false);
const initialToggleStates = new Map<string, boolean>();

// Store initial toggle states
navGroups.forEach(g => g.items.forEach(item => {
  item.fields.forEach(f => {
    if (f.type === 'toggle') initialToggleStates.set(f.id, !!f.toggled);
  });
}));

watch(
  () => navGroups.flatMap(g => g.items.flatMap(item => item.fields.filter(f => f.type === 'toggle').map(f => f.toggled))),
  () => {
    for (const g of navGroups) {
      for (const item of g.items) {
        for (const f of item.fields) {
          if (f.type === 'toggle' && f.toggled !== initialToggleStates.get(f.id)) {
            hasUnsavedChanges.value = true;
            return;
          }
        }
      }
    }
    hasUnsavedChanges.value = false;
  },
  { deep: true }
);

const actionBarActions = [
  { title: 'Cancel', variant: 'secondary' as const, event: () => onCancel() },
  { title: 'Save', variant: 'primary' as const, event: () => onSave() },
];

function onCancel() {
  navGroups.forEach(g => g.items.forEach(item => {
    item.fields.forEach(f => {
      if (f.type === 'toggle') f.toggled = initialToggleStates.get(f.id) ?? false;
    });
  }));
  hasUnsavedChanges.value = false;
}

function onSave() {
  showConfirmModal.value = true;
}

function confirmSave() {
  navGroups.forEach(g => g.items.forEach(item => {
    item.fields.forEach(f => {
      if (f.type === 'toggle') initialToggleStates.set(f.id, !!f.toggled);
    });
  }));
  hasUnsavedChanges.value = false;
  showConfirmModal.value = false;
}

const filteredNavGroups = computed<NavGroup[]>(() => {
  const q = sidebarSearch.value.trim().toLowerCase();
  if (!q) return navGroups;
  return navGroups
    .map(g => ({ ...g, items: g.items.filter(i => i.label.toLowerCase().includes(q)) }))
    .filter(g => g.items.length > 0);
});

const activeItem = computed<NavItem | undefined>(() => {
  for (const g of navGroups) {
    const found = g.items.find(i => i.id === activeItemId.value);
    if (found) return found;
  }
  return undefined;
});
</script>

<style lang="scss" scoped>
.ts {
  padding: var(--b-spacer-090);

  &__page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--b-spacer-090);
  }

  &__page-title {
    margin: 0;
    font-family: var(--b-text-title-l-font-family);
    font-size: var(--b-text-title-l-font-size);
    font-weight: var(--b-text-title-l-font-weight);
    color: var(--b-color-label-primary);
  }

  &__more-btn {
    flex-shrink: 0;
  }

  &__layout {
    display: grid;
    grid-template-columns: 4fr calc(var(--b-spacer-140) * 3) 9fr;
    grid-template-areas: 'sidebar . content';
    flex: 1;
    overflow: hidden;
  }

  /* ── Sidebar ─────────────────────────────────────────────────────────── */
  &__sidebar {
    grid-area: sidebar;
    display: flex;
    flex-direction: column;
    gap: var(--b-spacer-060);
    flex: 1;
    overflow-y: auto;
    padding-right: var(--b-spacer-080);
  }

  &__search-wrap {
    display: flex;
    align-items: center;
    gap: var(--b-spacer-030);
    height: 36px;
    padding: 0 var(--b-spacer-040);
    border: var(--b-border-width-s) solid var(--b-color-outline-primary);
    border-radius: var(--b-border-radius-m);
    background: var(--b-color-background-primary);
  }

  &__search-icon { flex-shrink: 0; }

  &__search-placeholder {
    color: var(--b-color-label-secondary);
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
  }

  &__search-input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    box-shadow: none;
    padding: 0;
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
    color: var(--b-color-label-primary);

    &:focus,
    &:focus-visible { outline: none; box-shadow: none; }
    &::placeholder { color: var(--b-color-label-secondary); }
  }

  &__nav-group + &__nav-group {
    margin-top: 16px;
  }

  &__nav-group {
    display: flex;
    flex-direction: column;
    gap: var(--b-spacer-010);
  }

  &__nav-group-label {
    margin: 0 0 var(--b-spacer-010);
    padding: 0 var(--b-spacer-030);
    font-family: var(--b-text-caption-font-family);
    font-size: var(--b-text-caption-font-size);
    font-weight: var(--b-text-body-stronger-font-weight);
    color: var(--b-color-label-secondary);
    letter-spacing: 0.04em;
  }

  &__nav-item {
    width: 100%;
    text-align: left;
    padding: 8px var(--b-spacer-040) var(--b-spacer-030);
    border: none;
    border-radius: var(--b-border-radius-s);
    background: transparent;
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
    color: var(--b-color-label-primary);
    cursor: pointer;
    transition: background-color var(--b-animation-duration-fast) var(--b-animation-easing-standard);

    &:hover { background: var(--b-color-background-secondary); }

    &--active {
      background: var(--b-color-background-secondary);
      font-weight: var(--b-text-body-stronger-font-weight);
    }
  }

  /* ── Detail panel ────────────────────────────────────────────────────── */
  &__detail {
    grid-column: content;
    min-width: 0;
    max-width: 560px;
    padding-top: var(--b-spacer-030);
    padding-right: var(--b-spacer-080);
    padding-left: var(--b-spacer-020);
    overflow-y: auto;
  }

  &__detail-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    ::v-deep .b-link {
      color: var(--b-color-action-primary);

      .b-link__text {
        color: var(--b-color-action-primary);
      }

      svg path {
        fill: var(--b-color-action-primary);
      }
    }
  }

  &__detail-title {
    margin: 0;
    font-family: var(--b-text-title-m-font-family);
    font-size: var(--b-text-title-m-font-size);
    font-weight: var(--b-text-title-m-font-weight);
    color: var(--b-color-label-primary);
  }

  &__alert {
    margin: 24px 0;
  }

  &__field {
    padding: var(--b-spacer-070) 0;
    margin: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__field-label {
    margin: 0;
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
    font-weight: var(--b-text-body-stronger-font-weight);
    color: var(--b-color-label-primary);
  }

  &__field-desc {
    margin: 0;
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
    color: var(--b-color-label-secondary);
  }

  &__dropdown {
    margin-top: 8px;
  }

  &__field-btn {
    margin-top: 8px;
    align-self: flex-start;
  }

  &__select-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
    max-width: 420px;
  }

  &__select {
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
    padding: var(--b-spacer-040) var(--b-spacer-090) var(--b-spacer-040) var(--b-spacer-050);
    border: var(--b-border-width-s) solid var(--b-color-outline-primary);
    border-radius: var(--b-border-radius-m);
    background: var(--b-color-background-primary);
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
    color: var(--b-color-label-primary);
    cursor: pointer;
    outline: none;

    &:focus {
      border-color: var(--b-color-outline-selected);
      box-shadow: 0 0 0 var(--b-border-width-l) var(--b-focus-ring-color);
    }
  }

  &__select-chevron {
    position: absolute;
    right: var(--b-spacer-040);
    pointer-events: none;
  }

  &__clear-btn {
    align-self: flex-start;
    padding: var(--b-spacer-030) var(--b-spacer-050);
    border: var(--b-border-width-s) solid var(--b-color-outline-primary);
    border-radius: var(--b-border-radius-m);
    background: var(--b-color-background-primary);
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
    color: var(--b-color-label-primary);
    cursor: pointer;
    transition: background-color var(--b-animation-duration-fast) var(--b-animation-easing-standard);

    &:hover { background: var(--b-color-background-secondary); }
  }

  &__divider {
    margin: 0;
    border: none;
    border-top: var(--b-border-width-s) solid var(--b-color-separator-primary);
  }

  &__placeholder {
    color: var(--b-color-label-secondary);
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
    padding: var(--b-spacer-090) 0;
  }

  &__toggle-dot {
    display: inline-block;
    margin-right: 8px;
    vertical-align: middle;
  }

  &__toggle-field {
    padding: 0;
  }

  &__toggle-layout {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--b-spacer-070);
    margin-bottom: 24px;
  }

  &__toggle-text {
    flex: 1;
    min-width: 0;

    .ts__field-desc {
      margin-top: 8px;
    }
  }

  &__modal {
    padding: 24px;
  }

  &__modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__modal-title {
    margin: 0;
    font-family: var(--b-text-title-m-font-family);
    font-size: var(--b-text-title-m-font-size);
    font-weight: var(--b-text-title-m-font-weight);
    color: var(--b-color-label-primary);
  }

  &__modal-subtitle {
    margin: 0 0 16px;
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
    color: var(--b-color-label-secondary);
  }

  &__modal-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 16px;
    color: var(--b-color-label-primary);
  }

  &__modal-item-title {
    margin: 0;
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
    font-weight: var(--b-text-body-stronger-font-weight);
    color: var(--b-color-label-primary);
  }

  &__modal-item-desc {
    margin: 2px 0 0;
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-caption-font-size);
    color: var(--b-color-label-secondary);
  }

  &__modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>