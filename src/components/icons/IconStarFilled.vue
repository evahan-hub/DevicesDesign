<template>
  <div
    class="relative overflow-hidden shrink-0 inline-flex items-center justify-center"
    :style="{ width: size + 'px', height: size + 'px', '--fill-0': color }"
  >
    <div style="position: relative; width: 16px; height: 16px">
      <div class="absolute" style="inset: 1.56%">
        <svg class="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 16 15">
          <path d="M8 0L10.1213 5.05573L15.6085 5.52786L11.4 9.19427L12.7023 14.4721L8 11.6L3.29772 14.4721L4.6 9.19427L0.391548 5.52786L5.87868 5.05573L8 0Z" fill="var(--fill-0, #001222)" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'IconStarFilled',
  props: {
    color: { type: String, default: 'currentColor' },
    size: { type: Number, default: 16 },
  },
});
</script>
