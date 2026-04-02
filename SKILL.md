# SKILL: Figma Design -> Bento Code Components

## Purpose
Use this skill to turn either (a) a Figma screen/component or (b) a direct Bento component request into production-ready Bento Vue 2 code in this repository.

## Scope
- Figma UI analysis
- Mapping Figma components to Bento components
- Implementing Vue 2 pages/components with Bento
- Verifying visual and interaction parity

## Stack Assumptions
- Vue `2.x` + TypeScript
- `@adyen/bento-vue2`
- `@adyen/ui-assets-icons-16`
- Vue Router (named routes)
- Global Bento registration in `src/main.ts` via `Vue.use(BentoVue)`

## Inputs Required
### Design-driven input (with Figma)
1. Figma URL or selected Figma node(s)
2. Target file(s) to update
3. Desired behavior (navigation, actions, filter behavior, data states)

### Code-driven input (without Figma)
1. Requested Bento component or intent (example: "build this card using bento card")
2. Target file(s) to update
3. Desired behavior/data states

## Companion Files
- `docs/figma-bento-component-map.md` (source-of-truth component mapping)
- `SKILL.md` (implementation workflow and standards)

---

## Workflow

### 0) Identify request mode
- `Design-driven`: user provides a Figma link/node.
- `Code-driven`: user asks directly to use a Bento component without Figma.

### 1) Check existing mappings first (both modes)
- Open `docs/figma-bento-component-map.md` before doing implementation work.
- Reuse existing mapped component patterns whenever possible.
- If no mapping exists, use Bento MCP to discover the best component and then add a new mapping row.

### 2A) Design-driven flow (Figma)
- Use Figma MCP `get_design_context` for the target node.
- If needed, use `get_metadata` to discover children and component hierarchy.
- Capture:
  - Layout structure (header, toolbar, content, sections)
  - Variants and states (buttons, tabs, filters)
  - Spacing, typography, and icon usage
- Use Bento MCP `get_all_components` to verify available components.
- Use Bento MCP `get_component([...])` for exact API/details of chosen components.
- Confirm required props, slots, emits, and variant names before coding.
- Build/update mapping table (Figma -> Bento) before implementation.

Escalation rule:
- If Figma -> code mapping is unclear (for example, missing or weak Code Connect), stop and ask the user exactly what should be connected before implementing.

### 2B) Code-driven flow (no Figma)
- Parse the requested Bento component intent from the user request.
- Check `docs/figma-bento-component-map.md` for an existing canonical pattern.
- If not found, use Bento MCP:
  - `get_all_components` to locate the component family
  - `get_component([...])` to validate props, slots, emits, and variants
- If still ambiguous, inspect package/component exports in the repo and existing usage patterns in code.
- If multiple valid component choices remain, ask the user to choose before implementing.
- Add/update a mapping row with `Figma URL = N/A (direct request)` so future requests can reuse it.

Example mapping format:

| Figma element | Bento component | Notes |
| --- | --- | --- |
| Primary action button | `BentoButton` | `variant="primary"` |
| Secondary action button | `BentoButton` | `variant="secondary"` |
| Icon-only overflow action | `BentoButton` | icon in `iconLeft` slot + accessible `svg-title` |
| Header section | `BentoHeader` | use `:actions` for top-right controls |
| Tabbed container | `BentoTabs` / `BentoTab` | use active index binding |
| Data table | `BentoDataGrid` | wire filters, pagination, selection |

### 4) Implement in Vue 2 component
- Match existing project patterns and naming.
- Use Bento components directly; avoid custom replacement widgets if Bento exists.
- Keep logic in Options API and strongly typed where possible.

Implementation checklist:
- Confirm `src/main.ts` includes `Vue.use(BentoVue)` so Bento components are globally available
- Register/import required Bento components and icons
- Add toolbar/header actions with explicit handlers
- Wire router navigation (`this.$router.push(...)`) for back/action buttons
- Add/merge styles only where needed for Figma parity
- Keep changes minimal and scoped to requested page

### 5) Validate behavior
- Verify page renders without unknown element/runtime errors.
- Verify actions are clickable and wired.
- Verify responsive behavior and spacing.
- Verify table filtering/sorting/pagination state updates as expected.

### 6) Accessibility and UX checks
- Icon-only buttons must have meaningful icon `svg-title`.
- Preserve button hierarchy (`primary` vs `secondary` vs `tertiary`).
- Avoid multiple competing primary buttons in one view.

---

## Reusable Examples

### Button examples
```vue
<bento-button variant="primary" @click="onSave">Save</bento-button>

<bento-button variant="secondary" @click="onExport">Export</bento-button>

<bento-button variant="secondary" @click="onMore">
  <template #iconLeft>
    <options-vertical-icon svg-title="More actions" />
  </template>
</bento-button>
```

### Header actions pattern
```vue
<bento-header title="Payments" :actions="headerActions" />
```

```ts
data() {
  return {
    headerActions: [
      { title: 'Export', variant: 'secondary', event: () => this.onExport() },
      {
        title: 'More actions',
        variant: 'secondary',
        iconOnly: true,
        icon: OptionsVerticalIcon,
        event: () => this.onMoreActions()
      }
    ]
  };
}
```

---

## Definition of Done
- Design intent (Figma or direct code request) is mapped to Bento components
- UI visually aligns with target design
- Interactions are implemented and testable
- No Bento runtime/registration errors in console
- Code follows existing project conventions
- No lookalike custom UI is introduced when an equivalent Bento component exists
