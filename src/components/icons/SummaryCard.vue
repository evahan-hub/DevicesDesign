<template>
  <div
    class="flex-1"
    :style="{
      border: 'var(--b-border-width-s) solid var(--b-color-separator-primary)',
      borderRadius: 'var(--b-border-radius-l)',
      padding: 'var(--b-spacer-060)',
      backgroundColor: 'var(--b-color-background-primary)',
    }"
  >
    <p
      :style="{
        fontFamily: 'var(--b-text-caption-font-family)',
        fontSize: 'var(--b-text-caption-font-size)',
        fontWeight: 'var(--b-text-body-stronger-font-weight)',
        color: 'var(--b-color-label-secondary)',
        margin: 0,
        marginBottom: 'var(--b-spacer-020)',
      }"
    >
      {{ title }}
    </p>
    <p
      :style="{
        fontFamily: 'var(--b-text-heading-m-font-family)',
        fontSize: 'var(--b-text-heading-m-font-size)',
        fontWeight: 'var(--b-text-heading-m-font-weight)',
        lineHeight: 'var(--b-text-heading-m-line-height)',
        color: 'var(--b-color-label-primary)',
        margin: 0,
        marginBottom: 'var(--b-spacer-020)',
      }"
    >
      {{ value }}
    </p>
    <div class="flex items-center" :style="{ gap: 'var(--b-spacer-020)' }">
      <span
        :style="{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: statusColor,
          flexShrink: 0,
        }"
      />
      <span
        :style="{
          fontFamily: 'var(--b-text-caption-font-family)',
          fontSize: 'var(--b-text-caption-font-size)',
          color: statusColor,
        }"
      >
        {{ statusLabel }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SummaryCard',
  props: {
    title: { type: String, required: true },
    value: { type: String, required: true },
    status: { type: String, default: 'matched' },
    statusLabel: { type: String, default: '' },
  },
  computed: {
    statusColor(): string {
      switch (this.status) {
        case 'matched': return 'var(--b-color-label-positive)';
        case 'warning': return 'var(--b-color-label-warning)';
        case 'pending': return 'var(--b-color-label-warning)';
        case 'error': return 'var(--b-color-label-critical)';
        default: return 'var(--b-color-label-secondary)';
      }
    },
  },
});
</script>
