# SKILL: Figma Design -> Bento Vue 2 Code

## Purpose
Turn a Figma screen/component or a direct Bento component request into production-aligned Bento Vue 2 code in this prototype. Code produced here should be directly referenceable by engineers working in the production `adyen-main/ui/vue` codebase.

## Scope
- Figma UI analysis via Figma MCP
- Mapping Figma components to Bento components
- Implementing Vue 2 pages/components with Bento
- Verifying visual and interaction parity

## Stack (verified from package.json)
- **Vue 2.7** + TypeScript — supports `<script lang="ts" setup>` natively
- `@adyen/bento-vue2` (v1.84.1) — all Bento components
- `@adyen/ui-assets-icons-16` — icon imports
- `vue-i18n@8` — i18n (installed, use `messages.json` pattern)
- `vue-router@3` — named routes, `useRouter()` / `useRoute()`
- `@vue/composition-api` — Composition API composables
- Design tokens defined in `src/styles/bento-tokens.css` — source of truth for all `--b-*` tokens

## Companion Files
- `docs/figma-bento-component-map.md` — source-of-truth Figma→Bento component mapping
- `src/styles/bento-tokens.css` — all available CSS custom properties
- `adyen-main/ui/vue/AGENTS.md` — production coding standards to align with

---

## Critical Rules (align with production AGENTS.md)

### 1. Script API — ALWAYS use `<script lang="ts" setup>`
```vue
<!-- ✅ Correct — matches production pattern -->
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { BentoButton, BentoCard } from '@adyen/bento-vue2';
import DownloadIcon from '@adyen/ui-assets-icons-16/vue/download';
</script>

<!-- ❌ Wrong — do not use Vue.extend() Options API for new views -->
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({ components: { ... } });
</script>
```

### 2. Bento component registration — explicit import, NO `components: {}`
With `<script setup>`, imported components are **automatically available** in the template. No `components: {}` needed.
```vue
<script lang="ts" setup>
import { BentoButton, BentoAlert, BentoCard } from '@adyen/bento-vue2';
// All three are now usable in template as <bento-button>, <bento-alert>, <bento-card>
</script>
```
> ⚠️ `Vue.use(BentoVue)` global registration is unreliable in this project. Always import explicitly.

### 3. Spacing — prefer utility classes over custom CSS
```vue
<!-- ✅ Correct -->
<div class="b-margin-bottom-060 b-padding-x-090">...</div>

<!-- ❌ Avoid — only use var(--b-spacer-*) in SCSS for complex layout (flex gap, grid, etc.) -->
<div style="margin-bottom: var(--b-spacer-060)">...</div>
```
Utility class scale: `000`=0 `010`=2px `020`=4px `030`=6px `040`=8px `050`=10px `060`=12px `070`=16px `080`=20px `090`=24px `100`=32px

### 4. Typography tokens — use `--b-text-*`, NOT `--b-font-size-*`
`--b-font-size-*` tokens are internal to Bento components and NOT available in consuming views. Always use:
```css
font-size: var(--b-text-caption-font-size);   /* 12px */
font-size: var(--b-text-body-font-size);      /* 14px */
font-size: var(--b-text-title-font-size);     /* 16px */
font-size: var(--b-text-title-m-font-size);   /* 20px */
font-size: var(--b-text-title-l-font-size);   /* 24px */
```
Verify any token against `src/styles/bento-tokens.css` before using.

### 5. SCSS — BEM with view-level prefix, scoped
```vue
<style lang="scss" scoped>
.inv {
  &__header { ... }
  &__meta { display: flex; gap: var(--b-spacer-070); }
  &__summary { background-color: var(--b-color-background-secondary); }
}
</style>
```

### 6. `::v-deep` overrides — only when no Bento prop exists, scope tightly
```css
/* ✅ Scoped to specific instance via local class */
.inv-alert ::v-deep .b-alert__description { max-width: none; }

/* ❌ Global override — never do this */
::v-deep .b-alert__description { max-width: none; }
```

### 7. File co-location — match production view structure
```
src/views/finance/invoice-detail/
  invoice-detail.vue          ← main view
  invoice-detail.types.ts     ← TypeScript interfaces
  mock-data.ts                ← mock data / utils (replaces useAsyncState in prototype)
  messages.json               ← i18n strings (en-US only)
  components/                 ← view-specific subcomponents
```

### 8. i18n — add `messages.json` for all UI strings
```json
{
  "en-US": {
    "invoiceSummary": "Invoice summary",
    "downloadInvoice": "Download Invoice",
    "fxRate": "FX rate"
  }
}
```
Even if full `useNewI18n` isn't wired, the file lets engineers directly port strings to production.

---

## Workflow

### 0) Identify request mode
- **Design-driven**: user provides a Figma link/node → go to step 2A
- **Code-driven**: user describes component/intent directly → go to step 2B

