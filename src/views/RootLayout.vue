<template>
  <div class="root-layout">
    <SideNavigation />
    <div class="main-area">
      <TopBar />
      <div class="content-area">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SideNavigation from '../components/SideNavigation.vue';
import TopBar from '../components/TopBar.vue';

export default Vue.extend({
  name: 'RootLayout',
  components: {
    SideNavigation,
    TopBar,
  },
});
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
