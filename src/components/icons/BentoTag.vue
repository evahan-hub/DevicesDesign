<template>
  <span
    class="bento-tag"
    :class="`bento-tag--${variant}`"
  >
    {{ label }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BentoTag',
  props: {
    variant: {
      type: String,
      default: 'grey',
      validator: (value: string) =>
        ['grey', 'green', 'orange', 'red', 'blue', 'teal'].includes(value),
    },
    label: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped>
.bento-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: var(--b-border-radius-s, 4px);
  font-family: var(--b-text-caption-font-family, system-ui);
  font-size: var(--b-text-caption-font-size, 12px);
  font-weight: 500;
  white-space: nowrap;
  line-height: var(--b-text-caption-line-height, 1.4);
}

.bento-tag--grey {
  background-color: var(--b-color-background-secondary, #f1f3f5);
  color: var(--b-color-label-secondary, #495057);
}

.bento-tag--green {
  background-color: rgba(40, 167, 69, 0.1);
  color: var(--b-color-label-success, #1e7e34);
}

.bento-tag--orange {
  background-color: rgba(255, 152, 0, 0.12);
  color: var(--b-color-label-warning, #e65100);
}

.bento-tag--red {
  background-color: rgba(220, 53, 69, 0.1);
  color: var(--b-color-label-critical, #c82333);
}

.bento-tag--blue {
  background-color: rgba(0, 123, 255, 0.1);
  color: var(--b-color-label-info, #0056b3);
}

.bento-tag--teal {
  background-color: rgba(32, 178, 170, 0.1);
  color: #0d7377;
}
</style>
