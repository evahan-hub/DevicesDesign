<template>
  <div
    :style="{
      width: '248px',
      height: '100vh',
      maxHeight: '100vh',
      backgroundColor: 'var(--b-color-background-inverse-primary)',
      flexShrink: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <!-- Header -->
    <div
      ref="headerRef"
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        padding: 'var(--b-spacer-040)',
        margin: 'var(--b-spacer-040)',
        borderRadius: 'var(--b-border-radius-m)',
        backgroundColor: isHeaderHovered
          ? 'var(--b-color-background-inverse-secondary)'
          : 'transparent',
        transition: 'background-color var(--b-animation-duration-moderate) var(--b-animation-easing-standard)',
      }"
      @mouseenter="isHeaderHovered = true"
      @mouseleave="isHeaderHovered = false"
    >
      <div :style="{ display: 'flex', alignItems: 'center', gap: 'var(--b-spacer-060)' }">
        <div
          :style="{
            width: 'var(--b-spacer-100)',
            height: 'var(--b-spacer-100)',
            backgroundColor: 'var(--b-color-decorative-green)',
            borderRadius: 'var(--b-border-radius-m)',
          }"
        />
        <span
          :style="{
            fontFamily: 'var(--b-text-body-font-family)',
            fontSize: 'var(--b-text-body-font-size)',
            fontWeight: 'var(--b-text-body-stronger-font-weight)',
            lineHeight: 'var(--b-text-body-line-height)',
            color: 'var(--b-color-label-inverse-primary)',
          }"
        >
          Dominos Pizza Finance Team
        </span>
      </div>
      <icon-expand-vertically
        :size="16"
        :color="isHeaderHovered
          ? 'var(--b-color-label-inverse-primary)'
          : 'var(--b-color-label-inverse-secondary)'"
      />
    </div>

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
          Favorites ({{ favorites.length }})
        </h3>
        <div
          v-if="favorites.length === 0"
          :style="{
            textAlign: 'center',
            backgroundColor: 'var(--b-color-background-always-dark-secondary)',
            borderRadius: 'var(--b-border-radius-m)',
            padding: 'var(--b-spacer-090)',
          }"
        >
          <div :style="{ display: 'flex', marginBottom: 'var(--b-spacer-040)', justifyContent: 'center' }">
            <div :style="{ width: 'var(--b-spacer-080)', height: 'var(--b-spacer-080)', '--fill-0': 'var(--b-color-label-inverse-secondary)' }">
              <icon-star />
            </div>
          </div>
          <p :style="{ ...bodyStrongStyle, color: 'var(--b-color-label-inverse-primary)', marginBottom: 'var(--b-spacer-020)' }">
            No favorites yet
          </p>
          <p :style="{ ...captionStyle, color: 'var(--b-color-label-inverse-secondary)' }">
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
              height: 'var(--b-spacer-100)',
              paddingLeft: 'var(--b-spacer-060)',
              paddingRight: 'var(--b-spacer-060)',
              borderRadius: 'var(--b-border-radius-m)',
              justifyContent: 'space-between',
              color: hoveredFavorite === fav ? 'var(--b-color-label-inverse-primary)' : 'var(--b-color-label-inverse-secondary)',
              backgroundColor: hoveredFavorite === fav ? 'var(--b-color-background-inverse-secondary)' : 'transparent',
              transition: 'color var(--b-animation-duration-moderate) var(--b-animation-easing-standard), background-color var(--b-animation-duration-moderate) var(--b-animation-easing-standard)',
            }"
            @mouseenter="hoveredFavorite = fav"
            @mouseleave="hoveredFavorite = null"
            @click="setActiveItem(fav)"
          >
            <div :style="{ display: 'flex', alignItems: 'center', gap: 'var(--b-spacer-080, 16px)', flex: 1, minWidth: 0, overflow: 'hidden' }">
              <div :style="{ width: 'var(--b-spacer-070, 28px)', height: 'var(--b-spacer-070, 28px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, '--fill-0': 'var(--b-color-label-inverse-secondary)' }">
                <icon-star-filled />
              </div>
              <span :style="textStyle">{{ fav }}</span>
            </div>
            <div
              v-if="hoveredFavorite === fav"
              :style="{ cursor: 'pointer', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 'var(--b-spacer-040)' }"
              @click.stop="toggleFavorite(fav)"
            >
              <icon-cross :size="16" color="var(--b-color-label-inverse-secondary)" />
            </div>
          </div>
        </div>
      </div>

      <!-- Pages Section -->
      <div>
        <h3 :style="sectionHeadingStyle">Pages</h3>
        <nav class="flex flex-col" :style="{ gap: 'var(--b-spacer-010, 4px)' }">
          <div v-for="item in navItems" :key="item.label">
            <!-- Nav item row -->
            <div
              class="flex items-center cursor-pointer"
              :style="{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
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
                fontWeight: 'var(--b-text-body-font-weight)',
                lineHeight: 'var(--b-text-body-line-height)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: '1'
              }">{{ item.label }}</span>
              
              <!-- Badge or other elements can go here -->
              <div v-if="item.children && item.children.length > 0" :style="{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }">
                <template v-if="hoveredItem === item.label || expandedItem === item.label">
                  <icon-chevron-up v-if="expandedItem === item.label" :size="16" color="var(--b-color-label-inverse-secondary)" />
                  <icon-chevron-down v-else :size="16" color="var(--b-color-label-inverse-secondary)" />
                </template>
              </div>
              <div
                v-else-if="(isFavorited(item.label) || hoveredItem === item.label)"
                :style="{ cursor: 'pointer', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto' }"
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
                      height: 'var(--b-spacer-100)',
                      paddingRight: 'var(--b-spacer-060)',
                      paddingLeft: 'var(--b-spacer-120)',
                      borderRadius: 'var(--b-border-radius-m)',
                      color: activeItem === child.label || hoveredChildItem === child.label
                        ? 'var(--b-color-label-inverse-primary)'
                        : 'var(--b-color-label-inverse-secondary)',
                      backgroundColor: activeItem === child.label
                        ? 'var(--b-color-background-inverse-secondary)'
                        : hoveredChildItem === child.label
                        ? 'var(--b-color-background-always-dark-primary-hover)'
                        : 'transparent',
                      transition: 'color var(--b-animation-duration-moderate) var(--b-animation-easing-standard), background-color var(--b-animation-duration-moderate) var(--b-animation-easing-standard)',
                    }"
                    @mouseenter="hoveredChildItem = child.label"
                    @mouseleave="hoveredChildItem = null"
                    @click="navigateToChild(child)"
                  >
                    <span :style="{ ...bodyStyle, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }">
                      {{ child.label }}
                    </span>
                    <div
                      v-if="isFavorited(child.label) || hoveredChildItem === child.label"
                      :style="{ cursor: 'pointer', width: 'var(--b-spacer-070, 28px)', height: 'var(--b-spacer-070, 28px)', display: 'flex', alignItems: 'center', justifyContent: 'center', '--fill-0': 'var(--b-color-label-inverse-secondary)' }"
                      @click.stop="toggleFavorite(child.label)"
                    >
                      <icon-star-filled v-if="isFavorited(child.label)" />
                      <icon-star v-else />
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </nav>
      </div>
    </div>

    <!-- Language Selector -->
    <div :style="{ padding: 'var(--b-spacer-040)' }">
      <button
        class="flex items-center justify-between w-full"
        :style="{
          paddingLeft: 'var(--b-spacer-060)',
          paddingRight: 'var(--b-spacer-060)',
          paddingTop: 'var(--b-spacer-020)',
          paddingBottom: 'var(--b-spacer-020)',
          borderRadius: 'var(--b-border-radius-m)',
          backgroundColor: isLangHovered ? 'var(--b-color-background-always-dark-primary-hover)' : 'transparent',
          transition: 'color var(--b-animation-duration-moderate) var(--b-animation-easing-standard), background-color var(--b-animation-duration-moderate) var(--b-animation-easing-standard)',
          border: 'none',
          cursor: 'pointer',
        }"
        @mouseenter="isLangHovered = true"
        @mouseleave="isLangHovered = false"
      >
        <span :style="{ ...bodyStyle, color: isLangHovered ? 'var(--b-color-label-inverse-primary)' : 'var(--b-color-label-inverse-secondary)' }">
          English (en-US)
        </span>
        <icon-chevron-down
          :size="16"
          :color="isLangHovered ? 'var(--b-color-label-always-light)' : 'var(--b-color-label-inverse-secondary)'"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IconChevronDown from './icons/IconChevronDown.vue';
