<template>
  <div
    class="icon-wrapper"
    :class="wrapperClass"
    :style="wrapperStyle"
  >
    <div :style="innerStyle">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'IconWrapper',
  props: {
    color: { type: String, default: 'currentColor' },
    size: { type: Number, default: 16 },
  },
  computed: {
    wrapperClass(): string {
      return 'relative overflow-hidden shrink-0 inline-flex items-center justify-center';
    },
    wrapperStyle(): Record<string, string> {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        '--fill-0': this.color,
      };
    },
    innerStyle(): Record<string, string | undefined> {
      const scale = this.size / 16;
      return {
        position: 'relative',
        width: '16px',
        height: '16px',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      };
    },
  },
});
</script>
