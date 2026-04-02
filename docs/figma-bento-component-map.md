# Figma <-> Bento Component Map

Use this file as the primary mapping source when implementing Figma designs in this repo.

## Usage Rules
1. Check this map first for existing mappings.
2. If no mapping exists, query Bento MCP (`get_all_components`, `get_component`) and add a new row.
3. If Code Connect is missing/unclear, set status to `needs-user-input` and ask the user what to connect before implementation.
4. After implementation, update status and notes.

> **Figma file:** Code Connect is not configured on the Unified Reconciliation file (`mUzE5gY8UjkOKd1ygS973K`). Figma component names follow the `b-{name}` convention. Node IDs are only populated when a specific screen usage has been validated.

> **Imports:** All components come from `@adyen/bento-vue2` (v1.84.1) and are globally registered via `Vue.use(BentoVue)` in `src/main.ts` — **no per-component import needed in templates**. The "Explicit Import" column only lists what needs a manual `import { … } from '@adyen/bento-vue2'` (types, enums, composables). Do **not** use `@adyen/bento-vue3`.

---

## Navigation & Layout

| Screen / Context | Figma URL | Node ID | Figma Component | Bento Component | Explicit Import | Canonical Usage | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Global | N/A | — | `b-header` | `BentoHeader` | — | `<bento-header title="Page Title" :actions="headerActions" />` | `ready` | `variant="page"` (default) for top-level pages; `variant="component"` for in-page sections. Pass `actions` array for top-right buttons. |
| Global | N/A | — | `b-header` (component variant) | `BentoHeader` | — | `<bento-header title="Section Title" variant="component" />` | `ready` | Use inside cards or panels where a page header already exists. |
| Global | N/A | — | `b-header-with-views` | `BentoHeaderWithViews` | `import { BentoHeaderWithViewsItemIconColorEnum } from '@adyen/bento-vue2'` | `<bento-header-with-views title="Title" :views="views" :actions="actions" @select:view="onSelect" @add:view="onAdd" @delete:view="onDelete" @save:view="onSave" />` | `ready` | Each view: `{ icon, iconColor: BentoHeaderWithViewsItemIconColorEnum.PRIMARY, label }`. Must handle `select:view`, `add:view`, `delete:view`, `save:view`, `restore:view`, `reorder:view`, `update:view`. Vue 2 active view sync: `:active-view-index.sync="idx"`. |
| Global | N/A | — | `b-secondary-nav` | `BentoSecondaryNav` | — | `<bento-secondary-nav :items="navItems" />` | `ready` | Sub-navigation within a section. |
| Global | N/A | — | `b-layout` / `b-layout-row` | `BentoLayout` + `BentoLayoutRow` | — | `<bento-layout size="full-width"><bento-layout-row columns-layout="6-6">…</bento-layout-row></bento-layout>` | `ready` | `size`: `"full-width"`, `"wide"`, `"narrow"`. `columns-layout` splits columns e.g. `"6-6"`, `"4-8"`, `"3-9"`. |
| Global | N/A | — | `b-tabs` / `b-tab` | `BentoTabs` + `BentoTab` | — | `<bento-tabs><bento-tab title="Tab 1">…</bento-tab></bento-tabs>` | `ready` | Tab container + individual tabs. Use `:active-tab` for controlled mode. |
| Global | N/A | — | `b-accordion` | `BentoAccordion` + `BentoAccordionItem` | — | `<bento-accordion><bento-accordion-item title="Section">Content</bento-accordion-item></bento-accordion>` | `ready` | Each item needs `title` prop. Use `:is-expanded.sync="flag"` to control open state externally. |
| Global | N/A | — | `b-divider` | `BentoDivider` | — | `<bento-divider />` | `ready` | Horizontal rule / visual separator. |
| Global | N/A | — | `b-anchor-scroller` | `BentoAnchorScroller` | — | `<bento-anchor-scroller :items="items" :active-index="activeIndex" @update:active-index="activeIndex = $event"><section ref="s1">…</section></bento-anchor-scroller>` | `ready` | Sections go in the default slot. Each item must have `{ title, elementRef }` where `elementRef` is a Vue `ref` pointing to the matching `<section>`. |

---

## Actions & Interactions

