<script>
import { BentoButton, BentoButtonVariant } from '@adyen/bento-vue2';

export default {
  name: 'App',
  components: {
    BentoButton
  },
  data() {
    return {
      BentoButtonVariant,
      navItems: [
        { id: 'dashboard', label: 'Dashboard', icon: `<rect x="2" y="2" width="5" height="5" fill="currentColor"/><rect x="9" y="2" width="5" height="5" fill="currentColor"/><rect x="2" y="9" width="5" height="5" fill="currentColor"/><rect x="9" y="9" width="5" height="5" fill="currentColor"/>` },
        { id: 'transactions', label: 'Transactions', icon: `<path d="M2 8H14M14 8L10 4M14 8L10 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` },
        { id: 'analytics', label: 'Analytics', icon: `<path d="M2 12L6 8L9 11L14 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` },
        { id: 'reports', label: 'Reports', icon: `<path d="M4 2H12C13.1 2 14 2.9 14 4V14L8 11L2 14V4C2 2.9 2.9 2 4 2Z" stroke="currentColor" stroke-width="2"/>` },
        { id: 'customers', label: 'Customers', icon: `<circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="2"/><path d="M2 14C2 11 4.7 9 8 9C11.3 9 14 11 14 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` },
        { id: 'products', label: 'Products', icon: `<rect x="2" y="4" width="12" height="10" stroke="currentColor" stroke-width="2"/><path d="M2 6L8 2L14 6" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>` },
        { id: 'settings', label: 'Settings', icon: `<circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="2"/><path d="M8 2V4M8 12V14M14 8H12M4 8H2M12.5 3.5L11 5M5 11L3.5 12.5M12.5 12.5L11 11M5 5L3.5 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` },
      ],
      headerIconButtons: [
        { label: 'Notifications', icon: `<path d="M10 2C7.8 2 6 3.8 6 6V9L4 11V13H16V11L14 9V6C14 3.8 12.2 2 10 2Z" stroke="currentColor" stroke-width="2"/><path d="M8 13V14C8 15.1 8.9 16 10 16C11.1 16 12 15.1 12 14V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` },
        { label: 'User profile', icon: `<circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/><circle cx="10" cy="8" r="3" fill="currentColor"/><path d="M4 17C4 14 6.5 12 10 12C13.5 12 16 14 16 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` },
      ],
      activePageId: 'dashboard',
      searchTerm: '',
      searchInputRef: null
    };
  },
  computed: {
    activePage() {
      return this.navItems.find(item => item.id === this.activePageId);
    },
    activePageLabel() {
      return this.activePage?.label ?? '';
    },
    placeholderText() {
      return `${this.activePageLabel} content goes here`;
    }
  },
  methods: {
    setActivePage(pageId) {
      this.activePageId = pageId;
      console.log(`Navigated to: ${pageId}`);
    },
    handleIconClick(label) {
      console.log(`${label} button clicked`);
      if (label === 'Notifications') {
        window.alert('Notifications feature coming soon!');
      } else if (label === 'User profile') {
        window.alert('User profile feature coming soon!');
      }
    },
    handleGlobalKeydown(event) {
      if (event.key === '/' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        this.$refs.searchInputRef?.$el?.focus();
      }

      if (event.key === 'Escape' && document.activeElement === this.$refs.searchInputRef?.$el) {
        this.searchTerm = '';
        this.$refs.searchInputRef?.$el?.blur();
      }
    },
    handleSearch(value) {
      console.log('Search term:', value);
      this.searchTerm = value;
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleGlobalKeydown);
    console.log('Dashboard initialized successfully!');
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleGlobalKeydown);
  }
};
</script>

<template>
  <div class="app-container">
    

    <div class="main-content">
      <header class="header">
        <div class="header-search">
          <div class="search-bar">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="2" />
              <path d="M11 11L14 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <input
              ref="searchInputRef"
              v-model="searchTerm"
              type="search"
              class="search-input"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </div>
        <div class="header-actions">
          <button
            v-for="button in headerIconButtons"
            :key="button.label"
            class="icon-button"
            type="button"
            :aria-label="button.label"
            @click="handleIconClick(button.label)"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <g v-html="button.icon" />
            </svg>
          </button>
        </div>
      </header>

      <main class="content">
        <h1 class="page-title">{{ activePageLabel }}</h1>
        <div class="content-card">
          <div class="placeholder-text">{{ placeholderText }}</div>
        </div>
        
        <!-- Example of Bento components usage -->
        <div class="bento-demo">
          <h3>Bento Components Demo</h3>
          <bento-button @click="handleIconClick('Demo')">
            Click me - Bento Button
          </bento-button>
          <bento-button :variant="BentoButtonVariant.SECONDARY">
              Secondary Button
          </bento-button>
        </div>
      </main>
    </div>
  </div>
</template>
