<template>
  <div class="page page--locked">
    <bento-header
      title="Settings"
      description="Create and manage settings and custom rules for in-person payments."
      class="mb-6"
    />

    <section class="content-section--flex">
      <div class="tab-wrapper">
        <bento-tabs
          :active-tab-index="activeTabIndex"
          @update:active-tab-index="setActiveTab"
        >
          <bento-tab title="Company defaults">
            <div class="tab-panel">
              <h3>Company defaults</h3>
            </div>
          </bento-tab>

          <bento-tab title="Custom rules">
            <div class="tab-panel custom-rules-panel">
              
              <div class="rules-header">
                <div class="rules-header-top">
                  <h3>Custom rules</h3>
                  <bento-button variant="primary">+ New custom rule</bento-button>
                </div>
                <bento-typography variant="body" secondary class="rules-description">
                  Create conditional rules with custom rules to override settings based on device models, region, and more.
                </bento-typography>
              </div>

              <div class="rules-list">
                <div class="rules-search">
                  <svg
                    class="search-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M8.31686 0.379702C7.00749 0.119252 5.65029 0.252925 4.41689 0.763816C3.18349 1.27471 2.12928 2.13987 1.38758 3.2499C0.645881 4.35994 0.25 5.66498 0.25 7C0.25 8.79021 0.961159 10.5071 2.22703 11.773C3.4929 13.0388 5.20979 13.75 7 13.75C8.33502 13.75 9.64007 13.3541 10.7501 12.6124C10.9096 12.5059 11.064 12.3928 11.2131 12.2738L15.0001 16.0608L16.0608 15.0001L12.2737 11.2131C12.6674 10.7203 12.9922 10.1721 13.2362 9.58312C13.7471 8.34972 13.8808 6.99252 13.6203 5.68314C13.3598 4.37377 12.717 3.17104 11.773 2.22703C10.829 1.28303 9.62623 0.640153 8.31686 0.379702ZM4.99091 2.14964C5.95022 1.75228 7.00582 1.64831 8.02422 1.85088C9.04262 2.05345 9.97808 2.55347 10.7123 3.28769C11.4465 4.02192 11.9465 4.95738 12.1491 5.97578C12.3517 6.99418 12.2477 8.04978 11.8504 9.00909C11.453 9.9684 10.7801 10.7883 9.91674 11.3652C9.05339 11.9421 8.03835 12.25 7 12.25C5.60761 12.25 4.27225 11.6969 3.28769 10.7123C2.30312 9.72775 1.75 8.39239 1.75 7C1.75 5.96165 2.05791 4.94662 2.63478 4.08326C3.21166 3.2199 4.0316 2.547 4.99091 2.14964Z"
                    />
                  </svg>
                  
                  <input
                    class="b-search-input"
                    v-model.trim="customRuleSearch"
                    type="text"
                    placeholder="Search"
                  />
                </div>

                <button
                  v-for="rule in filteredCustomRules"
                  :key="rule.id"
                  type="button"
                  class="rule-card"
                >
                  <div class="rule-card__content">
                    <p class="rule-card__title">{{ rule.name }}</p>
                    <p class="rule-card__meta">
                      Devices affected {{ rule.devicesAffected }} • Active settings {{ rule.activeSettings }}
                    </p>
                  </div>

                  <svg
                    class="rule-card__edit-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M10.8241 2.39196L13.6082 5.17603L5.17639 13.6078H2.39233V10.8237L10.8241 2.39196Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
              
            </div>
          </bento-tab>
        </bento-tabs>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { BentoHeader, BentoTab, BentoTabs, BentoButton, BentoTypography } from '@adyen/bento-vue2';

interface CustomRule {
  id: string;
  name: string;
  devicesAffected: number;
  activeSettings: number;
}

const activeTabIndex = ref(1);
const customRuleSearch = ref('');
const customRules = ref<CustomRule[]>([
  { id: 'ams1-us', name: 'Wi-Fi for AMS1 in US', devicesAffected: 53, activeSettings: 2 },
  { id: 'ams1-ca', name: 'Wi-fi for AMS1 in CA', devicesAffected: 81, activeSettings: 1 },
]);

const filteredCustomRules = computed<CustomRule[]>(() => {
  const search = customRuleSearch.value.trim().toLowerCase();
  if (!search) return customRules.value;
  return customRules.value.filter(rule =>
    `${rule.name} ${rule.devicesAffected} ${rule.activeSettings}`.toLowerCase().includes(search)
  );
});

function setActiveTab(index: number): void { activeTabIndex.value = index; }
</script>

<style scoped>
.tab-panel {
  padding-top: var(--b-spacer-070);
}

.custom-rules-panel {
  display: flex;
  flex-direction: column;
}

/* Custom Header Layout */
.rules-header {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--b-spacer-070);
}

.rules-header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--b-spacer-020);
}

.rules-description {
  display: block;
}

.rules-list {
  width: 100%;
  max-width: 680px; /* EXACTLY 680px constraint as requested */
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-040);
}

.rules-search {
  display: flex;
  align-items: center;
  gap: var(--b-spacer-030);
  min-height: 40px;
  padding: 0 var(--b-spacer-040);
  border: 1px solid var(--b-color-outline-tertiary, #9ca3af);
  border-radius: var(--b-border-radius-m);
  background: var(--b-color-background-primary, #ffffff);
  margin-bottom: var(--b-spacer-040);
}

.search-icon {
  color: var(--b-color-label-secondary);
  flex-shrink: 0;
}

.rules-search input.b-search-input {
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  padding: 0;
  color: var(--b-color-label-primary);
  font-family: var(--b-text-body-font-family);
  font-size: var(--b-text-body-font-size);
}

.rules-search input.b-search-input::placeholder {
  color: var(--b-color-label-secondary);
}

.rule-card {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--b-spacer-040);
  text-align: left;
  padding: var(--b-spacer-050) var(--b-spacer-060);
  border: 1px solid var(--b-color-outline-secondary);
  border-radius: var(--b-border-radius-m);
  background: var(--b-color-background-primary, #ffffff);
  cursor: pointer;
  transition: border-color var(--b-animation-duration-fast) ease;
}

.rule-card:hover {
  border-color: var(--b-color-outline-primary);
}

.rule-card__content {
  min-width: 0;
}

.rule-card__title {
  margin: 0;
  color: var(--b-color-label-primary);
  font-family: var(--b-text-body-font-family);
  font-weight: var(--b-text-body-stronger-font-weight, 600);
}

.rule-card__meta {
  margin: var(--b-spacer-010) 0 0;
  color: var(--b-color-label-secondary);
  font-family: var(--b-text-caption-font-family);
  font-size: var(--b-text-caption-font-size, 12px);
}

.rule-card__edit-icon {
  flex-shrink: 0;
  color: var(--b-color-label-secondary);
}
</style>