| Screen / Context | Figma URL | Node ID | Figma Component | Bento Component | Explicit Import | Canonical Usage | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Unified Reconciliation | https://www.figma.com/design/mUzE5gY8UjkOKd1ygS973K/Unified-Reconciliation?node-id=4203-7222&m=dev | `4203:7222` | `b-button` | `BentoButton` | — | `<bento-button variant="primary">Save</bento-button>` | `implemented` | Implemented in `src/components/figma/FigmaButton42037222.vue`. |
| Global | N/A | — | `b-button` (secondary) | `BentoButton` | — | `<bento-button variant="secondary">Export</bento-button>` | `ready` | — |
| Global | N/A | — | `b-button` (tertiary) | `BentoButton` | — | `<bento-button variant="tertiary">Back</bento-button>` | `ready` | Use for recurring/low-priority actions. |
| Global | N/A | — | `b-button` (icon only) | `BentoButton` | — | `<bento-button variant="secondary"><template #iconLeft><options-vertical-icon svg-title="More actions" /></template></bento-button>` | `ready` | Icon must always have a meaningful `svg-title` for accessibility. |
| Global | N/A | — | `b-button` (condensed) | `BentoButton` | — | `<bento-button variant="secondary" :condensed="true">Action</bento-button>` | `ready` | Use inside data grid rows or space-constrained areas. |
| Global | N/A | — | `b-button` (critical) | `BentoButton` | — | `<bento-button variant="primary" :critical="true">Delete</bento-button>` | `ready` | Red destructive variant. |
| Global | N/A | — | `b-link` | `BentoLink` | — | `<bento-link :to="{ name: 'payment-details', params: { id } }">{{ id }}</bento-link>` | `ready` | For router navigation. Use `is-not-routing` + `to="#"` for external/anchor links. |
| Global | N/A | — | `b-menu` | `BentoMenu` | — | `<bento-menu :items="menuItems" />` | `ready` | Dropdown menu triggered by an icon button. |
| Global | N/A | — | `b-action-bar` | `BentoActionBar` | — | `<bento-action-bar :actions="bulkActions" :item-counter="selectedCount" @close="onDeselect" />` | `ready` | Bulk-action bar for selected rows. Rendered automatically inside `BentoDataGrid` when `bulkActions` prop is set. |
| Global | N/A | — | `b-segmented-control` | `BentoSegmentedControl` | — | `<bento-segmented-control v-model="selected" :options="options" />` | `ready` | Toggle-style selector for 2–5 options. |
| Global | N/A | — | `b-toggle` | `BentoToggle` | — | `<bento-toggle v-model="enabled" label="Enable feature" />` | `ready` | On/off switch. |
| Global | N/A | — | `b-stepper` | `BentoStepper` | — | `<bento-stepper :steps="steps" :current-step="1" />` | `ready` | Multi-step flow progress indicator. |

---

## Data Display

