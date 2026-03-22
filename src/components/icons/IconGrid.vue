<template>
  <svg :width="size" :height="size" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="1.5" width="5" height="5" rx="1" :stroke="color" stroke-width="1.5"/>
    <rect x="9.5" y="1.5" width="5" height="5" rx="1" :stroke="color" stroke-width="1.5"/>
    <rect x="1.5" y="9.5" width="5" height="5" rx="1" :stroke="color" stroke-width="1.5"/>
    <rect x="9.5" y="9.5" width="5" height="5" rx="1" :stroke="color" stroke-width="1.5"/>
  </svg>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'IconGrid',
  props: {
    size: { type: Number, default: 16 },
    color: { type: String, default: 'currentColor' },
  },
});
</script>
