<template>
  <svg :width="size" :height="size" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 13.3333V6.66667" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 13.3333V2.66667" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2 13.3333V10" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 13.3333V8" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'IconBarChart',
  props: {
    size: { type: Number, default: 16 },
    color: { type: String, default: 'currentColor' },
  },
});
</script>
