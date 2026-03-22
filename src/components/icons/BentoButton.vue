<template>
  <button
    class="bento-button"
    :class="[
      `bento-button--${variant}`,
      `bento-button--${size}`,
      { 'bento-button--full-width': fullWidth },
    ]"
    :disabled="disabled"
    v-on="$listeners"
  >
    <slot name="iconLeft" />
    <span v-if="$slots.default" class="bento-button__label">
      <slot />
    </span>
    <slot name="iconRight" />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BentoButton',
  inheritAttrs: false,
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (v: string) =>
        ['primary', 'secondary', 'ghost', 'tertiary', 'primary-critical', 'secondary-critical', 'dark'].includes(v),
    },
    size: {
      type: String,
      default: 'medium',
      validator: (v: string) => ['small', 'medium'].includes(v),
    },
    fullWidth: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
});
</script>

<style scoped>
.bento-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--b-spacer-030);
  border: none;
  cursor: pointer;
  border-radius: var(--b-border-radius-m);
  font-family: var(--b-text-body-font-family);
  font-weight: var(--b-text-body-stronger-font-weight);
  transition:
    background-color var(--b-animation-duration-moderate, 0.15s) var(--b-animation-easing-standard, ease),
    color var(--b-animation-duration-moderate, 0.15s) var(--b-animation-easing-standard, ease),
    border-color var(--b-animation-duration-moderate, 0.15s) var(--b-animation-easing-standard, ease);
  white-space: nowrap;
  flex-shrink: 0;
}

.bento-button__label {
  line-height: var(--b-text-body-line-height);
}

/* Sizes */
.bento-button--small {
  font-size: var(--b-text-body-font-size);
  padding: var(--b-spacer-020) var(--b-spacer-040);
  min-height: 28px;
}
.bento-button--medium {
  font-size: var(--b-text-body-font-size);
  padding: var(--b-spacer-030) var(--b-spacer-060);
  min-height: 36px;
}

/* Variants */
.bento-button--primary {
  background-color: var(--b-color-background-inverse-primary);
  color: var(--b-color-label-on-color);
}
.bento-button--primary:hover:not(:disabled) {
  background-color: var(--b-color-background-inverse-primary-hover);
}
.bento-button--primary:active:not(:disabled) {
  background-color: var(--b-color-background-inverse-primary-active);
}

.bento-button--secondary {
  background-color: var(--b-color-background-primary);
  color: var(--b-color-label-primary);
  border: var(--b-border-width-s) solid var(--b-color-outline-secondary);
}
.bento-button--secondary:hover:not(:disabled) {
  background-color: var(--b-color-background-primary-hover);
}
.bento-button--secondary:active:not(:disabled) {
  background-color: var(--b-color-background-primary-active);
}

.bento-button--ghost {
  background-color: transparent;
  color: var(--b-color-label-primary);
}
.bento-button--ghost:hover:not(:disabled) {
  color: var(--b-color-label-primary-hover, var(--b-color-label-primary));
  background-color: var(--b-color-background-primary-hover);
}

.bento-button--tertiary {
  background-color: transparent;
  color: var(--b-color-label-primary);
}
.bento-button--tertiary:hover:not(:disabled) {
  color: var(--b-color-label-primary-hover, var(--b-color-label-primary));
}

.bento-button--primary-critical {
  background-color: var(--b-color-background-critical-strong);
  color: var(--b-color-label-on-color);
}
.bento-button--primary-critical:hover:not(:disabled) {
  background-color: var(--b-color-background-critical-strong-hover);
}

.bento-button--secondary-critical {
  background-color: var(--b-color-background-primary);
  color: var(--b-color-label-critical);
  border: var(--b-border-width-s) solid var(--b-color-outline-critical);
}

.bento-button--dark {
  background-color: var(--b-color-background-inverse-primary);
  color: var(--b-color-label-on-color);
}
.bento-button--dark:hover:not(:disabled) {
  background-color: var(--b-color-background-inverse-primary-hover);
}
.bento-button--dark:active:not(:disabled) {
  background-color: var(--b-color-background-inverse-primary-active);
}

/* Disabled */
.bento-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Full width */
.bento-button--full-width {
  width: 100%;
}
</style>