| Screen / Context | Figma URL | Node ID | Figma Component | Bento Component | Explicit Import | Canonical Usage | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Global | N/A | — | `b-data-grid` | `BentoDataGrid` | `import { BentoColumn, BentoDatagridPaginationProps } from '@adyen/bento-vue2'` (TS types only) | `<bento-data-grid :columns="columns" :data="rows" :pagination="pagination" selectable @update:selection="selection = $event" />` | `ready` | Core table component. See `PaymentsPage.vue` for full pattern with filters, search, and custom cell slots. |
| Global | N/A | — | `b-data-grid-template` | `BentoDataGridTemplate` | — | `<bento-data-grid-template><bento-data-grid … /></bento-data-grid-template>` | `ready` | Wrapper that adds sticky filters/tabs/pagination. See `DisputesPage.vue`. |
| Global | N/A | — | `b-summary-grid` | `BentoSummaryGrid` | — | `<bento-summary-grid><template #cell-1-1>…</template></bento-summary-grid>` | `ready` | KPI / stats grid using named slots `#cell-{row}-{col}`. Max 3 rows, up to 6 cols per row. |
| Global | N/A | — | `b-summary-grid-item-text` | `BentoSummaryGridItemText` | — | `<bento-summary-grid-item-text title="PSP reference" :label="ref" copy="Copy" />` | `ready` | Text cell inside SummaryGrid. |
| Global | N/A | — | `b-summary-grid-item-amount` | `BentoSummaryGridItemAmount` | — | `<bento-summary-grid-item-amount title="Amount" label="220.00" currency="EUR" />` | `ready` | Currency/amount cell inside SummaryGrid. |
| Global | N/A | — | `b-summary-grid-item-numeric` | `BentoSummaryGridItemNumeric` | — | `<bento-summary-grid-item-numeric title="Count" label="123" trend="12%" trend-direction="positive" />` | `ready` | Numeric cell with optional trend indicator. |
| Global | N/A | — | `b-summary-grid-item-percentage` | `BentoSummaryGridItemPercentage` | — | `<bento-summary-grid-item-percentage title="Auth rate" label="98" :trend="2" />` | `ready` | Percentage cell inside SummaryGrid. |
| Global | N/A | — | `b-summary-grid-item-custom` | `BentoSummaryGridItemCustom` | — | `<bento-summary-grid-item-custom title="Status"><bento-status variant="green" /></bento-summary-grid-item-custom>` | `ready` | Custom content cell. Accepts only: Status, PaymentMethod, Country, Date. |
| Global | N/A | — | `b-structured-list` | `BentoStructuredList` + `BentoStructuredListItem` | — | `<bento-structured-list layout="33-66"><bento-structured-list-item label="Status"><bento-status variant="green">Approved</bento-status></bento-structured-list-item></bento-structured-list>` | `ready` | Label–value pair list. Use inside cards, modals, side panels. |
| Global | N/A | — | `b-card` | `BentoCard` | — | `<bento-card><template #header>…</template>…</bento-card>` | `ready` | Container card. Add `:expandable="true"` for collapsible variant. |
| Global | N/A | — | `b-status` | `BentoStatus` | — | `<bento-status variant="green">Authorized</bento-status>` | `ready` | Status dot + optional label. Variants: `green`, `red`, `yellow`, `blue`, `grey`. |
| Global | N/A | — | `b-tag` | `BentoTag` | — | `<bento-tag>Label</bento-tag>` | `ready` | Small label badge. |
| Global | N/A | — | `b-chip` | `BentoChip` | — | `<bento-chip>Filter</bento-chip>` | `ready` | Removable filter pill. |
| Global | N/A | — | `b-currency` | `BentoCurrency` | — | `<bento-currency currency="EUR" :value="22000" />` | `ready` | Value is in **minor units** (cents). |
| Global | N/A | — | `b-date` | `BentoDate` | `import { BentoDateFormat } from '@adyen/bento-vue2'` | `<bento-date :date="new Date()" :format="BentoDateFormat.FULL_DATE_TIME_WITH_TIMEZONE_AND_PERIOD" />` | `ready` | `BentoDateFormat` enum required for the `:format` prop. |
| Global | N/A | — | `b-country` | `BentoCountry` | `import { BentoCountryCode } from '@adyen/bento-vue2'` | `<bento-country :code="BentoCountryCode.NL" />` | `ready` | `BentoCountryCode` enum required for the `:code` prop. |
| Global | N/A | — | `b-payment-method` | `BentoPaymentMethod` | — | `<bento-payment-method type="ideal" label="iDEAL" />` | `ready` | Payment method logo + label. Replaces raw inline SVGs for card brands. |
| Global | N/A | — | `b-avatar` | `BentoAvatar` | — | `<bento-avatar username="Jane Doe" :src="imgSrc" />` | `ready` | Prop is `username` (not `name`). Initials auto-derived when no `src`. `:icon-only="true"` hides the text label. |
| Global | N/A | — | `b-typography` | `BentoTypography` | — | `<bento-typography variant="body" :stronger="true">Text</bento-typography>` | `ready` | Variants: `title`, `body`, `caption`. `:stronger="true"` = bold. `secondary` prop = muted color. |
| Global | N/A | — | `b-timeline` | `BentoTimeline` | — | `<bento-timeline :events="timelineEvents" />` | `ready` | Vertical event timeline. |
| Global | N/A | — | `b-inspector` | `BentoInspector` | — | `<bento-inspector title="Details" size="large" :is-open="isOpen" :active-page="activePage" expandable @update:is-open="isOpen = $event" @update:active-page="activePage = $event"><template #page><!-- main content + trigger --></template><template #content><!-- detail content --></template></bento-inspector>` | `ready` | Layout wrapper — NOT a `:items` list. `#page` = main page content + open trigger. `#content` = inspector detail. `active-page` must be set and kept in sync. `size`: `"small"` (420px) or `"large"` (595px). |
| Global | N/A | — | `b-ai-tag` | `BentoAiTag` | — | `<bento-ai-tag title="Auto-filled by AI" description="AI prefilled these fields." influenced-value="30%" :action="{ title: 'Learn more', event: onLearnMore }" />` | `ready` | Clickable AI badge that opens an explainability popover. Requires `title` + `description`. `influenced-value` shows a metric. `action` adds a CTA in the popover. |
| Global | N/A | — | `b-image` | `BentoImage` | `import { BentoImageAspectRatio } from '@adyen/bento-vue2'` (only when specifying aspect ratio) | `<bento-image :src="url" alt="Description" />` | `ready` | Lazy-loaded image. `BentoImageAspectRatio` enum needed for `aspect-ratio` prop. |
| Global | N/A | — | `b-info-icon` | `BentoInfoIcon` | — | `<bento-info-icon popover-text="Helpful tooltip" />` | `ready` | ⓘ icon with popover on hover. |

