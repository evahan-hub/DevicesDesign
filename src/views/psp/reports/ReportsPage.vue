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
                    @view-reports="viewReport"
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
                        @view-reports="viewReport"
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
                        @view-reports="viewReport"
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

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import {
    BentoTypography, BentoTypographyVariant,
    BentoSearchBar, BentoLoadingIndicator, BentoEmptyState,
    BentoToast, BentoAlert, BentoTabs, BentoTab,
} from '@adyen/bento-vue2';
import { useRoute, useRouter } from 'vue-router/composables';
import { mockReports } from '../../../data/reports';
import type { MockReport } from '../../../data/reports';
import ReportDataGrid from '../../../components/reports/ReportDataGrid.vue';
import { CATEGORY_ORDER, REPORTS_ACTIVE_TAB_STORAGE_KEY, CATEGORY_NAMES, SUBCATEGORY_NAMES } from './reports-page.mock-data';

interface Category { category: string; name: string; count: number; }

const route = useRoute();
const router = useRouter();

const searchTerm = ref('');
const loading = ref(true);
const error = ref<string | null>(null);
const reportsList = ref<MockReport[]>([]);
const activeTabIndex = ref(0);

function getSearchedReports(category: string): MockReport[] {
    const q = searchTerm.value.toLowerCase();
    const match = (r: MockReport) => r.title.toLowerCase().includes(q) || r.description?.toLowerCase().includes(q);
    const reports = reportsList.value;
    if (category === 'all') return reports.filter(match);
    if (category === 'favorites') return reports.filter(r => r.favorite && match(r));
    if (category === 'others') return reports.filter(r => !r.category && match(r));
    return reports.filter(r => r.category === category && match(r));
}

const categories = computed<Category[]>(() => {
    const reports = reportsList.value;
    const catCounts: Record<string, number> = {};
    reports.forEach(r => { const cat = r.category || 'others'; catCounts[cat] = (catCounts[cat] || 0) + 1; });
    const result: Category[] = [];
    for (const cat of CATEGORY_ORDER) {
        if (cat === 'favorites') {
            result.push({ category: 'favorites', name: 'Bookmarks', count: searchTerm.value ? getSearchedReports('favorites').length : reports.filter(r => r.favorite).length });
        } else if (cat === 'all') {
            result.push({ category: 'all', name: 'All', count: searchTerm.value ? getSearchedReports('all').length : reports.length });
        } else if (catCounts[cat]) {
            result.push({ category: cat, name: CATEGORY_NAMES[cat] || cat, count: searchTerm.value ? getSearchedReports(cat).length : catCounts[cat] });
        }
    }
    return result;
});

const activeCategory = computed(() => categories.value[activeTabIndex.value]?.category || 'favorites');

const regularReports = computed<MockReport[]>(() => {
    const reports = reportsList.value;
    const cat = activeCategory.value;
    if (cat === 'all') return reports.filter(r => !r.displayAction);
    if (cat === 'favorites') return reports.filter(r => r.favorite && !r.displayAction);
    return reports.filter(r => (r.category || 'others') === cat && !r.displayAction);
});

const suggestedReports = computed<MockReport[]>(() => reportsList.value.filter(r => r.suggested && !r.favorite));

const subCategories = computed<string[]>(() => {
    const seen = new Set<string>();
    const nonOthers: string[] = [];
    regularReports.value.forEach(r => {
        if (r.subCategory !== 'OTHERS' && !seen.has(r.subCategory)) { seen.add(r.subCategory); nonOthers.push(r.subCategory); }
    });
    const hasOthers = regularReports.value.some(r => r.subCategory === 'OTHERS');
    return hasOthers ? [...nonOthers, 'OTHERS'] : nonOthers;
});

const hasSubCategories = computed(() => {
    if (['favorites', 'all', 'others'].includes(activeCategory.value)) return false;
    if (!subCategories.value.length) return false;
    if (subCategories.value.length === 1 && ['OTHERS', 'UNCATEGORIZED'].includes(subCategories.value[0])) return false;
    return true;
});

const hasFavorites = computed(() => activeTabIndex.value === 0 && !regularReports.value.length);
const showEmptyState = computed(() => !!searchTerm.value && (categories.value[activeTabIndex.value]?.count ?? 0) === 0);

function persistActiveTab(category: string): void {
    if (typeof window !== 'undefined') window.localStorage.setItem(REPORTS_ACTIVE_TAB_STORAGE_KEY, category);
}

function syncTabFromRoute(): void {
    const tabParam = route?.query?.tab as string | undefined;
    if (!tabParam) return;
    const index = categories.value.findIndex(c => c.category === tabParam);
    if (index >= 0) activeTabIndex.value = index;
}

function syncTabFromStorage(): void {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(REPORTS_ACTIVE_TAB_STORAGE_KEY);
    if (!stored) return;
    const index = categories.value.findIndex(c => c.category === stored);
    if (index >= 0) activeTabIndex.value = index;
}

function fetchReports(): void {
    loading.value = true;
    setTimeout(() => {
        reportsList.value = mockReports.map(r => ({ ...r }));
        loading.value = false;
        if (route?.query?.tab) { syncTabFromRoute(); } else { syncTabFromStorage(); }
    }, 300);
}

function setActiveTab(index: number): void { activeTabIndex.value = index; }

function toggleFavorite(report: MockReport): void {
    reportsList.value = reportsList.value.map(r => r.code === report.code ? { ...r, favorite: !r.favorite } : r);
}

function getSubcategoryTitle(key: string): string { return SUBCATEGORY_NAMES[key] || key; }

function generateReport(report: MockReport): void { console.log('Generate report:', report.title, report.code); }

function viewReport(report: MockReport): void {
    router.push({ name: 'report-details', params: { reportCode: report.code } }).catch(() => {});
}

watch(() => route.query.tab, () => syncTabFromRoute());
watch(activeTabIndex, (index: number) => {
    const category = categories.value[index]?.category;
    if (!category) return;
    persistActiveTab(category);
    const current = route.query.tab;
    if (current !== category) router.replace({ query: { ...route.query, tab: category } }).catch(() => {});
});

fetchReports();
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
