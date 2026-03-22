<template>
  <div
    class="relative overflow-hidden shrink-0 inline-flex items-center justify-center"
    :style="{ width: size + 'px', height: size + 'px', '--fill-0': color }"
  >
    <div :style="{ position: 'relative', width: '16px', height: '16px', transform: size !== 16 ? `scale(${size / 16})` : undefined }">
      <div class="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2" style="width: 12.121px; height: 7.121px">
        <svg class="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1213 7.12132">
          <path d="M11.0607 7.12132L6.06066 2.12132L1.06066 7.12132L0 6.06066L6.06066 0L12.1213 6.06066L11.0607 7.12132Z" fill="var(--fill-0, #001222)" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'IconChevronUp',
  props: {
    color: { type: String, default: 'currentColor' },
    size: { type: Number, default: 16 },
  },
});
</script>