---

## Forms & Inputs

| Screen / Context | Figma URL | Node ID | Figma Component | Bento Component | Explicit Import | Canonical Usage | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Global | N/A | — | `b-input-field` | `BentoInputField` | — | `<bento-input-field v-model="value" label="Merchant reference" />` | `ready` | Standard text input. |
| Global | N/A | — | `b-input-field-password` | `BentoInputFieldPassword` | — | `<bento-input-field-password v-model="password" label="Password" />` | `ready` | Password input with show/hide toggle. |
| Global | N/A | — | `b-input-field-phone-number` | `BentoInputFieldPhoneNumber` | — | `<bento-input-field-phone-number v-model="phone" label="Phone number" />` | `ready` | Phone input with country code selector. |
| Global | N/A | — | `b-textarea` | `BentoTextarea` | — | `<bento-textarea v-model="notes" label="Notes" />` | `ready` | Multi-line text input. |
| Global | N/A | — | `b-checkbox` | `BentoCheckbox` | — | `<bento-checkbox v-model="checked" label="Accept terms" />` | `ready` | Single checkbox with label. |
| Global | N/A | — | `b-radio-group` | `BentoRadioGroup` | — | `<bento-radio-group v-model="selected" label="Options" :items="[{ value: 'a', label: 'Option A' }]" />` | `ready` | Radio button group. `variant="horizontal"` for inline layout. |
| Global | N/A | — | `b-dropdown` | `BentoDropdown` | — | `<bento-dropdown v-model="selected" :options="options" label="Select" />` | `ready` | Single-select dropdown. |
| Global | N/A | — | `b-date-picker` | `BentoDatePicker` | — | `<bento-date-picker v-model="date" label="Date" />` | `ready` | Single date picker. |
| Global | N/A | — | `b-date-range-picker` | `BentoDateRangePicker` | — | `<bento-date-range-picker v-model="range" label="Date range" />` | `ready` | Date range picker with from/to fields. |
| Global | N/A | — | `b-search-bar` | `BentoSearchBar` | — | `<bento-search-bar v-model="searchTerm" placeholder="Search…" />` | `ready` | Standalone search. Inside DataGrid use `filter-search-config` prop instead. |
| Global | N/A | — | `b-filter-bar` | `BentoFilterBar` | — | `<bento-filter-bar :config="filtersConfig" :filter-values="filterValues" @input="filterValues = $event" />` | `ready` | Typically passed as `:filters` prop on `BentoDataGrid`. Use standalone only when no DataGrid is involved. |
| Global | N/A | — | `b-selection-card` | `BentoSelectionCard` | — | `<bento-selection-card v-model="selected" value="option-a" title="Option A" />` | `ready` | `value` prop required. `v-model` returns the selected `value`. Use `BentoSelectionCardGroup` for radio-style single-select. |
| Global | N/A | — | `b-form-layout` | `BentoFormLayout` | — | `<bento-form-layout><bento-input-field … /></bento-form-layout>` | `ready` | Standardises vertical/horizontal spacing of form fields. |
| Global | N/A | — | `b-file-uploader` | `BentoFileUploader` | — | `<bento-file-uploader @upload="onUpload" />` | `ready` | Drag-and-drop file upload area. |
| Global | N/A | — | `b-rich-text-editor` | `BentoRichTextEditor` | — | `<bento-rich-text-editor v-model="content" />` | `ready` | WYSIWYG rich text editor. |

