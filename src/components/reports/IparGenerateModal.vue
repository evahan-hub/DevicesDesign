<template>
    <div class="ipar-modal-overlay" @click.self="$emit('close')">
        <div class="ipar-modal">
            <div class="ipar-modal__header">
                <bento-typography :variant="BentoTypographyVariant.TITLE" medium>
                    Manual report (Interactive payment accounting)
                </bento-typography>
                <button class="ipar-modal__close" @click="$emit('close')" aria-label="Close">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>

            <div class="ipar-modal__divider"></div>

            <div class="ipar-modal__form">
                <bento-alert
                    v-if="template === 'invoice'"
                    type="highlight"
                    dismissible
                    class="ipar-modal__alert"
                >
                    The payment accounting report is set to Central European Time for invoice reconciliation.
                </bento-alert>

                <div class="ipar-modal__form-item">
                    <span class="ipar-modal__form-label">Template</span>
                    <div class="ipar-modal__form-field">
                        <bento-radio-group
                            label="Template"
                            hide-label
                            :items="templateItems"
                            :value="template"
                            @input="onTemplateInput"
                        />
                    </div>
                </div>

                <template v-if="template === 'custom'">
                    <div class="ipar-modal__form-item">
                        <span class="ipar-modal__form-label">Date range</span>
                        <div class="ipar-modal__form-field">
                            <bento-date-range-picker
                                label="Date range"
                                hide-label
                                :value="dateRange"
                                placeholder="Select a date range"
                                @input="dateRange = $event"
                            />
                        </div>
                    </div>

                    <div class="ipar-modal__form-item">
                        <span class="ipar-modal__form-label">Time zone</span>
                        <div class="ipar-modal__form-field">
                            <bento-radio-group
                                label="Time zone"
                                hide-label
                                :items="timezoneItems"
                                :value="timezone"
                                @input="onTimezoneInput"
                            />
                        </div>
                    </div>

                    <div class="ipar-modal__form-item">
                        <span class="ipar-modal__form-label">Events to report on</span>
                        <div class="ipar-modal__form-field">
                            <div class="ipar-modal__select-wrapper">
                                <select v-model="eventsToReport" class="ipar-modal__select">
                                    <option :value="null" disabled>Select</option>
                                    <option v-for="item in eventsItems" :key="item.value" :value="item.value">
                                        {{ item.label }}
                                    </option>
                                </select>
                                <span class="ipar-modal__select-icon">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="ipar-modal__form-item">
                        <span class="ipar-modal__form-label">File type</span>
                        <div class="ipar-modal__form-field">
                            <div class="ipar-modal__select-wrapper">
                                <select v-model="fileType" class="ipar-modal__select">
                                    <option v-for="item in fileTypeItems" :key="item.value" :value="item.value">
                                        {{ item.label }}
                                    </option>
                                </select>
                                <span class="ipar-modal__select-icon">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="template === 'invoice'">
                    <div class="ipar-modal__form-item">
                        <span class="ipar-modal__form-label">Select month</span>
                        <div class="ipar-modal__form-field">
                            <div class="ipar-modal__select-wrapper">
                                <select v-model="selectedMonth" class="ipar-modal__select">
                                    <option :value="null" disabled>Select a month</option>
                                    <option v-for="item in monthItems" :key="item.value" :value="item.value">
                                        {{ item.label }}
                                    </option>
                                </select>
                                <span class="ipar-modal__select-icon">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="ipar-modal__form-item">
                        <span class="ipar-modal__form-label">File type</span>
                        <div class="ipar-modal__form-field">
                            <div class="ipar-modal__select-wrapper">
                                <select v-model="fileType" class="ipar-modal__select">
                                    <option v-for="item in fileTypeItems" :key="item.value" :value="item.value">
                                        {{ item.label }}
                                    </option>
                                </select>
                                <span class="ipar-modal__select-icon">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <div class="ipar-modal__footer">
                <bento-button :disabled="!isFormValid || generating" @click="handleGenerate">
                    {{ generating ? 'Generating...' : 'Generate report' }}
                </bento-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
    BentoTypography,
    BentoTypographyVariant,
    BentoButton,
    BentoRadioGroup,
    BentoDateRangePicker,
    BentoAlert,
} from '@adyen/bento-vue2';

