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
            @click="activeItemId = item.id; alertsRevealed = false; showCompanyAlert = true"
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
          v-if="activeItem.id === 'p2p-encryption' && alertsRevealed && showCompanyAlert && !p2peToggled"
          type="warning"
          variant="tip"
          class="ts__alert ts__alert--clickable"
          @click.native="showCompanyAlert = false"
        >
          Company alert
          <template #description>
            Contact account manager. The P2PE compliance documentation (SAQ P2PE or AOC) is not yet on file. The account manager can support with completion before P2PE can be activated.
          </template>
        </bento-alert>

        <bento-alert
          v-if="activeItem.id === 'p2p-encryption' && alertsRevealed && !showCompanyAlert && !p2peToggled"
          type="warning"
          variant="tip"
          class="ts__alert ts__alert--clickable"
          @click.native="showCompanyAlert = true"
        >
          Store alert
          <template #description>
            Contact support. P2PE for stores requires activation by the support team.
          </template>
        </bento-alert>

        <div v-for="field in activeItem.fields" :key="field.id">
          <!-- Toggle field -->
          <div v-if="field.type === 'toggle'" class="ts__toggle-field">
            <div class="ts__toggle-layout">
              <div class="ts__toggle-text">
                <p class="ts__field-label" @click="alertsRevealed = true">
                  <bento-status v-if="field.toggled" variant="blue" class="ts__toggle-dot" />{{ field.label }}
                  <span
                    v-if="field.id === 'p2pe-allow-moto'"
                    class="ts__field-info-wrap"
                    tabindex="0"
                  >
                    <info-icon svg-title="Info" class="ts__field-info-icon" />
                  </span>
                </p>
                <p class="ts__field-desc" style="white-space: pre-line;">{{ field.description }}</p>
              </div>
              <bento-toggle v-model="field.toggled" label-position="before" />
            </div>
          </div>
        </div>

        <bento-popover
          v-if="p2peInfoRef"
          :open="p2peTooltipOpen"
          :target-element="p2peInfoRef"
          position="bottom-start"
          disable-focus-trap
          role="tooltip"
          @mouseenter.native="p2peTooltipOpen = true"
          @mouseleave.native="p2peTooltipOpen = false"
        >
          P2PE is only available on terminals running the latest firmware. Merchants are responsible for keeping their terminal firmware up to date.
        </bento-popover>

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
      :isOpen="showConfirmModal"
      :activePage="'confirm'"
      @close-modal="showConfirmModal = false"
    >
      <bento-modal-page
        pageId="confirm"
        :actions="confirmModalActions"
        @close-modal="showConfirmModal = false"
      >
        Confirm changes?
        <template #content>
          <div class="ts__modal-body">
            <p class="ts__modal-subtitle">These changes will apply to:</p>
            <div class="ts__modal-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><g fill="#001222" clip-path="url(#acc_a)"><path d="M4.5 8.75C6.019 8.75 7.25 9.981 7.25 11.5V13c0 1.519-1.231 2.75-2.75 2.75H3A2.75 2.75 0 0 1 .25 13v-1.5C.25 9.981 1.481 8.75 3 8.75h1.5ZM3 10.25c-.69 0-1.25.56-1.25 1.25V13c0 .69.56 1.25 1.25 1.25h1.5c.69 0 1.25-.56 1.25-1.25v-1.5c0-.69-.56-1.25-1.25-1.25H3Z"/><path d="M13 8.75c1.519 0 2.75 1.231 2.75 2.75V13c0 1.519-1.231 2.75-2.75 2.75h-1.5A2.75 2.75 0 0 1 8.75 13v-1.5c0-1.519 1.231-2.75 2.75-2.75H13Zm-1.5 1.5c-.69 0-1.25.56-1.25 1.25V13c0 .69.56 1.25 1.25 1.25H13c.69 0 1.25-.56 1.25-1.25v-1.5c0-.69-.56-1.25-1.25-1.25h-1.5Z"/><path d="M4.5.25C6.019.25 7.25 1.481 7.25 3v1.5C7.25 6.019 6.019 7.25 4.5 7.25H3A2.75 2.75 0 0 1 .25 4.5V3C.25 1.481 1.481.25 3 .25h1.5ZM3 1.75c-.69 0-1.25.56-1.25 1.25v1.5c0 .69.56 1.25 1.25 1.25h1.5c.69 0 1.25-.56 1.25-1.25V3c0-.69-.56-1.25-1.25-1.25H3Z"/><path d="M13 .25c1.519 0 2.75 1.231 2.75 2.75v1.5c0 1.519-1.231 2.75-2.75 2.75h-1.5A2.75 2.75 0 0 1 8.75 4.5V3C8.75 1.481 9.981.25 11.5.25H13Zm-1.5 1.5c-.69 0-1.25.56-1.25 1.25v1.5c0 .69.56 1.25 1.25 1.25H13c.69 0 1.25-.56 1.25-1.25V3c0-.69-.56-1.25-1.25-1.25h-1.5Z"/></g><defs><clipPath id="acc_a"><rect width="16" height="16" fill="#fff"/></clipPath></defs></svg>
              <div>
                <p class="ts__modal-item-title">AdyenTechSupport</p>
                <p class="ts__modal-item-desc">Company account</p>
              </div>
            </div>
            <div class="ts__modal-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#001222" d="M11.75 15.75H4.25V14.25H11.75V15.75Z"/><path fill="#001222" d="M8 8.5C8.552 8.5 9 8.948 9 9.5C9 10.052 8.552 10.5 8 10.5C7.448 10.5 7 10.052 7 9.5C7 8.948 7.448 8.5 8 8.5Z"/><path fill="#001222" d="M10 0.25C11.519 0.25 12.75 1.481 12.75 3V10C12.75 11.519 11.519 12.75 10 12.75H6C4.481 12.75 3.25 11.519 3.25 10V3C3.25 1.481 4.481 0.25 6 0.25H10ZM4.75 10C4.75 10.69 5.31 11.25 6 11.25H10C10.69 11.25 11.25 10.69 11.25 10V7.75H4.75V10ZM6 1.75C5.31 1.75 4.75 2.31 4.75 3V6.25H11.25V3C11.25 2.31 10.69 1.75 10 1.75H6Z"/></svg>
              <div>
                <p class="ts__modal-item-title">Up to 99 terminals</p>
                <p class="ts__modal-item-desc">These are the active terminals assigned to this account. Estimated monthly charge based on the current fleet is €[X]</p>
              </div>
            </div>
          </div>
        </template>
      </bento-modal-page>
    </bento-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, watch, onMounted, nextTick } from 'vue';
