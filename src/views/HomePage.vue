<template>
  <div class="home-page">
    <div class="page-header">
      <h1>Home</h1>
      <p>Welcome to the PX Prototype application</p>
    </div>
    
    <!-- Default Overview Content -->
    <div v-if="!$slots.details" class="content-section">
      <div class="info-card">
        <h3>Getting Started</h3>
        <p>Explore the features and capabilities of the application</p>
      </div>
      
      <div class="info-card">
        <h3>Quick Actions</h3>
        <p>Access frequently used features and tools</p>
      </div>
      
      <div class="info-card">
        <h3>Recent Activity</h3>
        <p>View recent updates and activities</p>
      </div>
      
      <!-- Bento Button Demo Section -->
      <div class="demo-section">
        <h3>Bento Components Demo</h3>
        <bento-button variant="primary" @click="handleClick">Primary Button</bento-button>
        <bento-button variant="secondary" @click="handleClick">Secondary Button</bento-button>
      </div>
    </div>
    
    <!-- Details View Slot -->
    <div v-else class="details-view">
      <slot name="details"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BentoButton } from '@adyen/bento-vue2';

function handleClick(): void {
  console.log('Bento button clicked!');
}
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

.details-view {
  width: 100%;
}
</style>