export default Vue.extend({
    name: 'IparGenerateModal',
    components: { BentoTypography, BentoButton, BentoRadioGroup, BentoDateRangePicker, BentoAlert },
    data() {
        return {
            BentoTypographyVariant,
            template: 'custom' as string,
            templateItems: [
                { value: 'custom', label: 'Custom report' },
                { value: 'invoice', label: 'Invoice reconciliation' },
            ],
            timezoneItems: [
                { value: 'configured', label: 'Configured time zone' },
                { value: 'cet', label: 'Central European Time' },
            ],
            dateRange: null as any,
            timezone: 'configured' as string,
            eventsToReport: null as string | null,
            eventsItems: [
                { value: 'all', label: 'All events' },
                { value: 'settled', label: 'Settled' },
                { value: 'refunded', label: 'Refunded' },
                { value: 'chargebacked', label: 'Chargebacked' },
                { value: 'fee', label: 'Fee' },
                { value: 'misc_costs', label: 'Miscellaneous costs' },
            ],
            fileType: 'csv' as string,
            fileTypeItems: [
                { value: 'csv', label: '.CSV (Comma-separated values)' },
                { value: 'xlsx', label: '.XLSX (Excel)' },
            ],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            selectedMonth: null as number | null,
            generating: false,
        };
    },
    computed: {
        monthItems(): { value: number; label: string }[] {
            return this.months.map((label, idx) => ({ value: idx, label }));
        },
        isFormValid(): boolean {
            if (this.template === 'custom') {
                return !!(this.dateRange?.startDate && this.dateRange?.endDate && this.eventsToReport);
            }
            return this.selectedMonth !== null;
        },
    },
    methods: {
        onTemplateInput(value: any) {
            this.template = String(value);
        },
        onTimezoneInput(value: any) {
            this.timezone = String(value);
        },
        async handleGenerate() {
            this.generating = true;
            await new Promise(resolve => setTimeout(resolve, 1500));
            const payload: Record<string, any> = { template: this.template, fileType: this.fileType };
            if (this.template === 'custom') {
                payload.dateRange = { startDate: this.dateRange?.startDate, endDate: this.dateRange?.endDate };
                payload.timezone = this.timezone;
                payload.eventsToReport = this.eventsToReport;
            } else {
                payload.month = this.months[this.selectedMonth!];
            }
            this.generating = false;
            this.$emit('generate', payload);
        },
    },
});
</script>

<style lang="scss" scoped>
.ipar-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}

.ipar-modal {
    background: var(--b-color-background-primary, #fff);
    border-radius: 12px;
    width: 600px;
    max-height: 85vh;
    overflow-y: auto;
    box-shadow: 0 0 0 1px rgba(0, 17, 44, 0.08), 0 2px 4px rgba(0, 17, 44, 0.04), 0 6px 12px rgba(0, 17, 44, 0.08);

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 24px 16px;
    }

    &__close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: none;
        background: none;
        cursor: pointer;
        color: var(--b-color-label-secondary, #717171);
        border-radius: 6px;
        transition: all 0.15s ease;
        &:hover { background: var(--b-color-background-secondary, #f3f6f9); }
    }

    &__divider {
        height: 1px;
        background: var(--b-color-outline-secondary, #e6e9eb);
        margin: 0 24px;
    }

    &__form {
        padding: 24px 24px 12px;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    &__form-item {
        display: flex;
        gap: 32px;
        align-items: flex-start;
    }

    &__form-label {
        width: 140px;
        flex-shrink: 0;
        font-size: var(--b-text-body-font-size);
        font-weight: 600;
        line-height: var(--b-text-body-line-height);
        color: var(--b-color-label-primary, #00112c);
    }

    &__form-field {
        flex: 1;
        min-width: 0;
    }

    &__select-wrapper {
        position: relative;
        width: 100%;
    }

    &__select {
        width: 100%;
        height: 36px;
        padding: 0 36px 0 12px;
        border: 1px solid var(--b-color-outline-secondary, #e6e9eb);
        border-radius: 6px;
        font-family: inherit;
        font-size: var(--b-text-body-font-size);
        color: var(--b-color-label-primary, #00112c);
        background: var(--b-color-background-primary, #fff);
        appearance: none;
        cursor: pointer;
        box-sizing: border-box;
        &:focus { outline: none; border-color: var(--b-color-label-primary, #00112c); }
    }

    &__select-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: var(--b-color-label-secondary, #717171);
        display: flex;
        align-items: center;
    }

    &__footer {
        display: flex;
        justify-content: flex-end;
        padding: 12px 24px 24px;
    }
}
</style>
