<template>
  <div
    :style="{
      width: '248px',
      height: '100%',
      maxHeight: '100%',
      backgroundColor: 'var(--b-color-background-secondary)',
      borderRight: 'var(--b-border-width-s) solid var(--b-color-outline-secondary)',
      flexShrink: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <!-- Scrollable content: Favorites + Pages -->
    <div
      :style="{
        flex: '1',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 'var(--b-spacer-070)',
        paddingRight: 'var(--b-spacer-070)',
        paddingTop: 'var(--b-spacer-090)',
        paddingBottom: 'var(--b-spacer-070)',
        minHeight: '0',
        height: 'auto',
      }"
    >
      <!-- Favorites Section -->
      <div :style="{ marginBottom: 'var(--b-spacer-090)' }">
        <h3 :style="sectionHeadingStyle">
          Favorites
        </h3>
        <div
          v-if="favorites.length === 0"
          :style="{
            textAlign: 'center',
            backgroundColor: 'var(--b-color-background-secondary)',
            borderRadius: 'var(--b-border-radius-m)',
            padding: 'var(--b-spacer-090)',
          }"
        >
          <div :style="{ display: 'flex', marginBottom: 'var(--b-spacer-040)', justifyContent: 'center' }">
            <div :style="{ width: 'var(--b-spacer-080)', height: 'var(--b-spacer-080)', '--fill-0': 'var(--b-color-label-secondary)' }">
              <icon-star />
            </div>
          </div>
          <p :style="{ ...bodyStrongStyle, color: 'var(--b-color-label-primary)', marginBottom: 'var(--b-spacer-020)' }">
            No favorites yet
          </p>
          <p :style="{ ...captionStyle, color: 'var(--b-color-label-secondary)' }">
            Click on the star on the right side of a menu item to add as a favorite.
          </p>
        </div>
        <div v-else :style="{ display: 'flex', flexDirection: 'column', gap: 'var(--b-spacer-010, 4px)' }">
          <div
            v-for="fav in favorites"
            :key="fav"
            :style="{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              minHeight: '32px',
              paddingLeft: 'var(--b-spacer-060)',
              paddingRight: 'var(--b-spacer-030)',
              borderRadius: 'var(--b-border-radius-m)',
              justifyContent: 'space-between',
              color: 'var(--b-color-label-primary)',
              backgroundColor: activeItem === fav
                ? 'var(--b-color-background-navigation)'
                : hoveredFavorite === fav
                ? 'var(--b-color-background-secondary-hover)'
                : 'transparent',
              transition: 'background-color var(--b-animation-duration-moderate) var(--b-animation-easing-standard)',
            }"
            @mouseenter="hoveredFavorite = fav"
            @mouseleave="hoveredFavorite = null"
            @click="setActiveItem(fav)"
          >
            <span :style="{ ...bodyStrongStyle, color: 'var(--b-color-label-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0, flex: 1 }">{{ fav }}</span>
            <div
              :style="{ cursor: 'pointer', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 'var(--b-spacer-040)', '--fill-0': 'var(--b-color-decorative-green)' }"
              @click.stop="toggleFavorite(fav)"
            >
              <icon-star-filled :size="16" />
            </div>
          </div>
        </div>
      </div>

      <!-- Pages Section -->
      <div>
        <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }">
          <h3 :style="sectionHeadingStyle">Pages</h3>
          <div :style="{ display: 'flex', alignItems: 'center', gap: 'var(--b-spacer-020)', marginBottom: 'var(--b-spacer-060)' }">
            <div
              :style="{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--b-border-radius-s)', cursor: 'pointer', color: 'var(--b-color-label-secondary)' }"
            >
              <icon-search :size="16" color="currentColor" />
            </div>
            <div
              :style="{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--b-border-radius-s)', cursor: 'pointer', backgroundColor: 'var(--b-color-background-tertiary)', color: 'var(--b-color-label-secondary)' }"
            >
              <icon-expand-vertically :size="16" color="currentColor" />
            </div>
          </div>
        </div>
        <nav class="flex flex-col" :style="{ gap: 'var(--b-spacer-010, 4px)' }">
          <div v-for="item in navItems" :key="item.label">
            <!-- Nav item row -->
            <div
              class="flex items-center cursor-pointer"
              :style="{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--b-spacer-070)',
                justifyContent: 'space-between',
                minHeight: '32px',
                padding: 'var(--b-spacer-010) var(--b-spacer-030) var(--b-spacer-010) var(--b-spacer-060)',
                borderRadius: 'var(--b-border-radius-m)',
                color: getItemColor(item),
                textDecoration: 'none',
                cursor: 'pointer',
                position: 'relative',
                backgroundColor: getItemBg(item),
                transition: 'color var(--b-animation-duration-moderate) var(--b-animation-easing-standard), background-color var(--b-animation-duration-moderate) var(--b-animation-easing-standard)',
              }"
              @click="handleItemClick(item)"
              @mouseenter="hoveredItem = item.label"
              @mouseleave="hoveredItem = null"
            >
              <div :style="{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }">
                <component :is="item.icon" :size="16" color="currentColor" />
              </div>
              <span :style="{
                fontFamily: 'var(--b-text-body-font-family)',
                fontSize: 'var(--b-text-body-font-size)',
                fontWeight: 'var(--b-text-body-stronger-font-weight)',
                lineHeight: 'var(--b-text-body-line-height)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: '1'
              }">{{ item.label }}</span>
              
              <!-- Group chevron (only on hover or when expanded) -->
              <div v-if="item.children && item.children.length > 0 && (hoveredItem === item.label || expandedItem === item.label)" :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', marginLeft: 'auto', flexShrink: 0 }">
                <icon-chevron-up v-if="expandedItem === item.label" :size="16" color="var(--b-color-label-primary)" />
                <icon-chevron-down v-else :size="16" color="var(--b-color-label-primary)" />
              </div>
              <div
                v-else-if="hoveredItem === item.label"
                :style="{ cursor: 'pointer', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', '--fill-0': isFavorited(item.label) ? 'var(--b-color-decorative-green)' : 'var(--b-color-label-secondary)' }"
                @click.stop="toggleFavorite(item.label)"
              >
                <icon-star-filled v-if="isFavorited(item.label)" :size="16" />
                <icon-star v-else :size="16" />
              </div>
            </div>

            <!-- Children items (expandable) -->
            <transition name="expand">
              <div v-if="expandedItem === item.label && item.children" :style="{ overflow: 'hidden' }">
                <div :style="{ display: 'flex', flexDirection: 'column', marginTop: 'var(--b-spacer-010, 4px)', gap: 'var(--b-spacer-010, 4px)' }">
                  <div
                    v-for="child in item.children"
                    :key="child.label"
                    :style="{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      minHeight: '32px',
                      paddingRight: 'var(--b-spacer-030)',
                      paddingLeft: 'var(--b-spacer-110)',
                      borderRadius: 'var(--b-border-radius-m)',
                      color: 'var(--b-color-label-primary)',
                      backgroundColor: activeItem === child.label
                        ? 'var(--b-color-background-navigation)'
                        : hoveredChildItem === child.label
                        ? 'var(--b-color-background-secondary-hover)'
                        : 'transparent',
                      transition: 'color var(--b-animation-duration-moderate) var(--b-animation-easing-standard), background-color var(--b-animation-duration-moderate) var(--b-animation-easing-standard)',
                    }"
                    @mouseenter="hoveredChildItem = child.label"
                    @mouseleave="hoveredChildItem = null"
                    @click="navigateToChild(child)"
                  >
                    <span :style="{ ...bodyStyle, fontWeight: 'var(--b-text-body-stronger-font-weight)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }">
                      {{ child.label }}
                    </span>
                    <div
                      v-if="hoveredChildItem === child.label"
                      :style="{ cursor: 'pointer', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 'var(--b-spacer-040)', '--fill-0': isFavorited(child.label) ? 'var(--b-color-decorative-green)' : 'var(--b-color-label-secondary)' }"
                      @click.stop="toggleFavorite(child.label)"
                    >
                      <icon-star-filled v-if="isFavorited(child.label)" :size="16" />
                      <icon-star v-else :size="16" />
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </nav>
      </div>
    </div>

    <!-- New menu opt-out card -->
    <div :style="{ padding: 'var(--b-spacer-070)' }">
      <div
        :style="{
          border: '1px solid var(--b-color-outline-primary)',
          borderRadius: 'var(--b-border-radius-l)',
          padding: 'var(--b-spacer-070)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--b-spacer-060)',
        }"
      >
        <div :style="{ display: 'flex', alignItems: 'center', gap: 'var(--b-spacer-040)' }">
          <span :style="{ ...bodyStrongStyle, color: 'var(--b-color-label-primary)' }">New menu</span>
          <span
            :style="{
              ...captionStyle,
              color: 'var(--b-color-label-on-background-info-weak, #0057d9)',
              backgroundColor: 'var(--b-color-background-info-weak, #e6effd)',
              borderRadius: 'var(--b-border-radius-s)',
              padding: '0 var(--b-spacer-040)',
              fontWeight: 'var(--b-text-body-strongest-font-weight)',
            }"
          >
            Beta
          </span>
        </div>
        <div :style="{ display: 'flex', alignItems: 'center', gap: 'var(--b-spacer-040)' }">
          <button
            :style="{
              flex: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--b-spacer-040)',
              paddingTop: 'var(--b-spacer-050)',
              paddingBottom: 'var(--b-spacer-050)',
              borderRadius: 'var(--b-border-radius-m)',
              border: '1px solid var(--b-color-outline-primary)',
              backgroundColor: isLangHovered ? 'var(--b-color-background-primary-hover)' : 'transparent',
              cursor: 'pointer',
              color: 'var(--b-color-label-primary)',
              transition: 'background-color var(--b-animation-duration-moderate) var(--b-animation-easing-standard)',
            }"
            @mouseenter="isLangHovered = true"
            @mouseleave="isLangHovered = false"
          >
            <span :style="{ ...bodyStyle, fontWeight: 'var(--b-text-body-stronger-font-weight)' }">Give feedback</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IconChevronDown from './icons/IconChevronDown.vue';
