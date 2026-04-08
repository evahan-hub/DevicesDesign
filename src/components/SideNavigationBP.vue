<template>
  <div :style="navStyle">

    <!-- Account Button -->
    <div
      :style="accountButtonStyle"
      @mouseenter="isAccountHovered = true"
      @mouseleave="isAccountHovered = false"
    >
      <div :style="{ display: 'flex', alignItems: 'center', gap: 'var(--b-spacer-040)' }">
        <!-- Account logo -->
        <div :style="accountLogoStyle">
          <span :style="accountLogoTextStyle">ms.</span>
        </div>
        <!-- Account info -->
        <div :style="{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }">
          <span :style="accountNameStyle">MyStore</span>
          <span :style="accountLevelStyle">Company</span>
        </div>
      </div>
      <!-- Chevron up/down -->
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M5 7l4-4 4 4" :stroke="isAccountHovered ? 'var(--b-color-label-inverse-primary)' : 'var(--b-color-label-inverse-secondary)'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5 11l4 4 4-4" :stroke="isAccountHovered ? 'var(--b-color-label-inverse-primary)' : 'var(--b-color-label-inverse-secondary)'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <!-- Scrollable area -->
    <div :style="scrollAreaStyle">

      <!-- Actions: Search + Messages -->
      <div :style="{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--b-spacer-020)' }">
        <!-- Search -->
        <div
          :style="{ position: 'relative', height: '32px', margin: '0 8px', cursor: 'pointer' }"
          @mouseenter="hoveredAction = 'search'"
          @mouseleave="hoveredAction = null"
        >
          <div
            :style="{
              position: 'absolute', inset: 0, borderRadius: 'var(--b-border-radius-m)',
              backgroundColor: hoveredAction === 'search' ? 'var(--b-color-background-inverse-secondary)' : 'transparent',
              transition: 'background-color var(--b-animation-duration-moderate) var(--b-animation-easing-standard)',
            }"
          />
          <!-- Icon -->
          <div :style="{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', backgroundColor: 'var(--b-color-label-inverse-secondary)', borderRadius: 'var(--b-border-radius-s)', opacity: '0.4' }" />
          <!-- Label -->
          <span :style="{ position: 'absolute', left: '44px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--b-text-body-font-family)', fontSize: 'var(--b-text-body-font-size)', color: 'var(--b-color-label-inverse-secondary)', lineHeight: '16px' }">Search</span>
          <!-- CMD+/ badge -->
          <span :style="{ position: 'absolute', right: '12px', top: '7px', border: '1px solid var(--b-color-outline-inverse-secondary)', borderRadius: 'var(--b-border-radius-s)', padding: '1px 4px', fontFamily: 'var(--b-text-body-font-family)', fontSize: '10px', fontWeight: 'var(--b-text-body-stronger-font-weight)', color: 'var(--b-color-label-inverse-secondary)' }">CMD + /</span>
        </div>
        <!-- Messages -->
        <div
          :style="{ position: 'relative', height: '32px', margin: '0 8px', cursor: 'pointer' }"
          @mouseenter="hoveredAction = 'messages'"
          @mouseleave="hoveredAction = null"
        >
          <div
            :style="{
              position: 'absolute', inset: 0, borderRadius: 'var(--b-border-radius-m)',
              backgroundColor: hoveredAction === 'messages' ? 'var(--b-color-background-inverse-secondary)' : 'transparent',
              transition: 'background-color var(--b-animation-duration-moderate) var(--b-animation-easing-standard)',
            }"
          />
          <!-- Icon -->
          <div :style="{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', backgroundColor: 'var(--b-color-label-inverse-secondary)', borderRadius: 'var(--b-border-radius-s)', opacity: '0.4' }" />
          <!-- Label -->
          <span :style="{ position: 'absolute', left: '44px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--b-text-body-font-family)', fontSize: 'var(--b-text-body-font-size)', color: 'var(--b-color-label-inverse-secondary)', lineHeight: '16px' }">Messages</span>
          <!-- Count badge -->
          <span :style="{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'var(--b-color-background-inverse-secondary)', borderRadius: 'var(--b-border-radius-s)', padding: '2px 4px', fontFamily: 'var(--b-text-body-font-family)', fontSize: '12px', fontWeight: 'var(--b-text-body-stronger-font-weight)', color: 'var(--b-color-label-inverse-primary)', lineHeight: '14px' }">3</span>
        </div>
      </div>

      <!-- Pages section -->
      <div :style="{ paddingTop: 'var(--b-spacer-020)' }">
        <div :style="sectionLabelStyle">Pages</div>

        <nav>
          <div v-for="item in navItems" :key="item.key">
            <!-- Top-level item -->
            <div
              :style="navItemStyle(item)"
              @mouseenter="hoveredItem = item.key"
              @mouseleave="hoveredItem = null"
              @click="handleItemClick(item)"
            >
              <div :style="{ display: 'flex', alignItems: 'center', gap: 'var(--b-spacer-060)' }">
                <div :style="iconPlaceholderStyle" />
                <span :style="navLabelStyle(item)">{{ item.label }}</span>
              </div>
              <!-- Chevron for expandable -->
              <svg v-if="item.children" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  v-if="expandedGroups[item.key]"
                  d="M3 10l5-5 5 5"
                  stroke="var(--b-color-label-inverse-secondary)"
                  stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
                />
                <path
                  v-else
                  d="M3 6l5 5 5-5"
                  stroke="var(--b-color-label-inverse-secondary)"
                  stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
                />
              </svg>
            </div>

            <!-- Children (sub-items) -->
            <div v-if="item.children && expandedGroups[item.key]">
              <div
                v-for="child in item.children"
                :key="child.key"
                :style="childItemStyle(child)"
                @mouseenter="hoveredItem = child.key"
                @mouseleave="hoveredItem = null"
                @click="navigateTo(child.route)"
              >
                <span :style="childLabelStyle(child)">{{ child.label }}</span>
              </div>
            </div>
          </div>
        </nav>
      </div>

    </div>

    <!-- Bottom area (reserved for future use) -->
    <div :style="{ height: 'var(--b-spacer-110)', flexShrink: 0 }" />

  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface NavChild {
  key: string;
  label: string;
  route: string;
}

