<template>
  <div :style="{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: 'var(--b-color-background-primary)' }">
    <!-- Bar content -->
    <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1, padding: '6px var(--b-spacer-070)', gap: 'var(--b-spacer-070)' }">
      <!-- Search -->
      <div :style="{ position: 'relative', width: '240px', height: '36px', borderRadius: 'var(--b-border-radius-m)', border: '1px solid var(--b-color-outline-tertiary)', backgroundColor: 'var(--b-color-background-primary)', flexShrink: 0 }">
        <svg :style="{ position: 'absolute', left: '12px', top: '10px' }" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke="var(--b-color-label-primary)" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          :style="{
            position: 'absolute',
            left: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'var(--b-text-body-font-family)',
            fontSize: 'var(--b-text-body-font-size)',
            lineHeight: '20px',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            width: '180px'
          }"
          @input="handleSearchInput"
        />
        
        <!-- Clear button (shows when there's text) -->
        <div
          v-if="searchQuery"
          :style="{
            position: 'absolute',
            right: '8px',
            top: '8px',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            borderRadius: '50%',
            backgroundColor: 'var(--b-color-background-secondary)'
          }"
          @click="clearSearch"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M9 3L3 9M3 3l6 6" stroke="var(--b-color-label-secondary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <!-- Icon buttons -->
      <div :style="{ display: 'flex', alignItems: 'center', gap: '4px' }">
        <!-- Thumbs Up -->
        <button :style="iconBtnStyle" title="Feedback">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4.667 7.333l2.666-6A2 2 0 0 1 9.333 3v2.667h3.78a1.333 1.333 0 0 1 1.314 1.56l-1.12 5.333A1.333 1.333 0 0 1 11.993 13.667H4.667M4.667 7.333v6.334M4.667 7.333H2.667a1.333 1.333 0 0 0-1.334 1.334v3.666a1.333 1.333 0 0 0 1.334 1.334h2" stroke="var(--b-color-label-primary)" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Notification Bell -->
        <button :style="iconBtnStyle" title="Notifications">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 5.333a4 4 0 1 0-8 0c0 4.667-2 6-2 6h12s-2-1.333-2-6ZM9.153 14a1.333 1.333 0 0 1-2.306 0" stroke="var(--b-color-label-primary)" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Help / Tooltip -->
        <button :style="iconBtnStyle" title="Help">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="var(--b-color-label-primary)" stroke-width="1.33"/>
            <path d="M6.06 6a2 2 0 0 1 3.887.667c0 1.333-2 2-2 2M8 11.333h.007" stroke="var(--b-color-label-primary)" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Profile Avatar -->
        <button :style="{ ...iconBtnStyle, padding: '4px' }" title="Profile">
          <div :style="{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#1A2B3B', display: 'flex', alignItems: 'center', justifyContent: 'center' }">
            <span :style="{ fontFamily: 'var(--b-text-body-font-family)', fontSize: 'var(--b-text-body-font-size)', lineHeight: '20px', color: 'var(--b-color-label-on-color)', fontWeight: 400 }">S</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Bottom divider -->
    <div :style="{ width: '100%', height: '1px', backgroundColor: 'var(--b-color-separator-primary)', flexShrink: 0 }" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TopBar',
  data() {
    return {
      searchQuery: '',
      isSearchFocused: false,
    };
  },
  computed: {
    iconBtnStyle(): Record<string, string> {
      return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        height: '36px',
        padding: '8px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: 'var(--b-border-radius-m)',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
      };
    },
  },
  methods: {
    handleSearchInput(event: Event) {
      const target = event.target as HTMLInputElement;
      this.searchQuery = target.value;
    },
    clearSearch() {
      this.searchQuery = '';
      this.isSearchFocused = false;
    },
  },
});
</script>
