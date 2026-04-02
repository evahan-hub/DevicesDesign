<template>
    <div class="reports-list">
        <div class="reports-list__header">
            <bento-typography class="reports-list__title" :variant="BentoTypographyVariant.TITLE" large>
                Reports
            </bento-typography>

            <bento-search-bar
                v-if="!error"
                v-model="searchTerm"
                class="reports-list__search-bar"
                input-field-aria-label="Search for reports"
                placeholder="Search reports..."
                :debounce-time="500"
                @input="e => (searchTerm = e)"
                @clear="() => (searchTerm = '')"
            />
        </div>

        <div v-if="loading" class="reports-list__loader">
            <bento-loading-indicator />
        </div>

        <bento-alert v-else-if="error" type="critical">
            <template #default>{{ error }}</template>
        </bento-alert>

        <template v-else>
            <bento-tabs
                :active-tab-index="activeTabIndex"
                @update:active-tab-index="setActiveTab"
            >
                <bento-tab
                    v-for="tab in categories"
                    :key="tab.category"
                    :title="tab.name"
                    :counter="tab.count"
                />
            </bento-tabs>

            <div class="reports-list__tab-content">
                <!-- Reports grouped by subcategory or flat -->
                <report-data-grid
                    v-if="!hasSubCategories"
                    :reports="regularReports"
                    :search-term="searchTerm"
                    title=""
                    @toggle-favorite="toggleFavorite"
                    @generate="generateReport"
                />

                <template v-else>
                    <report-data-grid
                        v-for="sub in subCategories"
                        :key="sub"
                        :reports="regularReports.filter(r => r.subCategory === sub)"
                        :search-term="searchTerm"
                        :title="getSubcategoryTitle(sub)"
                        @toggle-favorite="toggleFavorite"
                        @generate="generateReport"
                    />
                </template>

                <!-- Empty bookmarks placeholder -->
                <div v-if="hasFavorites" class="reports-list__placeholder">
                    <bento-typography :variant="BentoTypographyVariant.TITLE" medium>
                        You don't have any bookmarked reports yet
                    </bento-typography>
                    <bento-typography :variant="BentoTypographyVariant.BODY" wide>
                        Bookmark a report and it will show up here for quicker access
                    </bento-typography>
                </div>

                <!-- Suggested (Bookmarks tab only) -->
                <template v-if="activeTabIndex === 0">
                    <report-data-grid
                        :reports="suggestedReports"
                        :search-term="searchTerm"
                        title="Suggested"
                        @toggle-favorite="toggleFavorite"
                        @generate="generateReport"
                    />
                </template>

                <bento-empty-state
                    v-if="showEmptyState"
                    title="No reports were found"
                    image="no-results-found"
                    variant="full-page"
                    :action="{ title: 'Reload reports', event: () => (searchTerm = '') }"
                >
                    Try a different term or reset reports
                </bento-empty-state>
            </div>
        </template>

        <bento-toast />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
    BentoTypography,
    BentoTypographyVariant,
    BentoSearchBar,
    BentoLoadingIndicator,
    BentoEmptyState,
    BentoToast,
    BentoAlert,
    BentoTabs,
    BentoTab,
} from '@adyen/bento-vue2';
import { mockReports } from '../data/reports';
import type { MockReport } from '../data/reports';
import ReportDataGrid from '../components/reports/ReportDataGrid.vue';

const CATEGORY_ORDER = ['favorites', 'all', 'finance', 'risk', 'performance', 'accounts', 'pointofsale', 'balanceplatform', 'transactions', 'others'];

const CATEGORY_NAMES: Record<string, string> = {
    favorites: 'Bookmarks',
    all: 'All',
    finance: 'Finance',
    risk: 'Risk',
    performance: 'Performance',
    accounts: 'Account',
    pointofsale: 'Point of sale',
    balanceplatform: 'BalancePlatform',
    transactions: 'Transactions',
    others: 'Others',
};

const SUBCATEGORY_NAMES: Record<string, string> = {
    SETTLEMENTS: 'Settlements',
    PAYMENTS: 'Payments',
    FEES_AND_COSTS: 'Fees and Costs',
    PLATFORM: 'Platform',
    DASHBOARDS: 'Dashboards',
    OTHERS: 'Others',
    UNCATEGORIZED: 'Uncategorized',
};

interface Category {
    category: string;
    name: string;
    count: number;
}

