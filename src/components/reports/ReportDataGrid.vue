<template>
    <div v-if="paginatedReports.items.length" class="report-data-grid">
        <bento-typography
            v-if="title"
            class="report-data-grid__title"
            :variant="BentoTypographyVariant.TITLE"
            medium
        >
            {{ title }}
        </bento-typography>

        <report-item
            v-for="report in paginatedReports.items"
            :key="report.code"
            :report="report"
            :search-term="searchTerm"
            @toggle-favorite="e => $emit('toggle-favorite', e)"
            @generate="e => $emit('generate', e)"
        />

        <bento-pagination
            v-if="reports.length > perPage"
            class="report-data-grid__pagination"
            :size.sync="perPage"
            :page.sync="currentPage"
            :has-next="paginatedReports.hasNext"
            :total-count="reports.length"
            @navigate="e => (currentPage = e)"
            @items-page="e => { perPage = e; currentPage = 1; }"
        />
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { BentoPagination, BentoTypography, BentoTypographyVariant } from '@adyen/bento-vue2';
import type { MockReport } from '../../data/reports';
import ReportItem from './ReportItem.vue';

export default Vue.extend({
    name: 'ReportDataGrid',
    components: {
        BentoPagination,
        BentoTypography,
        ReportItem,
    },
    props: {
        reports: { type: Array as PropType<MockReport[]>, required: true },
        title: { type: String, default: '' },
        searchTerm: { type: String, default: '' },
    },
    data() {
        return {
            BentoTypographyVariant,
            perPage: 10,
            currentPage: 1,
        };
    },
    computed: {
        paginatedReports(): { items: MockReport[]; hasNext: boolean } {
            if (this.searchTerm) {
                const regex = new RegExp(this.searchTerm, 'i');
                const items = this.reports.filter(
                    r => regex.test(r.title) || regex.test(r.description)
                );
                return { hasNext: false, items };
            }
            const start = (this.currentPage - 1) * this.perPage;
            const end = this.currentPage * this.perPage;
            return {
                hasNext: end < this.reports.length,
                items: this.reports.slice(start, end),
            };
        },
    },
    watch: {
        reports() {
            this.currentPage = 1;
        },
    },
});
</script>

<style lang="scss" scoped>
.report-data-grid {
    margin-bottom: 40px;

    &__title {
        margin-bottom: 8px;
    }

    &__pagination {
        margin-top: 16px;
    }
}
</style>
