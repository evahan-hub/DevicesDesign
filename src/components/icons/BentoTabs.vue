<template>
  <div class="b-tabs">
    <div class="b-tabs__tab-list-wrapper">
      <div class="b-tabs__tab-list" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="b-tabs__tab"
          role="tab"
          type="button"
          :class="{
            'b-tabs__tab--active': isActive(tab.id),
            'b-tabs__tab--disabled': tab.disabled,
          }"
          :aria-selected="isActive(tab.id) ? 'true' : 'false'"
          :aria-controls="`${tab.id}-panel`"
          :tabindex="isActive(tab.id) && !tab.disabled ? 0 : -1"
          :disabled="tab.disabled"
          @click="handleSelect(tab.id)"
          @keydown.enter.space.prevent="handleSelect(tab.id)"
        >
          <span class="b-tabs__tab-text">
            <span class="b-tabs__tab-title">
              {{ tab.label }}
            </span>
            <span v-if="tab.description" class="b-tabs__tab-description">
              {{ tab.description }}
            </span>
            <span
              v-if="tab.counter !== undefined && tab.counter !== null"
              class="b-tabs__tab-counter"
              :class="{ 'b-tabs__tab-counter--active': isActive(tab.id) }"
            >
              {{ tab.counter }}
            </span>
            <span
              v-if="tab.withNotificationIndicator"
              class="b-tabs__tab-notification-dot"
              aria-hidden="true"
            ></span>
          </span>
          <span v-show="isActive(tab.id)" class="b-tabs__tab-underline" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export interface BentoTabsItem {
  id: string;
  label: string;
  description?: string;
  counter?: string | number;
  disabled?: boolean;
  withNotificationIndicator?: boolean;
}

export default Vue.extend({
  name: 'BentoTabs',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    tabs: {
      type: Array as () => BentoTabsItem[],
      required: true,
    },
  },
  data() {
    return {
      internalValue: this.value || this.tabs[0]?.id || '',
    };
  },
  watch: {
    value(newValue: string) {
      if (typeof newValue === 'string' && newValue.length) {
        this.internalValue = newValue;
      }
    },
    tabs: {
      handler(newTabs: BentoTabsItem[]) {
        if (!newTabs.length) {
          this.internalValue = '';
          return;
        }
        const exists = newTabs.some(tab => tab.id === this.internalValue);
        if (!exists) {
          this.setInternalValue(newTabs[0].id);
        }
      },
      deep: true,
    },
  },
  methods: {
    isActive(tabId: string) {
      return this.internalValue === tabId;
    },
    setInternalValue(tabId: string) {
      this.internalValue = tabId;
      this.$emit('input', tabId);
      this.$emit('change', tabId);
      this.$emit('update:active-tab', tabId);
    },
    handleSelect(tabId: string) {
      const target = this.tabs.find(tab => tab.id === tabId);
      if (target && !target.disabled) {
        this.setInternalValue(tabId);
      }
    },
  },
});
</script>

<style scoped lang="scss">
.b-tabs {
  width: 100%;
}

.b-tabs__tab-list-wrapper {
  width: 100%;
}

.b-tabs__tab-list {
  display: flex;
  gap: var(--b-spacer-040);
  overflow-x: auto;
  padding-bottom: var(--b-spacer-040);
  scrollbar-width: none;
}

.b-tabs__tab-list::-webkit-scrollbar {
  display: none;
}

.b-tabs__tab {
  flex: 1 1 0;
  min-width: 220px;
  border: var(--b-border-width-s) solid var(--b-color-outline-primary);
  border-radius: var(--b-border-radius-l);
  background: var(--b-color-background-primary);
  color: inherit;
  cursor: pointer;
  padding: var(--b-spacer-050) var(--b-spacer-060);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--b-spacer-010);
  position: relative;
  transition:
    box-shadow var(--b-animation-duration-fast) var(--b-animation-easing-linear),
    border-color var(--b-animation-duration-fast) var(--b-animation-easing-linear),
    background-color var(--b-animation-duration-fast) var(--b-animation-easing-linear),
    color var(--b-animation-duration-fast) var(--b-animation-easing-linear);
}

.b-tabs__tab:focus-visible {
  outline: var(--b-border-width-m) solid var(--b-color-outline-focus);
  outline-offset: var(--b-border-width-s);
}

.b-tabs__tab--active {
  background: var(--b-color-background-selected);
  border-color: var(--b-color-outline-selected);
  box-shadow: 0 12px 30px rgba(0, 24, 47, 0.14);
  color: var(--b-color-label-primary);
}

.b-tabs__tab--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.b-tabs__tab:not(.b-tabs__tab--disabled):hover {
  border-color: var(--b-color-outline-hover, var(--b-color-outline-primary));
  box-shadow: 0 6px 18px rgba(0, 24, 47, 0.1);
}

.b-tabs__tab-text {
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-010);
  width: 100%;
}

.b-tabs__tab-title {
  font-family: var(--b-text-body-font-family);
  font-size: var(--b-text-body-font-size);
  font-weight: var(--b-text-body-stronger-font-weight);
  color: var(--b-color-label-primary);
}

.b-tabs__tab-description {
  font-family: var(--b-text-caption-font-family);
  font-size: var(--b-text-caption-font-size);
  color: var(--b-color-label-tertiary);
}

.b-tabs__tab-counter--active {
  color: var(--b-color-label-primary);
}

.b-tabs__tab-notification-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--b-color-label-highlight);
  display: inline-block;
}

.b-tabs__tab-underline {
  display: none;
}
</style>