import IconChevronUp from './icons/IconChevronUp.vue';
import IconCross from './icons/IconCross.vue';
import IconExpandVertically from './icons/IconExpandVertically.vue';
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
      favorites: [] as string[],
      isHeaderHovered: false,
      isLangHovered: false,
      navItems: [
        { icon: 'icon-home', label: 'Home', route: '/home' },
        { icon: 'icon-grid', label: 'Transactions', children: [
          { label: 'Payments', route: '/transactions/payments' }, 
          { label: 'Offers', route: '/transactions/offers' }, 
          { label: 'Payouts', route: '/transactions/payouts' },
        ]},
        { icon: 'icon-users', label: 'Accounts & balances', children: [
          { label: 'Account holders', route: '/accounts/account-holders' }, 
          { label: 'Score', route: '/accounts/score' },
        ]},
        { icon: 'icon-diamond', label: 'Performance', route: '/performance' },
        { icon: 'icon-shield', label: 'Revenue & risk', children: [
          { label: 'Uplift overview', route: '/revenue-risk/uplift-overview' }, 
          { label: 'Recommendations', route: '/revenue-risk/recommendations' }, 
          { label: 'Case management', route: '/revenue-risk/case-management' },
          { label: 'Disputes', route: '/revenue-risk/disputes' }, 
          { label: 'Dynamic 3D Secure', route: '/revenue-risk/dynamic-3d-secure' }, 
          { label: 'Experiments', route: '/revenue-risk/experiments' },
          { label: 'Risk fields', route: '/revenue-risk/risk-fields' }, 
          { label: 'Risk lists', route: '/revenue-risk/risk-lists' }, 
          { label: 'Risk profiles', route: '/revenue-risk/risk-profiles' },
          { label: 'Risk profile details', route: '/revenue-risk/risk-profile-details' }, 
          { label: 'Settings', route: '/revenue-risk/settings' },
        ]},
        { icon: 'icon-handshake', label: 'Partner', children: [
          { label: 'Overview', route: '/partner/overview' }, 
          { label: 'Referrals', route: '/partner/referrals' }, 
          { label: 'Commissions', route: '/partner/commissions' }, 
          { label: 'Merchant access', route: '/partner/merchant-access' },
        ]},
        { icon: 'icon-wallet', label: 'Finance', children: [
          { label: 'Finance Workspace', route: '/finance' },
          { label: 'Balances overview', route: '/finance/balances-overview' }, 
          { label: 'Company balances overview', route: '/finance/company-balances-overview' },
          { label: 'MPL', route: '/finance/mpl' }, 
          { label: 'Invoices', route: '/finance/invoices' }, 
          { label: 'Sales to payouts', route: '/finance/sales-to-payouts' },
          { label: 'Payout accounts', route: '/finance/payout-accounts' }, 
          { label: 'Payout model', route: '/finance/payout-model' }, 
          { label: 'Reporting manager', route: '/finance/reporting-manager' },
        ]},
        { icon: 'icon-bar-chart', label: 'Insights', children: [
          { label: 'Checkout', route: '/insights/checkout' }, 
          { label: 'Payment lifecycle', route: '/insights/payment-lifecycle' }, 
          { label: 'Risk & dispute management', route: '/insights/risk-dispute-management' },
        ]},
        { icon: 'icon-file-text', label: 'Reports', route: '/reports' },
        { icon: 'icon-store', label: 'In-person payments', children: [
          { label: 'Orders and returns', route: '/in-person-payments/orders-returns' }, 
          { label: 'Stores', route: '/in-person-payments/stores' }, 
          { label: 'Terminals', route: '/in-person-payments/terminals' },
          { label: 'Tap to pay & card reader', route: '/in-person-payments/tap-to-pay' }, 
          { label: 'Terminal settings', route: '/in-person-payments/terminal-settings' },
          { label: 'Android', route: '/in-person-payments/android' }, 
          { label: 'Terminal software', route: '/in-person-payments/terminal-software' }, 
          { label: 'Themes', route: '/in-person-payments/themes' },
        ]},
        { icon: 'icon-link', label: 'Pay by Link', children: [
          { label: 'Payment links', route: '/pay-by-link/payment-links' }, 
          { label: 'Themes' }, { label: 'Settings' },
        ]},
        { icon: 'icon-code', label: 'Developers', children: [
          { label: 'Integration guide', route: '/developers/integration-guide' }, 
          { label: 'Dashboard', route: '/developers/dashboard' }, 
          { label: 'API credentials', route: '/developers/api-credentials' },
          { label: 'API URLs' }, { label: 'Additional data' }, { label: 'API logs' },
          { label: 'Webhooks', route: '/developers/webhooks' }, 
          { label: 'Event logs' }, { label: 'OAuth apps' },
          { label: 'OAuth authorizations' }, { label: 'Go-live checklist' }, { label: 'OPI configurations' },
        ]},
        { icon: 'icon-heart', label: 'Giving', children: [
          { label: 'Campaigns', route: '/giving/campaigns' }, 
          { label: 'Nonprofit library' },
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
        color: 'var(--b-color-label-inverse-secondary)',
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
      if (isActive) return 'var(--b-color-background-inverse-secondary)';
      if (isHovered) return 'var(--b-color-background-always-dark-primary-hover)';
      return 'transparent';
    },
    getItemColor(item: NavItem): string {
      const isActive = this.activeItem === item.label;
      const isHovered = this.hoveredItem === item.label;
      if (isActive || isHovered) return 'var(--b-color-label-inverse-primary)';
      return 'var(--b-color-label-inverse-secondary)';
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
