<template>
  <div class="home-page">
    <div class="page-header">
      <h1>Home</h1>
      <p>Welcome to the Dominos Pizza Finance Team Dashboard</p>
    </div>
    
    <div class="content-section">
      <div class="demo-section">
        <h3>Bento Components Demo</h3>
        <bento-button @click="handleClick">
          Click me - Bento Button
        </bento-button>
        <bento-button :variant="BentoButtonVariant.SECONDARY">
          Secondary Button
        </bento-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { BentoButton, BentoButtonVariant } from '@adyen/bento-vue2';

export default Vue.extend({
  name: 'HomePage',
  components: {
    BentoButton,
  },
  data() {
    return {
      BentoButtonVariant,
    };
  },
  methods: {
    handleClick() {
      console.log('Bento button clicked!');
    },
  },
});
</script>

<style scoped>
.home-page {
  padding: var(--b-spacer-090);
}

.page-header {
  margin-bottom: var(--b-spacer-090);
}

.page-header h1 {
  font-family: var(--b-text-heading-font-family);
  font-size: var(--b-text-heading-l-font-size);
  font-weight: var(--b-text-heading-font-weight);
  color: var(--b-color-label-primary);
  margin-bottom: var(--b-spacer-040);
}

.page-header p {
  font-family: var(--b-text-body-font-family);
  font-size: var(--b-text-body-font-size);
  color: var(--b-color-label-secondary);
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-090);
}

.demo-section {
  padding: var(--b-spacer-090);
  background-color: var(--b-color-background-secondary);
  border-radius: var(--b-border-radius-m);
  border: 1px solid var(--b-color-outline-secondary);
}

.demo-section h3 {
  font-family: var(--b-text-body-font-family);
  font-size: var(--b-text-body-font-size);
  font-weight: var(--b-text-body-stronger-font-weight);
  color: var(--b-color-label-primary);
  margin-bottom: var(--b-spacer-060);
}

.demo-section .bento-button {
  margin-right: var(--b-spacer-060);
  margin-bottom: var(--b-spacer-060);
}
</style>
