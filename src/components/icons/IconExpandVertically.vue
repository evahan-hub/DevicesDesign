<template>
  <div
    class="relative overflow-hidden shrink-0 inline-flex items-center justify-center"
    :style="{ width: size + 'px', height: size + 'px', '--fill-0': color }"
  >
    <div style="position: relative; width: 16px; height: 16px">
      <div class="absolute" style="inset: 12.12% 24.62%">
        <svg class="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 8.12155 12.1215">
          <g>
            <path d="M4.06066 2.12132L7.06066 5.12132L8.12132 4.06066L4.06066 0L0 4.06066L1.06066 5.12132L4.06066 2.12132Z" fill="var(--fill-0, #001222)" />
            <path d="M4.06089 10.0002L1.06089 7.00023L0.000226974 8.06089L4.06089 12.1215L8.12155 8.06089L7.06089 7.00023L4.06089 10.0002Z" fill="var(--fill-0, #001222)" />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'IconExpandVertically',
  props: {
    color: { type: String, default: 'currentColor' },
    size: { type: Number, default: 16 },
  },
});
</script>