import IconChevronUp from './icons/IconChevronUp.vue';
import IconCross from './icons/IconCross.vue';
import IconExpandVertically from './icons/IconExpandVertically.vue';
import IconSearch from './icons/IconSearch.vue';
import IconStar from './icons/IconStar.vue';
import IconStarFilled from './icons/IconStarFilled.vue';
import IconHome from './icons/IconHome.vue';
import IconGrid from './icons/IconGrid.vue';
import IconUsers from './icons/IconUsers.vue';
import IconDiamond from './icons/IconDiamond.vue';
import IconShield from './icons/IconShield.vue';
import IconHandshake from './icons/IconHandshake.vue';
import IconWallet from './icons/IconWallet.vue';
import IconBarChart from './icons/IconBarChart.vue';
import IconFileText from './icons/IconFileText.vue';
import IconStore from './icons/IconStore.vue';
import IconLink from './icons/IconLink.vue';
import IconCode from './icons/IconCode.vue';
import IconHeart from './icons/IconHeart.vue';
import IconSettings from './icons/IconSettings.vue';

interface NavChild {
  label: string;
  route?: string;
}

interface NavItem {
  icon: string;
  label: string;
  route?: string;
  children?: NavChild[];
}

export default Vue.extend({
  name: 'SideNavigation',
  components: {
    IconChevronDown,
    IconChevronUp,
    IconCross,
    IconExpandVertically,
    IconSearch,
    IconStar,
    IconStarFilled,
    IconHome,
    IconGrid,
    IconUsers,
    IconDiamond,
    IconShield,
    IconHandshake,
    IconWallet,
    IconBarChart,
    IconFileText,
    IconStore,
    IconLink,
    IconCode,
    IconHeart,
    IconSettings,
  },
  data() {
    return {
      activeItem: 'Home' as string,
      expandedItem: null as string | null,
      hoveredItem: null as string | null,
      hoveredChildItem: null as string | null,
      hoveredFavorite: null as string | null,
      favorites: [
        'Device settings',
        'Device list',
        'Tap to Pay & card readers',
        'Settings / Settings',
        'Payment methods',
        'Checkout settings',
        'Stores',
        'Orders & returns',
        'Terminal apps',
      ] as string[],
      isLangHovered: false,
      navItems: [
        { icon: 'icon-home', label: 'Home', route: '/home' },
        { icon: 'icon-grid', label: 'Payments', children: [
          { label: 'Payment list', route: '/transactions/payments' },
          { label: 'Offers', route: '/transactions/offers' },
          { label: 'Payment links', route: '/pay-by-link/payment-links' },
          { label: 'Payment methods' },
          { label: 'Checkout settings' },
          { label: 'Payment link themes' },
          { label: 'Payment link settings' },
          { label: 'Batch modifications' },
        ]},
        { icon: 'icon-wallet', label: 'Balances', children: [
          { label: 'Balances overview', route: '/finance/balances-overview' },
          { label: 'Company balances overview', route: '/finance/company-balances-overview' },
          { label: 'Sales to payouts', route: '/finance/sales-to-payouts' },
          { label: 'Payout accounts', route: '/finance/payout-accounts' },
          { label: 'Payout schedule' },
          { label: 'MPL', route: '/finance/mpl' },
        ]},
        { icon: 'icon-link', label: 'Reconciliation', children: [
          { label: 'Invoices', route: '/finance/invoices' },
          { label: 'Liable account summary' },
        ]},
        { icon: 'icon-shield', label: 'Risk & disputes', children: [
          { label: 'Disputes', route: '/revenue-risk/disputes' },
          { label: 'Dynamic 3D Secure', route: '/revenue-risk/dynamic-3d-secure' },
          { label: 'Risk profiles', route: '/revenue-risk/risk-profiles' },
          { label: 'Risk fields', route: '/revenue-risk/risk-fields' },
          { label: 'Risk lists', route: '/revenue-risk/risk-lists' },
          { label: 'Risk settings', route: '/revenue-risk/settings' },
        ]},
        { icon: 'icon-bar-chart', label: 'Analytics', children: [
          { label: 'Payment analytics' },
          { label: 'Risk & dispute analytics', route: '/insights/risk-dispute-management' },
          { label: 'Checkout analytics', route: '/insights/checkout' },
          { label: 'KYC verification analytics' },
        ]},
        { icon: 'icon-diamond', label: 'Uplift', children: [
          { label: 'Uplift overview', route: '/revenue-risk/uplift-overview' },
          { label: 'Recommendations', route: '/revenue-risk/recommendations' },
          { label: 'Experiments', route: '/revenue-risk/experiments' },
          { label: 'Uplift settings' },
        ]},
        { icon: 'icon-store', label: 'Devices', children: [
          { label: 'Device list', route: '/in-person-payments/payment-devices' },
          { label: 'Stores', route: '/in-person-payments/stores' },
          { label: 'Tap to Pay & card readers', route: '/in-person-payments/tap-to-pay' },
          { label: 'Orders & returns', route: '/in-person-payments/orders-returns' },
          { label: 'Terminal apps', route: '/in-person-payments/android' },
          { label: 'Terminal software', route: '/in-person-payments/terminal-software' },
          { label: 'Terminal themes', route: '/in-person-payments/themes' },
          { label: 'Device settings', route: '/in-person-payments/terminal-settings' },
        ]},
        { icon: 'icon-file-text', label: 'Reports', children: [
          { label: 'Reports overview', route: '/reports' },
          { label: 'Card payment fees' },
        ]},
        { icon: 'icon-code', label: 'Developers', children: [
          { label: 'Developer overview', route: '/developers/dashboard' },
          { label: 'Webhooks', route: '/developers/webhooks' },
          { label: 'Webhook event logs' },
          { label: 'API logs' },
          { label: 'API credentials', route: '/developers/api-credentials' },
          { label: 'API URLs' },
          { label: 'Additional data' },
          { label: 'OPI configurations' },
        ]},
        { icon: 'icon-settings', label: 'Account', children: [
          { label: 'Audit logs' },
        ]},
        { icon: 'icon-settings', label: 'Settings', route: '/settings' },
      ] as NavItem[],
    };
  },
  computed: {
    sectionHeadingStyle(): Record<string, string> {
      return {
        fontSize: '10px',
        fontFamily: 'var(--b-text-caption-font-family)',
        fontWeight: 'var(--b-text-body-strongest-font-weight)',
        color: 'var(--b-color-label-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: 'var(--b-spacer-060)',
        lineHeight: 'var(--b-text-caption-line-height)',
      };
    },
    bodyStyle(): Record<string, string> {
      return {
        fontFamily: 'var(--b-text-body-font-family)',
        fontSize: 'var(--b-text-body-font-size)',
        fontWeight: 'var(--b-text-body-font-weight)',
        lineHeight: 'var(--b-text-body-line-height)',
      };
    },
    bodyStrongStyle(): Record<string, string> {
      return {
        fontFamily: 'var(--b-text-body-font-family)',
        fontSize: 'var(--b-text-body-font-size)',
        fontWeight: 'var(--b-text-body-stronger-font-weight)',
        lineHeight: 'var(--b-text-body-line-height)',
      };
    },
    captionStyle(): Record<string, string> {
      return {
        fontFamily: 'var(--b-text-caption-font-family)',
        fontSize: 'var(--b-text-caption-font-size)',
        fontWeight: 'var(--b-text-caption-font-weight)',
        lineHeight: 'var(--b-text-caption-wide-line-height)',
      };
    },
    textStyle(): Record<string, string> {
      return {
        fontFamily: 'var(--b-text-body-font-family)',
        fontSize: 'var(--b-text-body-font-size)',
        fontWeight: 'var(--b-text-body-font-weight)',
        lineHeight: 'var(--b-text-body-line-height)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: '1',
      };
    },
  },
  watch: {
    '$route': {
      handler() { this.syncFromRoute(); },
      immediate: false,
    },
  },
  created() {
    this.syncFromRoute();
  },
  methods: {
    syncFromRoute() {
      const path = this.$route?.path;
      if (!path) return;
      for (const item of this.navItems) {
        if (item.children) {
          for (const child of item.children) {
            if (child.route && path === child.route) {
              this.activeItem = child.label;
              this.expandedItem = item.label;
              return;
            }
          }
        }
        if (item.route && path === item.route && !item.children) {
          this.activeItem = item.label;
          this.expandedItem = null;
          return;
        }
      }
    },
    handleItemClick(item: NavItem) {
      if (item.label === 'Home') {
        this.activeItem = item.label;
        this.expandedItem = null;
      } else if (item.children && item.children.length > 0) {
        if (this.expandedItem === item.label) {
          this.expandedItem = null;
        } else {
          this.expandedItem = item.label;
          this.activeItem = item.label;
        }
      } else {
        this.activeItem = item.label;
        if (item.route) {
          this.$router.push(item.route).catch(() => {});
        }
      }
    },
    navigateToChild(child: NavChild) {
      this.activeItem = child.label;
      if (child.route) {
        this.$router.push(child.route).catch(() => {});
      }
    },
    setActiveItem(label: string) {
      this.activeItem = label;
    },
    toggleFavorite(itemName: string) {
      const idx = this.favorites.indexOf(itemName);
      if (idx >= 0) {
        this.favorites.splice(idx, 1);
      } else {
        this.favorites.push(itemName);
      }
    },
    isFavorited(itemName: string): boolean {
      return this.favorites.includes(itemName);
    },
    getItemBg(item: NavItem): string {
      const isActive = this.activeItem === item.label;
      const isHovered = this.hoveredItem === item.label;
      if (isActive) return 'var(--b-color-background-navigation)';
      if (isHovered) return 'var(--b-color-background-secondary-hover)';
      return 'transparent';
    },
    getItemColor(_item: NavItem): string {
      // All nav labels/icons are dark (label-primary) in the Bento nav, like the product.
      return 'var(--b-color-label-primary)';
    },
  },
});
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.2s ease-in-out;
  max-height: 1000px;
  opacity: 1;
}
.expand-enter,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