### 1) Check existing mappings first (both modes)
- Read `docs/figma-bento-component-map.md` before any implementation.
- Reuse canonical patterns from the map. Do not reinvent mapped components.
- If no mapping exists, proceed to Bento MCP discovery, then add a new row.

### 2A) Design-driven flow (Figma)
1. Call Figma MCP `get_design_context` for the target node (extract `fileKey` and `nodeId` from URL).
2. If needed, call `get_metadata` to explore child component hierarchy.
3. Capture: layout structure, variants/states, spacing, typography, icon names.
4. Call Bento MCP `get_component([...])` for each matched component to confirm exact API.
5. Update `docs/figma-bento-component-map.md` with any new Figma→Bento mappings.
6. Implement using correct patterns (see Critical Rules above).

**Escalation rule:** If Figma→Bento mapping is unclear or Code Connect is missing, stop and ask the user before implementing.

### 2B) Code-driven flow (no Figma)
1. Check `docs/figma-bento-component-map.md` for existing pattern.
2. If not found, call Bento MCP `get_component([componentName])` for exact API.
3. Check `src/views/` for existing usage patterns in the codebase.
4. Add/update mapping row (`Figma URL = N/A`) before implementing.

### 3) Implement
Implementation checklist:
- [ ] Use `<script lang="ts" setup>` 
- [ ] Import all Bento components and icons explicitly
- [ ] Use `b-margin-*` / `b-padding-*` utility classes for spacing in template
- [ ] Use `var(--b-text-*)` tokens for typography in CSS
- [ ] Use `var(--b-color-*)` tokens for colors
- [ ] Use `var(--b-spacer-*)` only in SCSS for layout where no utility class applies
- [ ] Add `messages.json` for all hardcoded strings
- [ ] Extract TypeScript types to `.types.ts`
- [ ] Extract mock data/utils to `mock-data.ts` or `utils.ts`
- [ ] SCSS uses BEM with view-level prefix and `lang="scss" scoped`
- [ ] No `::v-deep` overrides without local class scoping

### 4) Validate
- No `[Vue warn]: Unknown custom element` errors in console
- No `--b-font-size-*` tokens used in scoped CSS (use `--b-text-*` instead)
- All actions clickable and wired
- Visual parity with Figma design

### 5) Accessibility checks
- Icon-only buttons have meaningful `svg-title` on the icon
- Button hierarchy respected: `primary` → `secondary` → `tertiary`
- No multiple competing primary buttons in one view

---

## Reusable Examples

### Button with icon
```vue
<bento-button variant="secondary" @click="onExport">
  <template #iconLeft>
    <download-icon svg-title="Download" />
  </template>
  Export
</bento-button>
```

### Alert (informational)
```vue
<bento-alert type="highlight">
  <template #description>
    Invoice based on transactions from <strong>Sep 1 through Oct 1</strong>.
  </template>
</bento-alert>
```
Alert types: `highlight` (blue/info) | `warning` | `critical` | `success`. Variant: `default` (with title) | `tip` (compact).

### Card with content
```vue
<bento-card>
  <template #default>Card title</template>
  <template #description>Subtitle</template>
  <template #content>
    <bento-structured-list>
      <bento-structured-list-item label="Status">
        <bento-status variant="green">Active</bento-status>
      </bento-structured-list-item>
    </bento-structured-list>
  </template>
</bento-card>
```

### Layout grid (4-8 split)
```vue
<bento-layout size="full-width">
  <bento-layout-row columns-layout="4-8">
    <template #col-1>Left content</template>
    <template #col-2>Right content</template>
  </bento-layout-row>
</bento-layout>
```
Column layouts: `3-9` | `4-8` | `6-6` | `8-4` | `9-3`

### Tabs
```vue
<bento-tabs :active-tab-index="activeTab" @select:tab="activeTab = $event">
  <bento-tab label="Fee types">...</bento-tab>
  <bento-tab label="Merchant accounts">...</bento-tab>
</bento-tabs>
```

### Script setup with mock data
```vue
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { BentoCard, BentoButton } from '@adyen/bento-vue2';
import type { InvoiceDetail } from './invoice-detail.types';
import { MOCK_INVOICES } from './mock-data';
import { useRoute } from 'vue-router/composables';

const route = useRoute();
const invoice = computed<InvoiceDetail>(() =>
  MOCK_INVOICES[route.params.id as string] ?? MOCK_INVOICES['10453']
);
</script>
```

---

## Definition of Done
- Figma/code intent is mapped to Bento components in `docs/figma-bento-component-map.md`
- UI visually aligns with target design
- `<script lang="ts" setup>` used
- No `[Vue warn]` errors in console
- Typography uses `--b-text-*` tokens, spacing uses utility classes where possible
- `messages.json` added for all UI strings
- Types extracted to `.types.ts`, mock data to `mock-data.ts`
- No lookalike custom UI when an equivalent Bento component exists
