<template>
  <svg :width="size" :height="size" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3333 4.66667H2.66667C1.93029 4.66667 1.33333 5.26362 1.33333 6V12.6667C1.33333 13.403 1.93029 14 2.66667 14H13.3333C14.0697 14 14.6667 13.403 14.6667 12.6667V6C14.6667 5.26362 14.0697 4.66667 13.3333 4.66667Z" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.6667 10.6667C11.0349 10.6667 11.3333 10.3682 11.3333 10C11.3333 9.63181 11.0349 9.33333 10.6667 9.33333C10.2985 9.33333 10 9.63181 10 10C10 10.3682 10.2985 10.6667 10.6667 10.6667Z" :fill="color"/>
    <path d="M3.33333 4.66667V3.33333C3.33333 2.8029 3.54405 2.29419 3.91912 1.91912C4.29419 1.54405 4.8029 1.33333 5.33333 1.33333H10.6667C11.1971 1.33333 11.7058 1.54405 12.0809 1.91912C12.456 2.29419 12.6667 2.8029 12.6667 3.33333V4.66667" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'IconWallet',
  props: {
    size: { type: Number, default: 16 },
    color: { type: String, default: 'currentColor' },
  },
});
</script>