---

## Feedback & Notifications

| Screen / Context | Figma URL | Node ID | Figma Component | Bento Component | Explicit Import | Canonical Usage | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Global | N/A | — | `b-alert` | `BentoAlert` | — | `<bento-alert variant="warning" title="Warning">Description</bento-alert>` | `ready` | Inline alert banner. Variants: `info`, `warning`, `error`, `success`. |
| Global | N/A | — | `b-toast` | `useBentoToastController` (composable) | `import { useBentoToastController } from '@adyen/bento-vue2'` | `const toast = useBentoToastController(); toast.show({ message: 'Saved!' })` | `ready` | Programmatic — use the composable, not a `<bento-toast>` tag. |
| Global | N/A | — | `b-empty-state` | `BentoEmptyState` | — | `<bento-empty-state title="No results" description="…" />` | `ready` | Pass as `:empty-state` prop to `BentoDataGrid` where possible. |
| Global | N/A | — | `b-loading-indicator` | `BentoLoadingIndicator` | — | `<bento-loading-indicator :large="true" />` | `ready` | Pass `:loading` prop to `BentoDataGrid` instead where possible. |
| Global | N/A | — | `b-promo-banner` | `BentoPromoBanner` | `import { BentoImageAspectRatio } from '@adyen/bento-vue2'` | `<bento-promo-banner title="New feature" :image="{ src: img, alt: '', aspectRatio: BentoImageAspectRatio.P16_9 }" :actions="[{ title: 'CTA', event: onClick }]" @dismiss="onDismiss"><template #description><bento-typography>Details</bento-typography></template></bento-promo-banner>` | `ready` | Description goes in `#description` slot (not a prop). `:image` with `aspectRatio` required. `color`: `"grey"` (default), `"green"`, `"blue"`. |

---

## Overlays

| Screen / Context | Figma URL | Node ID | Figma Component | Bento Component | Explicit Import | Canonical Usage | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Global | N/A | — | `b-modal` | `BentoModal` | — | `<bento-modal :is-open="isOpen" :actions="actions" @close-modal="isOpen = false">Title text<template #content>Body</template></bento-modal>` | `ready` | No `v-model` or `title` prop. Title in `#default` slot. Body in `#content`. Buttons via `:actions` array (first = primary). `variant="dialog"` for confirmations. `size`: `"small"`, `"medium"`, `"large"`. |
| Global | N/A | — | `b-modal-fullscreen` | `BentoModalFullscreen` | — | `<bento-modal-fullscreen :is-open="isOpen" @close-modal="isOpen = false">…</bento-modal-fullscreen>` | `ready` | Full-screen overlay. Same `:is-open`/`@close-modal` pattern as `BentoModal`. Verify props with MCP before first use. |
| Global | N/A | — | `b-sidepanel` | `BentoSidepanel` + `BentoSidepanelPage` | — | `<bento-sidepanel :is-open="isOpen" @update:is-open="isOpen = $event"><bento-sidepanel-page title="Details" :actions="actions">Content</bento-sidepanel-page></bento-sidepanel>` | `ready` | No `v-model` or `title` on the outer component. Title + actions go on `BentoSidepanelPage`. Multi-step: add `page-id` to each page and `:active-page.sync` on the sidepanel. |
| Global | N/A | — | `b-popover` | `BentoPopover` | — | `<bento-popover text="Tooltip content"><bento-button>?</bento-button></bento-popover>` | `ready` | Hover/click popover. For ⓘ icon use `BentoInfoIcon` instead. |

---

## Utility

| Screen / Context | Figma URL | Node ID | Figma Component | Bento Component | Explicit Import | Canonical Usage | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Global | N/A | — | `b-pagination` | `BentoPagination` | — | `<bento-pagination v-bind="pagination" @navigate="onNavigate" @items-page="onItemsPerPage" />` | `ready` | Typically passed as `:pagination` prop to `BentoDataGrid`. |
| Global | N/A | — | `b-code-snippet` | `BentoCodeSnippet` | — | `<bento-code-snippet :code="snippet" language="json" />` | `ready` | Syntax-highlighted code block with copy button. |
| Global | N/A | — | `b-tutorial` | `BentoTutorial` | — | `<bento-tutorial :steps="steps" />` | `ready` | Each step: `{ target: ref, title, description, image?: { src, alt }, action?: { title, event }, position? }`. `target` must be a Vue `ref` pointing to the trigger element. |

