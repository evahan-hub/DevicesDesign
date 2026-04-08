<template>
  <div class="page">
    <bento-header :title="$route.meta && $route.meta.title ? $route.meta.title : ''" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { BentoHeader } from '@adyen/bento-vue2';

export default Vue.extend({
  name: 'BPStubPage',
  components: { BentoHeader },
});
</script>
