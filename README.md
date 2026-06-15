# IPP Design Prototype

In-Person Payments prototype built with **Vue 2** and **Bento** design system components.

## Pages

- **Payment Devices** — Terminals & Mobile devices data grid with filters, bulk actions, assignment status popover, and assign confirmation modal
- **Device Settings** — P2PE configuration with toggle, alerts (Company/Store), info tooltip, and confirmation modal

## Prerequisites

- **Node.js** ≥ 18
- Access to the **Adyen npm registry** for `@adyen/bento-*` packages

## Getting Started

```bash
# Clone the repository
git clone https://github.com/evahan-hub/IPP-Design.git
cd IPP-Design

# Install dependencies (requires Adyen npm registry access)
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run dev:psp` | Start dev server and open PSP view |
| `npm run dev:bp` | Start dev server and open Balance Platform view |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |

## Tech Stack

- **Vue 2.7** with `<script lang="ts" setup>`
- **Bento Vue 2** (`@adyen/bento-vue2`) — Adyen design system
- **Vite 5** — Build tool
- **TypeScript**
- **SCSS** with BEM naming convention
