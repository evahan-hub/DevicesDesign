<template>
  <label class="bento-checkbox" :class="{ 'bento-checkbox--checked': modelValue }">
    <input
      type="checkbox"
      class="bento-checkbox__input"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      v-bind="$attrs"
    />
    <span class="bento-checkbox__checkmark"></span>
    <span v-if="$slots.default" class="bento-checkbox__label">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BentoCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
});
</script>

<style scoped>
.bento-checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--b-spacer-040, 8px);
  cursor: pointer;
  position: relative;
  user-select: none;
}

.bento-checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.bento-checkbox__checkmark {
  height: 16px;
  width: 16px;
  background-color: var(--b-color-background-primary, #fff);
  border: 2px solid var(--b-color-label-primary, #000);
  border-radius: 3px;
  position: relative;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.bento-checkbox__checkmark::after {
  content: '';
  position: absolute;
  display: none;
  left: 3px;
  top: -1px;
  width: 5px;
  height: 10px;
  border: solid var(--b-color-background-primary, #fff);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  transition: all 0.15s ease;
}

.bento-checkbox--checked .bento-checkbox__checkmark {
  background-color: var(--b-color-label-primary, #000);
  border-color: var(--b-color-label-primary, #000);
}

.bento-checkbox--checked .bento-checkbox__checkmark::after {
  display: block;
}

.bento-checkbox:hover .bento-checkbox__checkmark {
  border-color: var(--b-color-label-primary, #000);
  opacity: 0.8;
}

.bento-checkbox__label {
  font-family: var(--b-text-body-font-family, system-ui);
  font-size: var(--b-text-body-font-size, 14px);
  color: var(--b-color-label-primary, #000);
}
</style>
