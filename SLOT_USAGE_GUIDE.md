# Vue Pages Slot System - Usage Guide

## Overview
All Vue pages have been refactored to include a slot system that allows you to implement custom details views while maintaining the default overview content.

## How It Works

Each page now has two modes:
1. **Default Overview Mode** - Shows the standard info cards
2. **Details View Mode** - Shows custom content via slot

## Template Structure

```vue
<template>
  <div class="page-name">
    <div class="page-header">
      <h1>Page Title</h1>
      <p>Page description</p>
    </div>
    
    <!-- Default Overview Content -->
    <div v-if="!$slots.details" class="content-section">
      <!-- Default info cards -->
    </div>
    
    <!-- Details View Slot -->
    <div v-else class="details-view">
      <slot name="details"></slot>
    </div>
  </div>
</template>
```

## Usage Examples

### Example 1: Using Default Overview
```vue
<template>
  <InvoicesPage />
</template>
```

### Example 2: Using Custom Details View
```vue
<template>
  <InvoicesPage>
    <template #details>
      <div class="custom-invoice-details">
        <h2>Invoice #12345</h2>
        <p>Customer: Acme Corp</p>
        <p>Amount: $5,000.00</p>
        <p>Status: Paid</p>
        
        <!-- Your custom invoice details here -->
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Service A</td>
              <td>10</td>
              <td>$500.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </InvoicesPage>
</template>
```

### Example 3: Dynamic Details View
```vue
<template>
  <div>
    <InvoicesPage v-if="!showDetails" />
    
    <InvoicesPage v-else>
      <template #details>
        <InvoiceDetailsComponent :invoice-id="selectedInvoiceId" />
      </template>
    </InvoicesPage>
    
    <button @click="showDetails = !showDetails">
      {{ showDetails ? 'Back to Overview' : 'View Details' }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDetails: false,
      selectedInvoiceId: null
    }
  }
}
</script>
```

## Pages Refactored

The following pages have been updated with the slot system:

### Finance Pages
- ✅ InvoicesPage.vue
- ✅ BalancesOverviewPage.vue
- ✅ HomePage.vue

### How to Apply to Other Pages

To apply this pattern to other pages:

1. **Update Template:**
```vue
<!-- Replace the content-section with: -->
<div v-if="!$slots.details" class="content-section">
  <!-- Keep existing info cards -->
</div>

<div v-else class="details-view">
  <slot name="details"></slot>
</div>
```

2. **Add CSS:**
```css
.details-view {
  width: 100%;
}
```

## Benefits

- **Flexible:** Keep default overview or provide custom details
- **Reusable:** Same page component can serve multiple purposes
- **Maintainable:** Default content preserved, custom content optional
- **Consistent:** Page header and structure remain the same
- **Dynamic:** Switch between views programmatically

## Next Steps

1. Apply this pattern to remaining pages
2. Create details components for specific use cases
3. Implement navigation between overview and details views
4. Add routing support for detail views
