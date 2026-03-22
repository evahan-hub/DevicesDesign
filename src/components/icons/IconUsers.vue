<template>
  <svg :width="size" :height="size" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 14V12.6667C11 11.9594 10.7366 11.2811 10.2678 10.781C9.79893 10.281 9.16304 10 8.5 10H3.5C2.83696 10 2.20107 10.281 1.73223 10.781C1.26339 11.2811 1 11.9594 1 12.6667V14" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="6" cy="5" r="2.5" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 14V12.67C14.9997 12.0909 14.8101 11.5285 14.4627 11.0716C14.1154 10.6147 13.63 10.2893 13.08 10.147" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.58 2.147C11.1314 2.2884 11.6185 2.6137 11.9672 3.0711C12.3159 3.5286 12.5063 4.0921 12.5063 4.6725C12.5063 5.2529 12.3159 5.8164 11.9672 6.2739C11.6185 6.7313 11.1314 7.0566 10.58 7.198" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'IconUsers',
  props: {
    size: { type: Number, default: 16 },
    color: { type: String, default: 'currentColor' },
  },
});
</script>
