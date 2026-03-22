<template>
  <div
    class="relative overflow-hidden shrink-0 inline-flex items-center justify-center"
    :style="{ width: size + 'px', height: size + 'px', '--fill-0': color }"
  >
    <div style="position: relative; width: 16px; height: 16px">
      <div class="absolute inset-[18.75%]">
        <svg class="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <path d="M9.06066 0L5 4.06066L0.93934 0L0 0.93934L4.06066 5L0 9.06066L0.93934 10L5 5.93934L9.06066 10L10 9.06066L5.93934 5L10 0.93934L9.06066 0Z" fill="var(--fill-0, #001222)" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'IconCross',
  props: {
    color: { type: String, default: 'currentColor' },
    size: { type: Number, default: 16 },
  },
});
</script>
