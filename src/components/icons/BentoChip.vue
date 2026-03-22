<template>
  <span
    class="bento-chip"
    :class="[
      `bento-chip--${variant}`,
      `bento-chip--${size}`,
    ]"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BentoChip',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'success', 'critical', 'warning'].includes(value),
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => ['small', 'medium'].includes(value),
    },
  },
});
</script>

<style scoped>
.bento-chip {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 12px;
  font-family: var(--b-text-caption-font-family, system-ui);
  font-size: var(--b-text-caption-font-size, 12px);
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid;
}

.bento-chip--small {
  padding: 1px 6px;
  font-size: 10px;
}

.bento-chip--primary {
  background-color: var(--b-color-background-primary-weak, #f8f9fa);
  color: var(--b-color-label-primary, #000);
  border-color: var(--b-color-outline-primary, #dee2e6);
}

.bento-chip--secondary {
  background-color: var(--b-color-background-secondary, #e9ecef);
  color: var(--b-color-label-secondary, #495057);
  border-color: var(--b-color-outline-secondary, #ced4da);
}

.bento-chip--success {
  background-color: rgba(40, 167, 69, 0.1);
  color: var(--b-color-label-success, #28a745);
  border-color: rgba(40, 167, 69, 0.3);
}

.bento-chip--critical {
  background-color: rgba(220, 53, 69, 0.1);
  color: var(--b-color-label-critical, #dc3545);
  border-color: rgba(220, 53, 69, 0.3);
}

.bento-chip--warning {
  background-color: rgba(255, 193, 7, 0.1);
  color: var(--b-color-label-warning, #ffc107);
  border-color: rgba(255, 193, 7, 0.3);
}
</style>
