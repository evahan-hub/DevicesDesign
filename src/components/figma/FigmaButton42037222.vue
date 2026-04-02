<template>
  <bento-button v-bind="$attrs" v-on="$listeners">
    <slot>{{ label }}</slot>
  </bento-button>
</template>

<script lang="ts">
import Vue from 'vue';
import { BentoButton } from '@adyen/bento-vue2';

export default Vue.extend({
  name: 'FigmaButton42037222',
  inheritAttrs: false,
  components: {
    BentoButton
  },
  props: {
    label: {
      type: String,
      default: 'Button'
    }
  }
});
</script>