---

## Templates

| Screen / Context | Figma URL | Node ID | Figma Component | Bento Component | Explicit Import | Canonical Usage | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Global | N/A | — | `b-dashboard-template` | `BentoDashboardTemplate` | — | — | `needs-user-input` | Not found in Bento MCP assets. Verify it exists in the installed package before use. |
| Global | N/A | — | `b-data-grid-template` | `BentoDataGridTemplate` | — | `<bento-data-grid-template><bento-data-grid … /></bento-data-grid-template>` | `ready` | Enables sticky tabs, filters, and pagination. See `DisputesPage.vue`. |

---

## Implementation Snippets

### Header with actions
```vue
<bento-header
  title="Payments"
  :actions="[
    { title: 'Export', variant: 'secondary', event: () => onExport() },
    { title: 'More actions', variant: 'secondary', iconOnly: true, icon: OptionsVerticalIcon, event: () => onMore() },
  ]"
/>
```

### Data grid (full pattern)
```vue
<bento-header title="Payments" :actions="headerActions" />
<bento-data-grid
  :columns="columns"
  :data="filteredData"
  :filters="filtersConfig"
  :filter-values="filterValues"
  :filter-search-config="searchConfig"
  :filter-search-term="searchTerm"
  :pagination="pagination"
  :empty-state="{ title: 'No payments found' }"
  selectable
  fit-content
  column-panel
  :selection="selection"
  @update:selection="selection = $event"
  @update:columns="columns = $event"
  @update:pagination="pagination = $event"
  @update:filter-values="filterValues = $event"
  @update:filter-search-term="searchTerm = $event"
>
  <template #item-amount="{ item }">
    <bento-currency :currency="item.currency" :value="item.amount" />
  </template>
  <template #item-status="{ item }">
    <bento-status :variant="getStatusVariant(item.status)" />
  </template>
</bento-data-grid>
```

### Summary grid (KPI strip)
```vue
<bento-summary-grid>
  <template #cell-1-1>
    <bento-summary-grid-item-amount title="Total processed" label="220.00" currency="EUR" />
  </template>
  <template #cell-1-2>
    <bento-summary-grid-item-numeric title="Auth rate" label="98" trend="2%" trend-direction="positive" />
  </template>
  <template #cell-1-3>
    <bento-summary-grid-item-custom title="Status">
      <bento-status variant="green">Authorized</bento-status>
    </bento-summary-grid-item-custom>
  </template>
</bento-summary-grid>
```

### Structured list (detail section)
```vue
<bento-structured-list layout="33-66">
  <bento-structured-list-item label="PSP reference" copy="ABC123">
    <bento-typography>ABC123</bento-typography>
  </bento-structured-list-item>
  <bento-structured-list-item label="Status">
    <bento-status variant="green">Authorized</bento-status>
  </bento-structured-list-item>
  <bento-structured-list-item label="Amount">
    <bento-currency currency="EUR" :value="22000" />
  </bento-structured-list-item>
  <bento-structured-list-item label="Payment method">
    <bento-payment-method type="visa" label="Visa" />
  </bento-structured-list-item>
</bento-structured-list>
```

### Modal with actions
```vue
<bento-modal
  :is-open="isOpen"
  :actions="[
    { title: 'Delete', event: onConfirm },
    { title: 'Cancel', event: () => { isOpen = false } },
  ]"
  :destructive-actions="true"
  @close-modal="isOpen = false"
>
  Confirm action
  <template #content>
    <p>Are you sure you want to proceed?</p>
  </template>
</bento-modal>
```

### Sidepanel (single page)
```vue
<bento-sidepanel :is-open="isOpen" @update:is-open="isOpen = $event">
  <bento-sidepanel-page
    title="Payment details"
    :actions="[
      { title: 'Save', event: onSave },
      { title: 'Cancel', event: () => { isOpen = false } },
    ]"
  >
    <!-- content here -->
  </bento-sidepanel-page>
</bento-sidepanel>
```

---

### Reusable row template
| Screen / Context | Figma URL | Node ID | Figma Component | Bento Component | Explicit Import | Canonical Usage | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  | `needs-user-input` |  |