export default Vue.extend({
    name: 'ReportsPage',
    components: {
        BentoTypography,
        BentoSearchBar,
        BentoLoadingIndicator,
        BentoEmptyState,
        BentoToast,
        BentoAlert,
        BentoTabs,
        BentoTab,
        ReportDataGrid,
    },
    data() {
        return {
            BentoTypographyVariant,
            searchTerm: '',
            loading: true,
            error: null as string | null,
            reportsList: [] as MockReport[],
            activeTabIndex: 0,
        };
    },
    computed: {
        categories(): Category[] {
            const reports = this.reportsList;
            const catCounts: Record<string, number> = {};
            reports.forEach(r => {
                const cat = r.category || 'others';
                catCounts[cat] = (catCounts[cat] || 0) + 1;
            });

            const result: Category[] = [];
            for (const cat of CATEGORY_ORDER) {
                if (cat === 'favorites') {
                    result.push({
                        category: 'favorites',
                        name: 'Bookmarks',
                        count: this.searchTerm
                            ? this.getSearchedReports('favorites').length
                            : reports.filter(r => r.favorite).length,
                    });
                } else if (cat === 'all') {
                    result.push({
                        category: 'all',
                        name: 'All',
                        count: this.searchTerm ? this.getSearchedReports('all').length : reports.length,
                    });
                } else if (catCounts[cat]) {
                    result.push({
                        category: cat,
                        name: CATEGORY_NAMES[cat] || cat,
                        count: this.searchTerm ? this.getSearchedReports(cat).length : catCounts[cat],
                    });
                }
            }
            return result;
        },
        activeCategory(): string {
            return this.categories[this.activeTabIndex]?.category || 'favorites';
        },
        regularReports(): MockReport[] {
            const reports = this.reportsList;
            const cat = this.activeCategory;
            if (cat === 'all') return reports.filter(r => !r.displayAction);
            if (cat === 'favorites') return reports.filter(r => r.favorite && !r.displayAction);
            return reports.filter(r => (r.category || 'others') === cat && !r.displayAction);
        },
        suggestedReports(): MockReport[] {
            return this.reportsList.filter(r => r.suggested && !r.favorite);
        },
        subCategories(): string[] {
            const seen = new Set<string>();
            const nonOthers: string[] = [];
            this.regularReports.forEach(r => {
                if (r.subCategory !== 'OTHERS' && !seen.has(r.subCategory)) {
                    seen.add(r.subCategory);
                    nonOthers.push(r.subCategory);
                }
            });
            const hasOthers = this.regularReports.some(r => r.subCategory === 'OTHERS');
            return hasOthers ? [...nonOthers, 'OTHERS'] : nonOthers;
        },
        hasSubCategories(): boolean {
            const noGroup = ['favorites', 'all', 'others'];
            if (noGroup.includes(this.activeCategory)) return false;
            if (!this.subCategories.length) return false;
            if (
                this.subCategories.length === 1 &&
                ['OTHERS', 'UNCATEGORIZED'].includes(this.subCategories[0])
            ) return false;
            return true;
        },
        hasFavorites(): boolean {
            return this.activeTabIndex === 0 && !this.regularReports.length;
        },
        showEmptyState(): boolean {
            return !!this.searchTerm && (this.categories[this.activeTabIndex]?.count ?? 0) === 0;
        },
    },
    created() {
        this.fetchReports();
        this.syncTabFromRoute();
    },
    watch: {
        '$route.query.tab': {
            handler() { this.syncTabFromRoute(); },
        },
        activeTabIndex(index: number) {
            const category = this.categories[index]?.category;
            if (!category) return;
            const current = this.$route.query.tab;
            if (current !== category) {
                this.$router.replace({ query: { ...this.$route.query, tab: category } }).catch(() => {});
            }
        },
    },
    methods: {
        fetchReports(): void {
            this.loading = true;
            setTimeout(() => {
                this.reportsList = mockReports.map(r => ({ ...r }));
                this.loading = false;
            }, 300);
        },
        syncTabFromRoute(): void {
            const tabParam = this.$route?.query?.tab as string | undefined;
            if (!tabParam) return;
            const index = this.categories.findIndex(c => c.category === tabParam);
            if (index >= 0) this.activeTabIndex = index;
        },
        getSearchedReports(category: string): MockReport[] {
            const q = this.searchTerm.toLowerCase();
            const match = (r: MockReport) =>
                r.title.toLowerCase().includes(q) || r.description?.toLowerCase().includes(q);
            const reports = this.reportsList;
            if (category === 'all') return reports.filter(match);
            if (category === 'favorites') return reports.filter(r => r.favorite && match(r));
            if (category === 'others') return reports.filter(r => !r.category && match(r));
            return reports.filter(r => r.category === category && match(r));
        },
        setActiveTab(index: number): void {
            this.activeTabIndex = index;
        },
        toggleFavorite(report: MockReport): void {
            const idx = this.reportsList.findIndex(r => r.code === report.code);
            if (idx >= 0) {
                this.$set(this.reportsList, idx, { ...report, favorite: !report.favorite });
            }
        },
        getSubcategoryTitle(key: string): string {
            return SUBCATEGORY_NAMES[key] || key;
        },
        generateReport(report: MockReport): void {
            console.log('Generate report:', report.title, report.code);
        },
    },
});
</script>

<style lang="scss" scoped>
.reports-list {
    padding: var(--b-spacer-060);

    &__header {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    &__title {
        margin-bottom: 8px;
    }

    &__tab-content {
        padding: var(--b-spacer-080) 0;
    }

    &__search-bar {
        max-width: calc(var(--b-spacer-050) * 30);
        margin-bottom: var(--b-spacer-080);
    }

    &__loader {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 50vh;
    }

    &__placeholder {
        height: calc(var(--b-spacer-070) * 10);
        border-radius: var(--b-spacer-060);
        background-color: var(--b-color-background-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: var(--b-spacer-080);
    }
}
</style>
