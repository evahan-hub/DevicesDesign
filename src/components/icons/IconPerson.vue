<template>
  <div
    class="relative overflow-hidden shrink-0 inline-flex items-center justify-center"
    :style="{ width: size + 'px', height: size + 'px', '--fill-0': color }"
  >
    <div style="position: relative; width: 16px; height: 16px">
      <div class="absolute" style="inset: 1.56% 14.06%">
        <svg class="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5 15.5">
          <path d="M5.75 0C3.67893 0 2 1.67893 2 3.75C2 5.82107 3.67893 7.5 5.75 7.5C7.82107 7.5 9.5 5.82107 9.5 3.75C9.5 1.67893 7.82107 0 5.75 0ZM3.5 3.75C3.5 2.50736 4.50736 1.5 5.75 1.5C6.99264 1.5 8 2.50736 8 3.75C8 4.99264 6.99264 6 5.75 6C4.50736 6 3.5 4.99264 3.5 3.75ZM0 13.75C0 11.1266 2.12665 9 4.75 9H6.75C9.37335 9 11.5 11.1266 11.5 13.75V15.5H10V13.75C10 11.9551 8.54493 10.5 6.75 10.5H4.75C2.95507 10.5 1.5 11.9551 1.5 13.75V15.5H0V13.75Z" fill="var(--fill-0, #001222)" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'IconPerson',
  props: {
    color: { type: String, default: 'currentColor' },
    size: { type: Number, default: 16 },
  },
});
</script>
