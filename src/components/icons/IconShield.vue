<template>
  <svg :width="size" :height="size" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 14.6667C8 14.6667 13.3333 12 13.3333 8V3.33333L8 1.33333L2.66667 3.33333V8C2.66667 12 8 14.6667 8 14.6667Z" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'IconShield',
  props: {
    size: { type: Number, default: 16 },
    color: { type: String, default: 'currentColor' },
  },
});
</script>
