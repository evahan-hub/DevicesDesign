<template>
  <div class="root-layout">
    <SideNavigationBP />
    <div class="main-area">
      <div class="content-area">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SideNavigationBP from '../../components/SideNavigationBP.vue';
</script>

<style scoped>
.root-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  background-color: var(--b-color-background-primary);
}
</style>
