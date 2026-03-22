<template>
  <label class="bento-radio" :class="{ 'bento-radio--checked': isChecked }">
    <input
      type="radio"
      class="bento-radio__input"
      :name="name"
      :value="value"
      :checked="isChecked"
      @change="$emit('update:modelValue', value)"
      v-bind="$attrs"
    />
    <span class="bento-radio__outer">
      <span class="bento-radio__inner" />
    </span>
    <span v-if="$slots.default" class="bento-radio__label">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BentoRadio',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      required: true,
    },
    value: {
      type: [String, Number, Boolean],
      required: true,
    },
    name: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  computed: {
    isChecked(): boolean {
      return this.modelValue === this.value;
    },
  },
});
</script>

<style scoped>
.bento-radio {
  display: inline-flex;
  align-items: center;
  gap: var(--b-spacer-040, 8px);
  cursor: pointer;
  user-select: none;
}

.bento-radio__input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.bento-radio__outer {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--b-color-outline-primary, #8c959d);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s ease;
}

.bento-radio__inner {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.15s ease;
}

.bento-radio--checked .bento-radio__outer {
  border-color: var(--b-color-label-highlight, #0066ff);
}

.bento-radio--checked .bento-radio__inner {
  background: var(--b-color-label-highlight, #0066ff);
}

.bento-radio__label {
  font-family: var(--b-text-body-font-family, system-ui);
  font-size: var(--b-text-body-font-size, 14px);
  color: var(--b-color-label-primary, #001222);
}
</style>
