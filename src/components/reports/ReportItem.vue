<template>
    <section class="report-item">
        <div
            class="report-item__left"
            :class="report.description ? 'report-item__left--top' : 'report-item__left--center'"
        >
            <bento-button
                :title="report.favorite ? 'Remove report from favorites' : 'Add report to favorites'"
                type="button"
                :variant="BentoButtonVariant.TERTIARY"
                @click="$emit('toggle-favorite', report)"
            >
                <span class="report-item__star-wrap">
                    <svg v-if="report.favorite" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1.5l2.09 4.26 4.71.69-3.4 3.32.8 4.69L8 12.26l-4.2 2.2.8-4.69-3.4-3.32 4.71-.69L8 1.5z" fill="#F5A623" stroke="#F5A623" stroke-width="1"/>
                    </svg>
                    <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1.5l2.09 4.26 4.71.69-3.4 3.32.8 4.69L8 12.26l-4.2 2.2.8-4.69-3.4-3.32 4.71-.69L8 1.5z" stroke="#8c9bab" stroke-width="1.2" fill="none"/>
                    </svg>
                </span>
            </bento-button>

            <div class="report-item__content">
                <div class="report-item__title-row">
                    <router-link
                        :to="{ name: 'report-details', params: { reportCode: report.code } }"
                        class="report-item__link"
                    >
                        <bento-typography :variant="BentoTypographyVariant.TITLE">
                            <span v-html="highlightText(report.title)" />
                        </bento-typography>
                    </router-link>
                    <bento-tag :variant="tagMeta.color" :label="tagMeta.label" />
                </div>
                <bento-typography v-if="report.description" :variant="BentoTypographyVariant.BODY">
                    <span class="report-item__description" v-html="highlightText(truncatedDescription)" />
                </bento-typography>
            </div>
        </div>

        <div class="report-item__actions">
            <bento-button
                :variant="BentoButtonVariant.TERTIARY"
                @click="$emit('view-reports', report)"
            >
                View reports
            </bento-button>
            <bento-button
                v-if="showGenerate"
                :variant="BentoButtonVariant.SECONDARY"
                @click="$emit('generate', report)"
            >
                Generate
            </bento-button>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
    BentoTag,
    BentoTagVariant,
    BentoTypography,
    BentoTypographyVariant,
    BentoButton,
    BentoButtonVariant,
} from '@adyen/bento-vue2';
import type { MockReport } from '../../data/reports';

const TRUNCATION_LIMIT = 240;

export default defineComponent({
    name: 'ReportItem',
    components: { BentoTag, BentoTypography, BentoButton },
    props: {
        report: { type: Object as PropType<MockReport>, required: true },
        searchTerm: { type: String, default: '' },
    },
    emits: ['toggle-favorite', 'generate', 'view-reports'],
    data() {
        return { BentoTypographyVariant, BentoButtonVariant };
    },
    computed: {
        tagMeta(): { color: BentoTagVariant; label: string } {
            if (this.report.isMerchantOnly) {
                return { color: BentoTagVariant.GREY, label: 'Merchant-level only' };
            }
            return this.report.subscription.active
                ? { color: BentoTagVariant.GREEN, label: 'Automated' }
                : { color: BentoTagVariant.ORANGE, label: 'Manual' };
        },
        truncatedDescription(): string {
            const desc = this.report.description;
            if (!desc) return '';
            return desc.length > TRUNCATION_LIMIT ? `${desc.slice(0, TRUNCATION_LIMIT)}...` : desc;
        },
        showGenerate(): boolean {
            return !!(this.report.userAllowedToManageReport && this.report.links?.generateReport);
        },
    },
    methods: {
        highlightText(text: string): string {
            if (!this.searchTerm || !text) return text;
            const regex = new RegExp(`(${this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        },
    },
});
</script>

<style lang="scss" scoped>
.report-item {
    display: grid;
    grid-template-columns: 1fr 350px;
    align-items: center;
    border-bottom: 1px solid var(--b-color-outline-primary);
    padding: var(--b-spacer-040);

    &:hover {
        background-color: var(--b-color-background-always-light-hover);
    }

    &__left {
        display: flex;

        &--top {
            align-items: flex-start;
        }

        &--center {
            align-items: center;
        }
    }

    &__star-wrap {
        padding: 11px var(--b-spacer-030) var(--b-spacer-030) 0;
        display: flex;
        align-items: center;
    }

    &__content {
        margin: 0.5rem 0;
    }

    &__title-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    &__title {
        font-size: var(--b-text-title-font-size);
        font-weight: var(--b-text-title-font-weight);
        color: var(--b-color-label-primary);
        cursor: pointer;

        &:hover {
            text-decoration: underline;
            text-underline-offset: var(--b-spacer-010);
        }

        :deep(mark) {
            background-color: var(--b-color-background-accent-highlight, #fff3b0);
            color: inherit;
            border-radius: 2px;
        }
    }

    &__description {
        color: var(--b-color-label-secondary);
        font-size: var(--b-text-caption-font-size);
        line-height: var(--b-text-caption-line-height);
        margin-top: var(--b-spacer-010);
    }

    &__actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        align-items: center;
    }
}
</style>
