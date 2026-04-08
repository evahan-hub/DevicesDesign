---
description: Implement a Figma design as production-aligned Bento Vue 2 code
---

## Figma → Bento Vue 2 Implementation Workflow

Use this workflow when a designer provides a Figma URL and wants it implemented as Bento Vue 2 code that engineers can reference from the production `adyen-main/ui/vue` codebase.

### Step 1: Read the standards
Read `SKILL.md` at the project root to load all critical rules before doing any implementation work.
Also read `docs/figma-bento-component-map.md` to check if any components in the design are already mapped.

### Step 2: Fetch the Figma design
Call the Figma MCP `get_design_context` tool using the URL provided by the designer.
- Extract `fileKey` from the URL segment after `/design/`
- Extract `nodeId` from `?node-id=1-2` → convert to `1:2`
- Set `clientFrameworks: "vue"` and `clientLanguages: "typescript,html,css"`

If the design is complex or contains sub-sections, also call `get_metadata` to understand the component tree.

### Step 3: Map Figma components → Bento components
For each UI element in the Figma output:
1. Look up `docs/figma-bento-component-map.md` for an existing mapping.
2. If not found, call Bento MCP `get_component([componentName])` for the exact API (props, slots, emits).
3. Document any new mappings in `docs/figma-bento-component-map.md` before implementing.

Escalation: If a Figma element has no clear Bento equivalent, ask the user before building a custom component.

### Step 4: Determine target file location
Following the production co-location pattern, the view should live at:
```
src/views/{domain}/{view-name}/
  {view-name}.vue
  {view-name}.types.ts
  mock-data.ts
  messages.json
  components/   (if view-specific subcomponents are needed)
```

If the view is simple and already exists as a single file, update it in place.

### Step 5: Implement the view
Follow all Critical Rules from `SKILL.md`:
- Use `<script lang="ts" setup>` — NOT `Vue.extend()`
- Import all Bento components explicitly — NO `components: {}`
- Use `b-margin-*` / `b-padding-*` utility classes for spacing in template
- Use `var(--b-text-*)` tokens for typography (verify against `src/styles/bento-tokens.css`)
- Use `var(--b-color-*)` tokens for colors
- SCSS with BEM and view-level prefix, `lang="scss" scoped`
- Scope any `::v-deep` overrides to a local class on that specific component instance

### Step 6: Add supporting files
// turbo
Create `messages.json` alongside the view file with all UI strings in `en-US` format:
```json
{ "en-US": { "keyName": "String value" } }
```

### Step 7: Validate
Check the browser console for:
- No `[Vue warn]: Unknown custom element` errors
- No missing token warnings

Verify visually against the Figma screenshot returned in Step 2.