import { BentoAlert, BentoButton, BentoToggle, BentoActionBar, BentoLink, BentoStatus, BentoModal, BentoModalPage, BentoPopover } from '@adyen/bento-vue2';
import OptionsVerticalIcon from '@adyen/ui-assets-icons-16/vue/options-vertical';
import InfoIcon from '@adyen/ui-assets-icons-16/vue/info';

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
          { id: 'p2pe-allow-moto', label: 'Enable Point-to-point encryption', description: 'P2PE adds an extra layer of security by encrypting card data the moment a customer taps or swipes \u2014 keeping it encrypted until it reaches Adyen\u2019s network. This reduces the scope of PCI DSS compliance requirements.\n\nEnabling P2PE will be charged at \u20AC5 per terminal per month, as agreed in the cost contract. Based on the current fleet, the estimated monthly charge will be \u20AC[X]/month.', type: 'toggle', toggled: false },
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
const activeItemId = ref('p2p-encryption');
const hasUnsavedChanges = ref(false);
const showCompanyAlert = ref(true);
const alertsRevealed = ref(false);

const p2peToggled = computed(() => {
  for (const g of navGroups) {
    for (const item of g.items) {
      const field = item.fields.find(f => f.id === 'p2pe-allow-moto');
      if (field) return !!field.toggled;
    }
  }
  return false;
});
const p2peInfoRef = ref<HTMLElement | null>(null);
const p2peTooltipOpen = ref(false);

function bindP2peInfoIcon() {
  const el = document.querySelector('.ts__field-info-wrap') as HTMLElement | null;
  if (el) {
    p2peInfoRef.value = el;
    el.addEventListener('mouseenter', () => { p2peTooltipOpen.value = true; });
    el.addEventListener('mouseleave', () => { p2peTooltipOpen.value = false; });
    el.addEventListener('focusin', () => { p2peTooltipOpen.value = true; });
    el.addEventListener('focusout', () => { p2peTooltipOpen.value = false; });
  }
}

watch(activeItemId, () => {
  p2peInfoRef.value = null;
  p2peTooltipOpen.value = false;
  nextTick(bindP2peInfoIcon);
});

onMounted(() => {
  nextTick(bindP2peInfoIcon);
});
const showConfirmModal = ref(false);
const initialToggleStates = new Map<string, boolean>();

// Store initial toggle states
navGroups.forEach(g => g.items.forEach(item => {
  item.fields.forEach(f => {
    if (f.type === 'toggle') initialToggleStates.set(f.id, !!f.toggled);
  });
}));

watch(
  navGroups,
  () => {
    for (const g of navGroups) {
      for (const item of g.items) {
        for (const f of item.fields) {
          if (f.type === 'toggle' && !!f.toggled !== !!initialToggleStates.get(f.id)) {
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

const confirmModalActions = [
  { title: 'Cancel', variant: 'secondary' as const, event: () => { showConfirmModal.value = false; } },
  { title: 'Confirm', variant: 'primary' as const, event: () => confirmSave() },
];

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

  &__alert--clickable {
    cursor: pointer;
  }

  &__field {
    padding: var(--b-spacer-070) 0;
    margin: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__field-label {
    display: flex;
    align-items: center;
    gap: var(--b-spacer-040, 8px);
    margin: 0;
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
    font-weight: var(--b-text-body-stronger-font-weight);
    color: var(--b-color-label-primary);
  }

  &__field-info-icon {
    flex-shrink: 0;
    color: var(--b-color-label-secondary);
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

    > svg {
      flex-shrink: 0;
      margin-top: 2px;
    }
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