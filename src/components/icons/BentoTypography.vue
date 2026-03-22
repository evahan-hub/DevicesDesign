<template>
  <component
    :is="tag"
    class="bento-typography"
    :class="[
      `bento-typography--${variant}`,
      { 'bento-typography--stronger': stronger },
      { 'bento-typography--secondary': secondary },
      { 'bento-typography--tertiary': tertiary },
      { 'bento-typography--success': color === 'success' },
      { 'bento-typography--critical': color === 'critical' },
      { 'bento-typography--warning': color === 'warning' },
      { 'bento-typography--primary': color === 'primary' },
    ]"
    :style="{ textAlign: align }"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'BentoTypography',
  props: {
    variant: {
      type: String,
      default: 'body',
      validator: (value: string) => ['title', 'title-s', 'body', 'caption'].includes(value),
    },
    stronger: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    tertiary: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'tertiary', 'success', 'critical', 'warning'].includes(value),
    },
    align: {
      type: String,
      default: 'left',
      validator: (value: string) => ['left', 'center', 'right'].includes(value),
    },
    el: {
      type: String,
      default: 'span',
    },
  },
  setup(props) {
    const tag = computed(() => {
      if (props.el) return props.el;
      switch (props.variant) {
        case 'title':
          return 'h1';
        case 'title-s':
          return 'h3';
        case 'body':
          return 'span';
        case 'caption':
          return 'span';
        default:
          return 'span';
      }
    });

    return { tag };
  },
});
</script>

<style scoped>
.bento-typography {
  font-family: var(--b-text-body-font-family, system-ui);
  color: var(--b-color-label-primary, #000);
  margin: 0;
}

.bento-typography--title {
  font-size: var(--b-text-title-font-size, 24px);
  font-weight: var(--b-text-title-font-weight, 700);
  line-height: 1.2;
}

.bento-typography--title-s {
  font-size: var(--b-text-title-s-font-size, 18px);
  font-weight: var(--b-text-title-s-font-weight, 600);
  line-height: 1.3;
}

.bento-typography--body {
  font-size: var(--b-text-body-font-size, 14px);
  font-weight: var(--b-text-body-font-weight, 400);
  line-height: 1.4;
}

.bento-typography--caption {
  font-size: var(--b-text-caption-font-size, 12px);
  font-weight: var(--b-text-caption-font-weight, 400);
  line-height: 1.4;
}

.bento-typography--stronger {
  font-weight: var(--b-text-body-stronger-font-weight, 600);
}

.bento-typography--secondary {
  color: var(--b-color-label-secondary, #666);
}

.bento-typography--tertiary {
  color: var(--b-color-label-tertiary, #999);
}

.bento-typography--success {
  color: var(--b-color-label-success, #28a745);
}

.bento-typography--critical {
  color: var(--b-color-label-critical, #dc3545);
}

.bento-typography--warning {
  color: var(--b-color-label-warning, #ffc107);
}

.bento-typography--primary {
  color: var(--b-color-label-primary, #000);
}
</style>