interface NavItem {
  key: string;
  label: string;
  route?: string;
  children?: NavChild[];
}

export default Vue.extend({
  name: 'SideNavigationBP',

  data() {
    return {
      isAccountHovered: false,
      hoveredItem: null as string | null,
      hoveredAction: null as string | null,
      expandedGroups: { transactions: true } as Record<string, boolean>,

      navItems: [
        { key: 'home', label: 'Home', route: '/home' },
        {
          key: 'transactions',
          label: 'Transactions',
          children: [
            { key: 'payments', label: 'Payments', route: '/transactions/payments' },
            { key: 'offers', label: 'Offers', route: '/transactions/offers' },
            { key: 'payouts', label: 'Payouts', route: '/transactions/payouts' },
            { key: 'transfers', label: 'Transfers', route: '/transactions/transfers' },
          ],
        },
        { key: 'accounts', label: 'Accounts & Balances', route: '/accounts' },
        { key: 'financial-products', label: 'Financial Products', route: '/financial-products' },
        { key: 'revenue-risk', label: 'Revenue & Risk', route: '/revenue-risk' },
        { key: 'finance', label: 'Finance', route: '/finance' },
        { key: 'settings', label: 'Settings', route: '/settings' },
      ] as NavItem[],
    };
  },

  computed: {
    activeRoute(): string {
      return this.$route?.path ?? '';
    },

    navStyle(): object {
      return {
        width: '248px',
        height: '100vh',
        maxHeight: '100vh',
        backgroundColor: 'var(--b-color-background-inverse-primary)',
        flexShrink: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      };
    },

    accountButtonStyle(): object {
      return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        padding: 'var(--b-spacer-030)',
        margin: 'var(--b-spacer-020)',
        borderRadius: 'var(--b-border-radius-m)',
        backgroundColor: this.isAccountHovered
          ? 'var(--b-color-background-inverse-secondary)'
          : 'transparent',
        transition: 'background-color var(--b-animation-duration-moderate) var(--b-animation-easing-standard)',
      };
    },

    accountLogoStyle(): object {
      return {
        width: '32px',
        height: '32px',
        backgroundColor: 'var(--b-color-background-always-light)',
        borderRadius: 'var(--b-border-radius-m)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      };
    },

    accountLogoTextStyle(): object {
      return {
        fontFamily: 'var(--b-text-body-font-family)',
        fontSize: '10px',
        fontWeight: 'var(--b-text-body-stronger-font-weight)',
        color: 'var(--b-color-label-primary)',
      };
    },

    accountNameStyle(): object {
      return {
        fontFamily: 'var(--b-text-body-font-family)',
        fontSize: 'var(--b-text-body-font-size)',
        fontWeight: 'var(--b-text-body-stronger-font-weight)',
        color: 'var(--b-color-label-inverse-primary)',
        lineHeight: '16px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      };
    },

    accountLevelStyle(): object {
      return {
        fontFamily: 'var(--b-text-body-font-family)',
        fontSize: 'var(--b-text-caption-font-size)',
        color: 'var(--b-color-label-inverse-secondary)',
        lineHeight: '14px',
      };
    },

    scrollAreaStyle(): object {
      return {
        flex: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 'var(--b-spacer-020)',
        paddingRight: 'var(--b-spacer-020)',
        paddingTop: 'var(--b-spacer-020)',
        minHeight: 0,
      };
    },

    iconPlaceholderStyle(): object {
      return {
        width: '16px',
        height: '16px',
        backgroundColor: 'var(--b-color-label-inverse-secondary)',
        borderRadius: 'var(--b-border-radius-s)',
        flexShrink: 0,
        opacity: '0.4',
      };
    },

    sectionLabelStyle(): object {
      return {
        fontFamily: 'var(--b-text-body-font-family)',
        fontSize: '10px',
        fontWeight: 'var(--b-text-body-stronger-font-weight)',
        letterSpacing: '0.4px',
        textTransform: 'uppercase',
        color: 'var(--b-color-label-inverse-secondary)',
        padding: 'var(--b-spacer-020) var(--b-spacer-040)',
        marginBottom: 'var(--b-spacer-010)',
      };
    },

    kbdStyle(): object {
      return {
        fontFamily: 'var(--b-text-body-font-family)',
        fontSize: '10px',
        fontWeight: 'var(--b-text-body-stronger-font-weight)',
        color: 'var(--b-color-label-inverse-secondary)',
        border: '1px solid var(--b-color-outline-inverse-secondary)',
        borderRadius: 'var(--b-border-radius-s)',
        padding: '1px var(--b-spacer-020)',
        flexShrink: 0,
      };
    },

    badgeStyle(): object {
      return {
        fontFamily: 'var(--b-text-body-font-family)',
        fontSize: '12px',
        fontWeight: 'var(--b-text-body-stronger-font-weight)',
        color: 'var(--b-color-label-inverse-primary)',
        backgroundColor: 'var(--b-color-background-inverse-secondary)',
        borderRadius: 'var(--b-border-radius-s)',
        padding: '2px var(--b-spacer-020)',
        lineHeight: '14px',
        flexShrink: 0,
      };
    },
  },

  methods: {
    actionItemStyle(hovered: boolean): object {
      return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '32px',
        paddingLeft: 'var(--b-spacer-040)',
        paddingRight: 'var(--b-spacer-040)',
        margin: '0 var(--b-spacer-020)',
        borderRadius: 'var(--b-border-radius-m)',
        cursor: 'pointer',
        backgroundColor: hovered ? 'var(--b-color-background-inverse-secondary)' : 'transparent',
        transition: 'background-color var(--b-animation-duration-moderate) var(--b-animation-easing-standard)',
      };
    },

    actionLabelStyle(): object {
      return {
        fontFamily: 'var(--b-text-body-font-family)',
        fontSize: 'var(--b-text-body-font-size)',
        color: 'var(--b-color-label-inverse-secondary)',
        lineHeight: '16px',
      };
    },

    navItemStyle(item: NavItem): object {
      const isActive = item.route ? this.activeRoute === item.route : false;
      const isHovered = this.hoveredItem === item.key;
      return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '32px',
        paddingLeft: 'var(--b-spacer-060)',
        paddingRight: 'var(--b-spacer-040)',
        margin: '0 var(--b-spacer-020)',
        borderRadius: 'var(--b-border-radius-m)',
        cursor: 'pointer',
        backgroundColor: isActive || isHovered ? 'var(--b-color-background-inverse-secondary)' : 'transparent',
        transition: 'background-color var(--b-animation-duration-moderate) var(--b-animation-easing-standard)',
      };
    },

    navLabelStyle(item: NavItem): object {
      const isActive = item.route ? this.activeRoute === item.route : false;
      return {
        fontFamily: 'var(--b-text-body-font-family)',
        fontSize: 'var(--b-text-body-font-size)',
        color: isActive ? 'var(--b-color-label-inverse-primary)' : 'var(--b-color-label-inverse-secondary)',
        lineHeight: '16px',
      };
    },

    childItemStyle(child: NavChild): object {
      const isActive = this.activeRoute === child.route || this.activeRoute.startsWith(child.route);
      const isHovered = this.hoveredItem === child.key;
      return {
        display: 'flex',
        alignItems: 'center',
        height: '32px',
        paddingLeft: 'var(--b-spacer-100)',
        paddingRight: 'var(--b-spacer-040)',
        margin: '0 var(--b-spacer-020)',
        borderRadius: 'var(--b-border-radius-m)',
        cursor: 'pointer',
        backgroundColor: isActive ? 'var(--b-color-background-inverse-secondary)' : isHovered ? 'var(--b-color-background-always-dark-secondary)' : 'transparent',
        transition: 'background-color var(--b-animation-duration-moderate) var(--b-animation-easing-standard)',
      };
    },

    childLabelStyle(child: NavChild): object {
      const isActive = this.activeRoute === child.route || this.activeRoute.startsWith(child.route);
      return {
        fontFamily: 'var(--b-text-body-font-family)',
        fontSize: 'var(--b-text-body-font-size)',
        color: isActive ? 'var(--b-color-label-inverse-primary)' : 'var(--b-color-label-inverse-secondary)',
        lineHeight: '16px',
      };
    },

    handleItemClick(item: NavItem): void {
      if (item.children) {
        this.$set(this.expandedGroups, item.key, !this.expandedGroups[item.key]);
      } else if (item.route) {
        this.navigateTo(item.route);
      }
    },

    navigateTo(route: string): void {
      if (this.$route?.path !== route) {
        this.$router.push(route).catch(() => {});
      }
    },
  },
});
</script>
