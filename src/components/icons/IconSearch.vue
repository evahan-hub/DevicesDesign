<template>
  <div
    class="relative overflow-hidden shrink-0 inline-flex items-center justify-center"
    :style="{ width: size + 'px', height: size + 'px', '--fill-0': color }"
  >
    <div style="position: relative; width: 16px; height: 16px">
      <div class="absolute" style="inset: 1.56%">
        <svg class="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5 15.5">
          <path d="M6.75 1.5C3.85051 1.5 1.5 3.85051 1.5 6.75C1.5 9.64949 3.85051 12 6.75 12C8.07919 12 9.29373 11.5175 10.2338 10.7188L13.2575 13.7425L14.3182 12.6818L11.2944 9.658C12.0457 8.73056 12.5 7.55005 12.5 6.25C12.5 3.62665 10.3733 1.5 7.75 1.5H6.75ZM6.75 0H7.75C11.2018 0 14 2.79822 14 6.25C14 7.38927 13.6983 8.45766 13.1718 9.38235L15.3787 11.5893L15.5 11.7107V11.5893L15.3787 11.7107L13.3132 13.7762L12.2525 14.8369L11.1919 13.7762L9.03256 11.617C8.07419 12.1876 6.95485 12.5 5.75 12.5H6.75C3.02208 12.5 0 9.47792 0 5.75V6.75C0 3.02208 3.02208 0 6.75 0Z" fill="var(--fill-0, #001222)" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'IconSearch',
  props: {
    color: { type: String, default: 'currentColor' },
    size: { type: Number, default: 16 },
  },
});
</script>
