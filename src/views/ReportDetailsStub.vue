<template>
    <div class="report-details">
        <bento-link :to="{ path: '/reports' }" class="report-details__back-link">
            &larr; Back to Reports
        </bento-link>

        <div v-if="loading" class="report-details__loader">
            <bento-loading-indicator />
        </div>

        <bento-alert v-else-if="error" type="critical">
            <template #default>{{ error }}</template>
        </bento-alert>

        <template v-else-if="report">
            <div class="report-details__header">
                <div class="report-details__header-info">
                    <bento-typography class="report-details__title" :variant="BentoTypographyVariant.TITLE" large>
                        {{ report.title }}
                    </bento-typography>
                    <bento-typography :variant="BentoTypographyVariant.BODY" class="report-details__description">
                        {{ report.description }}
                    </bento-typography>
                </div>
                <div class="report-details__header-actions">
                    <bento-button
                        v-if="reportPeriodicities.length > 0"
                        :variant="BentoButtonVariant.SECONDARY"
                        @click="openGenerateModal('automatic')"
                    >
                        Add schedule
                    </bento-button>
                    <bento-button @click="handleGenerateClick">
                        Generate
                    </bento-button>
                </div>
            </div>

            <bento-tabs :active-tab-index="activeTabIndex" @update:active-tab-index="setActiveTab">
                <bento-tab v-for="tab in tabs" :key="tab.id" :title="tab.title" />
            </bento-tabs>

            <!-- Generated Reports Tab -->
            <div v-if="activeTabId === 'generatedReportsTab'" class="report-details__tab-content">
                <bento-typography :variant="BentoTypographyVariant.TITLE" medium class="report-details__section-title">
                    Generated reports
                </bento-typography>
                <div class="report-details__table-wrapper">
                    <bento-data-grid
                        :columns="generatedReportsColumns"
                        :data="generatedReportRows"
                        fit-content
                    >
                        <template #item-fileName="{ item }">
                            <div v-if="item.pending" class="report-details__pending-cell">
                                <bento-loading-indicator />
                                <bento-typography :variant="BentoTypographyVariant.BODY">{{ item.fileName }}</bento-typography>
                            </div>
                            <bento-link v-else is-not-routing :to="item.download || '#'" class="report-details__file-link">
                                {{ item.fileName }}
                            </bento-link>
                        </template>

                        <template #item-generatedOn="{ item }">
                            <div v-if="item.pending" class="report-details__status-cell">
                                <bento-status variant="blue" />
                                <span class="report-details__status-text">{{ item.statusLabel }}</span>
                            </div>
                            <span v-else>{{ item.generatedOn }}</span>
                        </template>

                        <template #item-download="{ item }">
                            <div v-if="item.pending" class="report-details__status-cell">
                                <bento-loading-indicator />
                            </div>
                            <bento-link
                                v-else
                                is-not-routing
                                :to="item.download || '#'"
                                :title="'Download ' + item.fileName"
                            >
                                Download
                            </bento-link>
                        </template>
                    </bento-data-grid>
                </div>
                <div class="report-details__table-footer">
                    <bento-typography :variant="BentoTypographyVariant.BODY">
                        Showing reports generated in the last {{ reportsDaysCount }} days
                    </bento-typography>
                    <bento-button :variant="BentoButtonVariant.SECONDARY" @click="showMoreReports">
                        Show more
                    </bento-button>
                </div>
            </div>

            <!-- Column Settings Tab -->
            <div v-if="activeTabId === 'reportConfigurationTab'" class="report-details__tab-content">
                <div class="report-details__settings-header">
                    <bento-typography :variant="BentoTypographyVariant.TITLE" medium>Default columns</bento-typography>
                    <bento-button :variant="BentoButtonVariant.SECONDARY" @click="openColumnModal">Configure columns</bento-button>
                </div>
                <bento-typography :variant="BentoTypographyVariant.BODY" class="report-details__settings-count">
                    {{ enabledCount }} of {{ totalCount }} columns selected
                </bento-typography>
                <div class="report-details__settings-columns">
                    <span v-for="col in enabledColumns" :key="col.name" class="report-details__settings-col-name">
                        {{ col.label }}
                    </span>
                </div>
                <bento-typography :variant="BentoTypographyVariant.TITLE" medium class="report-details__preview-title">Preview</bento-typography>
                <div class="report-details__preview-table-wrapper">
                    <bento-data-grid
                        :columns="previewColumns"
                        :data="previewData"
                        fit-content
                    />
                </div>
                <bento-typography :variant="BentoTypographyVariant.BODY" class="report-details__preview-note">
                    The data in this table is only an example.
                </bento-typography>
            </div>
        </template>

        <!-- Configure Columns Modal -->
        <div v-if="isColumnModalOpen" class="report-details__modal-overlay" @click.self="closeColumnModal">
            <div class="report-details__col-modal">
                <div class="report-details__col-modal-header">
                    <bento-typography :variant="BentoTypographyVariant.TITLE" medium>Configure columns</bento-typography>
                    <button class="report-details__modal-close" @click="closeColumnModal">&times;</button>
                </div>
                <div class="report-details__col-modal-body">
                    <bento-typography :variant="BentoTypographyVariant.BODY" class="report-details__config-description">
                        Select the columns you want to include in this report. Drag to reorder.
                    </bento-typography>
                    <div class="report-details__config-apply">
                        <div ref="toggleWrapper" @change="onToggleChange">
                            <bento-toggle :value="applyToOtherAccounts">
                                Do you want to apply this column configuration to other accounts?
                            </bento-toggle>
                        </div>
                    </div>
                    <div v-if="applyToOtherAccounts" class="report-details__config-accounts">
                        <bento-dropdown
                            v-model="selectedAccounts"
                            label="Select accounts"
                            :items="selectAccountsOptions"
                            placeholder="Select..."
                            :multiple="true"
                        />
                    </div>
                    <div class="report-details__col-panels">
                        <div class="report-details__col-panel report-details__col-panel--left">
                            <bento-typography :variant="BentoTypographyVariant.BODY" class="report-details__col-list-heading">
                                Columns ({{ draftAvailableColumns.length }})
                            </bento-typography>
                            <div class="report-details__col-panel-scroll">
                                <div v-for="(col, index) in draftAvailableColumns" :key="col.name">
                                    <div class="report-details__col-row">
                                        <div class="report-details__col-left">
                                            <bento-checkbox
                                                :model-value="isChecked(col)"
                                                @update:model-value="setCheckedAvailable(col, $event)"
                                            />
                                        </div>
                                        <div class="report-details__col-right">
                                            <div class="report-details__col-name-row">
                                                <bento-typography :variant="BentoTypographyVariant.BODY" class="report-details__col-name">{{ col.label }}</bento-typography>
                                                <bento-typography :variant="BentoTypographyVariant.BODY" class="report-details__col-type">{{ col.type }}</bento-typography>
                                            </div>
                                            <bento-typography :variant="BentoTypographyVariant.BODY" class="report-details__col-desc">{{ col.description }}</bento-typography>
                                        </div>
                                    </div>
                                    <div v-if="index < draftAvailableColumns.length - 1" class="report-details__col-divider"></div>
                                </div>
                                <div v-if="draftAvailableColumns.length === 0" class="report-details__col-empty">All columns are included</div>
                            </div>
                        </div>
                        <div class="report-details__col-panels-divider"></div>
                        <div class="report-details__col-panel report-details__col-panel--right">
                            <bento-typography :variant="BentoTypographyVariant.BODY" class="report-details__col-list-heading">
                                Selected columns ({{ draftSelectedColumns.length }})
                            </bento-typography>
                            <div class="report-details__col-panel-scroll">
                                <div v-for="(col, index) in draftSelectedColumns" :key="col.name">
                                    <div
                                        class="report-details__col-row"
                                        :class="{ 'report-details__col-row--dragging': dragIndex === index }"
                                        draggable="true"
                                        @dragstart="onDragStart(index, $event)"
                                        @dragover.prevent="onDragOver(index, $event)"
                                        @drop="onDrop(index)"
                                        @dragend="onDragEnd"
                                    >
                                        <div class="report-details__col-left">
                                            <span class="report-details__col-drag" title="Drag to reorder">&#x2807;</span>
                                        </div>
                                        <div class="report-details__col-right">
                                            <div class="report-details__col-name-row">
                                                <bento-typography :variant="BentoTypographyVariant.BODY" class="report-details__col-name">{{ col.label }}</bento-typography>
                                                <bento-typography :variant="BentoTypographyVariant.BODY" class="report-details__col-type">{{ col.type }}</bento-typography>
                                            </div>
                                            <bento-typography :variant="BentoTypographyVariant.BODY" class="report-details__col-desc">{{ col.description }}</bento-typography>
                                        </div>
                                        <button class="report-details__col-remove" title="Remove column" @click="deselectColumn(col)">&times;</button>
                                    </div>
                                    <div v-if="index < draftSelectedColumns.length - 1" class="report-details__col-divider"></div>
                                </div>
                                <div v-if="draftSelectedColumns.length === 0" class="report-details__col-empty">No columns selected</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="report-details__col-modal-footer">
                    <bento-button :variant="BentoButtonVariant.TERTIARY" @click="removeAllSelectedColumns">Remove all selected columns</bento-button>
                    <div class="report-details__col-modal-footer-actions">
                        <bento-button :variant="BentoButtonVariant.SECONDARY" @click="closeColumnModal">Cancel</bento-button>
                        <bento-button @click="saveColumnConfig">Apply</bento-button>
                    </div>
                </div>
            </div>
        </div>

        <!-- IPAR Modal -->
        <ipar-generate-modal v-if="isIparModalOpen" @close="isIparModalOpen = false" @generate="handleIparGenerate" />

        <!-- Generate / Schedule Modal -->
        <div v-if="isGenerateModalOpen" class="report-details__modal-overlay" @click.self="closeGenerateModal">
            <div class="report-details__modal">
                <div class="report-details__modal-header">
                    <bento-typography :variant="BentoTypographyVariant.TITLE" medium>
                        {{ generationType === 'manual' ? 'Generate report' : 'Schedule report' }} ({{ report && report.title }})
                    </bento-typography>
                    <button class="report-details__modal-close" @click="closeGenerateModal">&times;</button>
                </div>
                <div class="report-details__modal-body">
                    <template v-if="generationType === 'manual'">
                        <div v-if="reportFormats.length" class="report-details__form-group">
                            <bento-dropdown label="File type" :items="fileTypeDropdownItems" :value="generateForm.format" placeholder="Select a file type" @input="generateForm.format = $event" />
                        </div>
                        <template v-for="param in sortedManualParameters">
                            <div v-if="param.inputType === 'accountCodes'" :key="param.name + '-acc'" class="report-details__form-group">
                                <label class="report-details__form-label">Accounts</label>
                                <bento-radio-group label="Accounts" hide-label :items="accountSelectionItems" :value="generateForm.accountSelection" @input="generateForm.accountSelection = $event" />
                                <div v-if="generateForm.accountSelection === 'specific'" class="report-details__form-group-nested">
                                    <bento-dropdown label="Select accounts" hide-label :items="merchantAccountDropdownItems" :value="generateForm.params[param.name]" placeholder="Select accounts" :multiple="true" @input="setParam(param.name, $event)" />
                                </div>
                            </div>
                            <div v-else-if="['date','date_in_companytimezone','date_as_parameter'].includes(param.inputType)" :key="param.name + '-date'" class="report-details__form-group">
                                <bento-date-picker :label="param.label" :value="generateForm.params[param.name]" placeholder="Select a date" @input="setParam(param.name, $event)" />
                            </div>
                            <div v-else-if="param.inputType === 'datetime_utc'" :key="param.name + '-dt'" class="report-details__form-group">
                                <bento-date-picker :label="param.label" :value="generateForm.params[param.name]" placeholder="Select a date and time" @input="setParam(param.name, $event)" />
                            </div>
                            <div v-else-if="param.inputType === 'dateRange'" :key="param.name + '-range'" class="report-details__form-group">
                                <bento-date-range-picker :label="param.label" :value="generateForm.params[param.name]" placeholder="Select a date range" :number-of-months="2" @input="setParam(param.name, $event)" />
                            </div>
                            <div v-else-if="['month','monthSelection','monthSelectionWithMaxDate','monthSelectionWithMaxDateUsingDateFormat'].includes(param.inputType)" :key="param.name + '-month'" class="report-details__form-group">
                                <bento-date-picker :label="param.label" :value="generateForm.params[param.name]" placeholder="Select a month" variant="month" @input="setParam(param.name, $event)" />
                            </div>
                            <div v-else-if="param.inputType === 'yearquarter'" :key="param.name + '-q'" class="report-details__form-group">
                                <label class="report-details__form-label">{{ param.label }}</label>
                                <input type="text" :value="generateForm.params[param.name]" class="report-details__form-input" placeholder="2024-Q1" @input="onNativeInput(param.name, $event)" />
                            </div>
                            <div v-else-if="param.inputType === 'timezone'" :key="param.name + '-tz'" class="report-details__form-group">
                                <label class="report-details__form-label">Time zone</label>
                                <bento-typography :variant="BentoTypographyVariant.BODY">{{ param.options ? param.options[0].label : 'Europe - Amsterdam' }}</bento-typography>
                            </div>
                            <div v-else-if="param.inputType === 'boolean'" :key="param.name + '-bool'" class="report-details__form-group">
                                <bento-radio-group :label="param.label" :items="booleanItems" :value="generateForm.params[param.name]" @input="setParam(param.name, $event)" />
                            </div>
                            <div v-else :key="param.name + '-text'" class="report-details__form-group">
                                <label class="report-details__form-label">{{ param.label }}</label>
                                <input type="text" :value="generateForm.params[param.name]" class="report-details__form-input" @input="onNativeInput(param.name, $event)" />
                            </div>
                        </template>
                    </template>

                    <template v-else>
                        <template v-if="scheduleViewMode === 'list'">
                            <bento-typography :variant="BentoTypographyVariant.BODY" class="report-details__form-description">
                                Set up a schedule to generate this report automatically.
                            </bento-typography>
                            <div v-if="mockSchedules.length" class="report-details__schedule-header">
                                <bento-typography :variant="BentoTypographyVariant.BODY" medium>Current schedules</bento-typography>
                                <bento-button :variant="BentoButtonVariant.SECONDARY" @click="scheduleViewMode = 'form'; editingScheduleIndex = null">Add schedule</bento-button>
                            </div>
                            <div v-for="(sched, idx) in mockSchedules" :key="'sched-' + idx" class="report-details__schedule-card">
                                <div class="report-details__schedule-card-actions">
                                    <button type="button" class="report-details__icon-btn" title="Delete" @click="deleteSchedule(idx)">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5.5 2h5M2 4h12M12.667 4l-.466 6.99c-.07 1.046-.104 1.569-.333 1.966a2 2 0 0 1-.866.81c-.413.234-.937.234-1.986.234H6.984c-1.049 0-1.573 0-1.986-.233a2 2 0 0 1-.866-.811c-.229-.397-.264-.92-.333-1.966L3.333 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    </button>
                                    <button type="button" class="report-details__icon-btn" title="Edit" @click="editSchedule(idx)">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.333 2.333a1.886 1.886 0 0 1 2.667 2.667l-8.167 8.167L2.5 14l.833-3.333 8-8.334Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    </button>
                                </div>
                                <div class="report-details__schedule-card-row"><span class="report-details__schedule-card-label">Frequency</span><span class="report-details__schedule-card-value">{{ formatScheduleFrequency(sched) }}</span></div>
                                <div class="report-details__schedule-card-row"><span class="report-details__schedule-card-label">File type</span><span class="report-details__schedule-card-value">{{ sched.format.toUpperCase() }}</span></div>
                                <div class="report-details__schedule-card-row"><span class="report-details__schedule-card-label">Accounts</span><span class="report-details__schedule-card-value">{{ sched.accounts }}</span></div>
                            </div>
                            <div v-if="!mockSchedules.length" class="report-details__form-group">
                                <bento-button :variant="BentoButtonVariant.SECONDARY" @click="scheduleViewMode = 'form'; editingScheduleIndex = null">Add schedule</bento-button>
                            </div>
                        </template>

                        <template v-if="scheduleViewMode === 'form'">
                            <div class="report-details__form-group">
                                <bento-dropdown label="Frequency" :items="frequencyDropdownItems" :value="scheduleForm.frequency" placeholder="Select a frequency" @input="scheduleForm.frequency = $event" />
                            </div>
                            <div v-if="scheduleForm.frequency === 'WEEKLY'" class="report-details__form-group">
                                <bento-dropdown label="On what day?" :items="weekdayDropdownItems" :value="scheduleForm.dayOfWeek" placeholder="Select a day" @input="scheduleForm.dayOfWeek = $event" />
                            </div>
                            <div v-if="scheduleForm.frequency === 'MONTHLY' || scheduleForm.frequency === 'QUARTERLY'" class="report-details__form-group">
                                <bento-dropdown label="On what day?" :items="dayOfMonthDropdownItems" :value="scheduleForm.dayOfMonth" placeholder="Select a day" @input="scheduleForm.dayOfMonth = $event" />
                            </div>
                            <div v-if="reportFormats.length" class="report-details__form-group">
                                <bento-dropdown label="File type" :items="fileTypeDropdownItems" :value="generateForm.format" placeholder="Select a file type" @input="generateForm.format = $event" />
                            </div>
                            <template v-for="param in scheduleParameters">
                                <div v-if="param.inputType === 'accountCodes'" :key="param.name + '-sf-acc'" class="report-details__form-group">
                                    <bento-radio-group label="Accounts" :items="accountSelectionItems" :value="generateForm.accountSelection" @input="generateForm.accountSelection = $event" />
                                    <div v-if="generateForm.accountSelection === 'specific'" class="report-details__form-group-nested">
                                        <bento-dropdown label="Select accounts" hide-label :items="merchantAccountDropdownItems" :value="generateForm.params[param.name]" placeholder="Select accounts" :multiple="true" @input="setParam(param.name, $event)" />
                                    </div>
                                </div>
                                <div v-if="param.inputType === 'boolean'" :key="param.name + '-sf-bool'" class="report-details__form-group">
                                    <bento-radio-group :label="param.label" :items="booleanItems" :value="generateForm.params[param.name]" @input="setParam(param.name, $event)" />
                                </div>
                            </template>
                        </template>
                    </template>
                </div>
                <div class="report-details__modal-footer">
                    <template v-if="generationType === 'manual'">
                        <bento-button :variant="BentoButtonVariant.SECONDARY" @click="closeGenerateModal">Cancel</bento-button>
                        <bento-button :disabled="generating" @click="handleGenerateReport">{{ generating ? 'Generating...' : 'Generate report' }}</bento-button>
                    </template>
                    <template v-else-if="scheduleViewMode === 'form'">
                        <bento-button :variant="BentoButtonVariant.SECONDARY" @click="mockSchedules.length ? (scheduleViewMode = 'list') : closeGenerateModal()">Cancel</bento-button>
                        <bento-button @click="addSchedule">Save schedule</bento-button>
                    </template>
                    <template v-else>
                        <bento-button :variant="BentoButtonVariant.SECONDARY" @click="closeGenerateModal">Cancel</bento-button>
                        <bento-button @click="closeGenerateModal">Done</bento-button>
                    </template>
                </div>
            </div>
        </div>

        <bento-toast />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
    BentoTypography, BentoTypographyVariant,
    BentoButton, BentoButtonVariant,
    BentoCheckbox,
    BentoLoadingIndicator,
    BentoAlert,
    BentoDataGrid,
    BentoStatus,
    BentoLink,
    BentoDropdown,
    BentoToggle,
    BentoToast,
    BentoRadioGroup,
    BentoDatePicker,
    BentoDateRangePicker,
    BentoTabs,
    BentoTab,
} from '@adyen/bento-vue2';
import { mockReports } from '../data/reports';
import type { MockReport } from '../data/reports';
import { getMockGeneratedReports, getMockReportRequests } from '../data/mockGeneratedReports';
import type { GeneratedReport, ReportRequest } from '../data/mockGeneratedReports';
import IparGenerateModal from '../components/reports/IparGenerateModal.vue';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const INPUT_TYPE_ORDER: Record<string, number> = {
    accountCodes: 0,
    date: 1, date_in_companytimezone: 1, date_as_parameter: 1,
    dateRange: 1, datetime_utc: 1,
    month: 1, monthSelection: 1, monthSelectionWithMaxDate: 1, monthSelectionWithMaxDateUsingDateFormat: 1,
    yearquarter: 1,
    timezone: 2,
    boolean: 3,
};
const SCHEDULE_EXCLUDED = ['date','date_in_companytimezone','date_as_parameter','datetime_utc','dateRange','month','monthSelection','monthSelectionWithMaxDate','monthSelectionWithMaxDateUsingDateFormat','yearquarter'];

const ALL_COLUMNS = [
    { name: 'companyAccount', label: 'Company account', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'merchantAccount', label: 'Merchant account', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'subMerchantIdentifier', label: 'Sub-merchant identifier', description: 'Identifies the sub-merchant level used for reporting breakdowns', type: 'String' },
    { name: 'pspReference', label: 'PSP reference', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'merchantReference', label: 'Merchant reference', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'paymentMethod', label: 'Payment method', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'creationDate', label: 'Creation date, time zone', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'type', label: 'Type', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'modificationReference', label: 'Modification reference', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'grossCurrency', label: 'Gross currency, gross debit, gross credit, exchange rate', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'commission', label: 'Commission', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'markup', label: 'Markup', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'schemeFees', label: 'Scheme fees', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'interchange', label: 'Interchange', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'paymentMethodVariant', label: 'Payment method variant', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'modMerchantReference', label: 'Modification merchant reference', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'batchNumber', label: 'Batch number', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'reserved4', label: 'Reserved4', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'reserved5', label: 'Reserved5', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'reserved6', label: 'Reserved6', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'reserved7', label: 'Reserved7', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'reserved8', label: 'Reserved8', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'reserved9', label: 'Reserved9', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
    { name: 'reserved10', label: 'Reserved10', description: 'Description of the column contents and why it\'s helpful', type: 'String' },
];
const DEFAULT_ENABLED = new Set(['companyAccount','merchantAccount','subMerchantIdentifier','pspReference','merchantReference','paymentMethod','creationDate','type','modificationReference','grossCurrency','commission','markup','schemeFees','interchange','paymentMethodVariant','modMerchantReference','batchNumber','reserved4','reserved5','reserved6','reserved7','reserved8']);

const PREVIEW_ROWS: Record<string, string>[] = [
    { companyAccount:'TheHarporium', merchantAccount:'TheHarporiumEU', subMerchantIdentifier:'Store_001', pspReference:'A9S2K3LD0P2M', merchantReference:'2857493285', paymentMethod:'Visa', creationDate:'Dec 28, 2020, 10:20', type:'Settled', modificationReference:'MOD-001', grossCurrency:'EUR 120.00', commission:'1.20', markup:'0.15', schemeFees:'0.08', interchange:'0.45', paymentMethodVariant:'visacredit', modMerchantReference:'MMOD-001', batchNumber:'1001' },
    { companyAccount:'TheHarporium', merchantAccount:'TheHarporiumEU', subMerchantIdentifier:'Store_002', pspReference:'B4H7G1J9K2RT', merchantReference:'9573957395', paymentMethod:'Visa', creationDate:'Dec 28, 2020, 10:20', type:'Settled', modificationReference:'MOD-002', grossCurrency:'EUR 85.50', commission:'0.86', markup:'0.10', schemeFees:'0.06', interchange:'0.32', paymentMethodVariant:'visadebit', modMerchantReference:'MMOD-002', batchNumber:'1001' },
    { companyAccount:'TheHarporium', merchantAccount:'TheHarporiumEU', subMerchantIdentifier:'Store_001', pspReference:'Z7X9C3V1B5NM', merchantReference:'8596846378', paymentMethod:'Mastercard', creationDate:'Dec 28, 2020, 10:21', type:'Refunded', modificationReference:'MOD-003', grossCurrency:'EUR 42.00', commission:'0.42', markup:'0.05', schemeFees:'0.03', interchange:'0.18', paymentMethodVariant:'mc', modMerchantReference:'MMOD-003', batchNumber:'1002' },
];

interface ColItem { name: string; label: string; description: string; type: string; enabled: boolean }

export default Vue.extend({
    name: 'ReportDetailsPage',
    components: {
        BentoTypography, BentoButton, BentoLoadingIndicator, BentoAlert, BentoDataGrid, BentoStatus, BentoLink,
        BentoDropdown, BentoToggle, BentoToast, BentoRadioGroup, BentoCheckbox,
        BentoDatePicker, BentoDateRangePicker, BentoTabs, BentoTab,
        IparGenerateModal,
    },
    data() {
        return {
            BentoTypographyVariant,
            BentoButtonVariant,
            loading: true,
            error: null as string | null,
            report: null as MockReport | null,
            generatedReports: [] as GeneratedReport[],
            pendingRequests: [] as ReportRequest[],
            reportsDaysCount: 100,
            activeTabIndex: 0,
            tabs: [
                { id: 'generatedReportsTab', title: 'Generated reports' },
                { id: 'reportConfigurationTab', title: 'Column Settings' },
            ],
            isIparModalOpen: false,
            isGenerateModalOpen: false,
            generationType: 'manual' as string,
            generating: false,
            mockMerchantAccounts: ['AdyenTechSupport_NL', 'AdyenTechSupport_EU', 'AdyenTechSupport_US'],
            generateForm: { params: {} as Record<string, any>, format: 'csv', accountSelection: 'current' } as Record<string, any>,
            scheduleForm: { frequency: 'DAILY', dayOfWeek: 1, dayOfMonth: 1 } as Record<string, any>,
            scheduleViewMode: 'list' as string,
            editingScheduleIndex: null as number | null,
            mockSchedules: [] as any[],
            isColumnModalOpen: false,
            applyToOtherAccounts: false,
            selectedAccounts: [] as string[],
            columnConfig: ALL_COLUMNS.map(c => ({ ...c, enabled: DEFAULT_ENABLED.has(c.name) })) as ColItem[],
            draftColumnConfig: [] as ColItem[],
            draftSelectedOrder: [] as string[],
            draftChecked: {} as Record<string, boolean>,
            dragIndex: null as number | null,
            previewRows: PREVIEW_ROWS,
            selectAccountsOptions: [
                { label: 'TheHarporiumEU', value: 'TheHarporiumEU' },
                { label: 'TheHarporiumUS', value: 'TheHarporiumUS' },
                { label: 'TheHarporiumAU', value: 'TheHarporiumAU' },
            ],
        };
    },
    computed: {
        activeTabId(): string { return this.tabs[this.activeTabIndex]?.id || ''; },
        reportParameters(): any[] { return this.report?.parameters || []; },
        reportFormats(): string[] { return this.report?.formats || ['csv']; },
        sortedManualParameters(): any[] {
            return [...this.reportParameters].sort((a, b) => (INPUT_TYPE_ORDER[a.inputType] ?? 99) - (INPUT_TYPE_ORDER[b.inputType] ?? 99));
        },
        reportPeriodicities(): string[] { return this.report?.scheduledPeriodicities || []; },
        scheduleParameters(): any[] { return this.reportParameters.filter((p: any) => !SCHEDULE_EXCLUDED.includes(p.inputType)); },
        fileTypeDropdownItems(): any[] {
            return this.reportFormats.map(f => ({
                value: f,
                label: f.toUpperCase() === 'XLSX' ? '.XLSX (Excel)' : f.toUpperCase() === 'CSV' ? '.CSV (Comma-separated values)' : `.${f.toUpperCase()}`,
            }));
        },
        frequencyDropdownItems(): any[] { return this.reportPeriodicities.map(p => ({ value: p, label: this.periodicityLabel(p) })); },
        weekdayDropdownItems(): any[] { return WEEKDAYS.map((d, i) => ({ value: i + 1, label: d })); },
        dayOfMonthDropdownItems(): any[] {
            return Array.from({ length: 31 }, (_, i) => {
                const d = i + 1;
                const s = [1,21,31].includes(d) ? 'st' : [2,22].includes(d) ? 'nd' : [3,23].includes(d) ? 'rd' : 'th';
                return { value: d, label: `${d}${s}` };
            });
        },
        merchantAccountDropdownItems(): any[] { return this.mockMerchantAccounts.map(a => ({ value: a, label: a })); },
        accountSelectionItems(): any[] { return [{ value: 'current', label: 'Current account' }, { value: 'specific', label: 'Specific accounts' }]; },
        booleanItems(): any[] { return [{ value: true, label: 'Yes' }, { value: false, label: 'No' }]; },
        enabledColumns(): ColItem[] { return this.columnConfig.filter(c => c.enabled); },
        enabledCount(): number { return this.enabledColumns.length; },
        totalCount(): number { return this.columnConfig.length; },
        showAccountsColumn(): boolean {
            return [...this.pendingRequests, ...this.generatedReports].some(r => {
                const codes = (r as any).merchantAccountCodes || (r as any).reportParameters?.merchantAccountCodes;
                return codes && codes.length > 0;
            });
        },
        generatedReportsColumns(): any[] {
            const cols: any[] = [
                { field: 'fileName', label: 'Filename', minWidth: 320 },
            ];
            if (this.showAccountsColumn) cols.push({ field: 'accounts', label: 'Accounts', minWidth: 220 });
            cols.push(
                { field: 'generatedOn', label: 'Generated on', minWidth: 220 },
                { field: 'size', label: 'Size', minWidth: 120 },
                { field: 'download', label: 'Download', minWidth: 140 }
            );
            return cols;
        },
        generatedReportRows(): any[] {
            const pending = this.pendingRequests.map((req, idx) => ({
                id: `pending-${idx}-${req.fileName}`,
                pending: true,
                fileName: req.fileName,
                accounts: this.formatMerchantAccounts(req),
                generatedOn: this.getStatusLabel(req.status),
                statusLabel: this.getStatusLabel(req.status),
                size: '—',
                download: null,
            }));
            const generated = this.generatedReports.map((gen, idx) => ({
                id: `generated-${idx}-${gen.fileName}`,
                pending: false,
                fileName: gen.fileName,
                accounts: this.formatMerchantAccounts(gen),
                generatedOn: this.formatDate(gen.generationDate),
                statusLabel: null,
                size: this.formatSize(gen.size),
                download: gen.links && gen.links.download ? gen.links.download : '#',
            }));
            return [...pending, ...generated];
        },
        previewColumns(): any[] {
            return this.enabledColumns.map(col => ({ field: col.name, label: col.label, minWidth: 170 }));
        },
        previewData(): Record<string, string>[] {
            return this.previewRows.map(row => {
                const out: Record<string, string> = {};
                this.enabledColumns.forEach(col => { out[col.name] = row[col.name] || '—'; });
                return out;
            });
        },
        draftAvailableColumns(): ColItem[] { return this.draftColumnConfig.filter(c => !c.enabled); },
        draftSelectedColumns(): ColItem[] {
            const map = new Map(this.draftColumnConfig.filter(c => c.enabled).map(c => [c.name, c]));
            return this.draftSelectedOrder.filter(n => map.has(n)).map(n => map.get(n) as ColItem);
        },
    },
    created() { this.loadReport(); },
    watch: {
        '$route.params.reportCode'() { this.loadReport(); },
    },
    methods: {
        loadReport() {
            this.loading = true;
            this.error = null;
            this.report = null;
            const code = this.$route.params.reportCode as string;
            setTimeout(() => {
                const found = mockReports.find(r => r.code === code) || null;
                if (found) {
                    this.report = { ...found };
                    this.generatedReports = getMockGeneratedReports(code);
                    this.pendingRequests = getMockReportRequests(code);
                } else {
                    this.error = `Report "${code}" not found.`;
                }
                this.loading = false;
            }, 300);
        },
        setActiveTab(i: number) { this.activeTabIndex = i; },
        handleGenerateClick() {
            if (this.report?.isIPAR) {
                this.isIparModalOpen = true;
            } else {
                this.openGenerateModal('manual');
            }
        },
        openGenerateModal(type: string) {
            this.generationType = type;
            this.initFormDefaults();
            if (type === 'automatic') { this.scheduleViewMode = 'list'; this.editingScheduleIndex = null; }
            this.isGenerateModalOpen = true;
        },
        closeGenerateModal() { this.isGenerateModalOpen = false; this.generating = false; },
        initFormDefaults() {
            const params: Record<string, any> = {};
            const today = new Date().toISOString().split('T')[0];
            const thirtyAgo = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0];
            for (const p of this.reportParameters) {
                if (p.inputType === 'date') params[p.name] = p.name.includes('start') ? thirtyAgo : today;
                else if (p.inputType === 'month') params[p.name] = new Date().toISOString().slice(0, 7);
                else if (p.inputType === 'accountCodes') params[p.name] = [];
                else if (p.inputType === 'boolean') params[p.name] = false;
                else if (p.inputType === 'timezone' && p.options) params[p.name] = p.options[0]?.value ?? false;
                else params[p.name] = null;
            }
            this.generateForm = { params, format: this.reportFormats[0] || 'csv', accountSelection: 'current' };
            this.scheduleForm = { frequency: this.reportPeriodicities[0] || 'DAILY', dayOfWeek: 1, dayOfMonth: 1 };
        },
        setParam(name: string, value: any) { this.$set(this.generateForm.params, name, value); },
        async handleGenerateReport() {
            this.generating = true;
            await new Promise(r => setTimeout(r, 1500));
            const params = this.generateForm.params;
            const datePart = params.reportstartdate?.replace(/-/g, '_') || (params.reportdate ? String(params.reportdate).replace(/-/g, '_') : 'custom');
            const merchantAccounts = params.merchantAccountCodes || [];
            const newReq: ReportRequest = {
                fileName: `${this.report!.code}_${datePart}.${this.generateForm.format}`,
                requestDate: new Date().toISOString(),
                status: 'IN_PROGRESS',
                failed: false,
                reportParameters: merchantAccounts.length ? { merchantAccountCodes: [...merchantAccounts] } : null,
            };
            this.pendingRequests = [newReq, ...this.pendingRequests];
            this.generating = false;
            this.isGenerateModalOpen = false;
            setTimeout(() => {
                this.pendingRequests = this.pendingRequests.filter(r => r.fileName !== newReq.fileName);
                this.generatedReports = [{
                    fileName: newReq.fileName,
                    generationDate: new Date().toISOString(),
                    size: Math.floor(Math.random() * 500000) + 10000,
                    links: { download: '#' },
                    merchantAccountCodes: merchantAccounts.length ? [...merchantAccounts] : null,
                    reportParameters: newReq.reportParameters,
                }, ...this.generatedReports];
            }, 3000);
        },
        handleIparGenerate(payload: any) {
            this.isIparModalOpen = false;
            const ext = payload.fileType || 'csv';
            const datePart = payload.template === 'invoice' ? payload.month?.toLowerCase() : 'custom';
            const fileName = `${this.report!.code}_${datePart}.${ext}`;
            const newReq: ReportRequest = { fileName, requestDate: new Date().toISOString(), status: 'IN_PROGRESS', failed: false, reportParameters: null };
            this.pendingRequests = [newReq, ...this.pendingRequests];
            setTimeout(() => {
                this.pendingRequests = this.pendingRequests.filter(r => r.fileName !== newReq.fileName);
                this.generatedReports = [{ fileName, generationDate: new Date().toISOString(), size: Math.floor(Math.random() * 500000) + 10000, links: { download: '#' }, merchantAccountCodes: null, reportParameters: null }, ...this.generatedReports];
            }, 3000);
        },
        addSchedule() {
            const entry = { frequency: this.scheduleForm.frequency, dayOfWeek: this.scheduleForm.dayOfWeek, dayOfMonth: this.scheduleForm.dayOfMonth, format: this.generateForm.format || 'csv', accounts: this.generateForm.accountSelection === 'specific' ? (this.generateForm.params.merchantAccountCodes || []).join(', ') : 'All accounts' };
            if (this.editingScheduleIndex !== null) { this.mockSchedules.splice(this.editingScheduleIndex, 1, entry); this.editingScheduleIndex = null; }
            else { this.mockSchedules.push(entry); }
            this.scheduleViewMode = 'list';
        },
        editSchedule(idx: number) {
            const s = this.mockSchedules[idx];
            this.scheduleForm.frequency = s.frequency; this.scheduleForm.dayOfWeek = s.dayOfWeek; this.scheduleForm.dayOfMonth = s.dayOfMonth;
            this.generateForm.format = s.format; this.editingScheduleIndex = idx; this.scheduleViewMode = 'form';
        },
        deleteSchedule(idx: number) { this.mockSchedules.splice(idx, 1); },
        formatScheduleFrequency(s: any) {
            const label = this.periodicityLabel(s.frequency);
            if (s.frequency === 'WEEKLY') return `${label} on ${WEEKDAYS[s.dayOfWeek - 1]}`;
            if (s.frequency === 'MONTHLY') return `${label} on day ${s.dayOfMonth}`;
            if (s.frequency === 'QUARTERLY') return `Quarterly on day ${s.dayOfMonth}`;
            return label;
        },
        periodicityLabel(p: string) {
            const m: Record<string, string> = { HOURLY: 'Hourly', DAILY: 'Daily', WEEKLY: 'Weekly', MONTHLY: 'Monthly', QUARTERLY: 'Quarterly', BATCH_CLOSE: 'At batch close' };
            return m[p] || p;
        },
        showMoreReports() { this.reportsDaysCount += 100; },
        formatMerchantAccounts(r: any) {
            const codes = r.merchantAccountCodes || r.reportParameters?.merchantAccountCodes;
            return (!codes || !codes.length) ? '-' : codes.join(', ');
        },
        formatDate(s: string) { return new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); },
        formatSize(b: number) { if (!b) return 'n/a'; if (b < 1024) return `${b} B`; if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`; return `${(b / 1048576).toFixed(1)} MB`; },
        getStatusLabel(s: string) { return ({ QUEUED: 'Queued', IN_PROGRESS: 'In progress' } as Record<string, string>)[s] || 'In progress'; },
        openColumnModal() {
            this.draftColumnConfig = this.columnConfig.map(c => ({ ...c }));
            this.draftSelectedOrder = this.columnConfig.filter(c => c.enabled).map(c => c.name);
            this.draftChecked = {};
            this.isColumnModalOpen = true;
        },
        closeColumnModal() { this.isColumnModalOpen = false; },
        saveColumnConfig() {
            const checked = Object.keys(this.draftChecked).filter(k => this.draftChecked[k]);
            const newConfig = this.draftColumnConfig.map(c => checked.includes(c.name) ? { ...c, enabled: true } : { ...c });
            const newOrder = [...this.draftSelectedOrder];
            checked.forEach(n => { if (!newOrder.includes(n)) newOrder.push(n); });
            this.columnConfig = newConfig;
            this.draftSelectedOrder = newOrder;
            this.isColumnModalOpen = false;
        },
        removeAllSelectedColumns() {
            this.draftColumnConfig = this.draftColumnConfig.map(c => ({ ...c, enabled: false }));
            this.draftSelectedOrder = [];
            this.draftChecked = {};
        },
        setCheckedAvailable(col: ColItem, checked: boolean) { this.$set(this.draftChecked, col.name, checked); },
        toggleCheckAvailable(col: ColItem) { this.$set(this.draftChecked, col.name, !this.draftChecked[col.name]); },
        isChecked(col: ColItem): boolean { return !!this.draftChecked[col.name]; },
        deselectColumn(col: ColItem) {
            const idx = this.draftColumnConfig.findIndex(c => c.name === col.name);
            if (idx >= 0) this.$set(this.draftColumnConfig, idx, { ...this.draftColumnConfig[idx], enabled: false });
            this.draftSelectedOrder = this.draftSelectedOrder.filter(n => n !== col.name);
        },
        onToggleChange(e: Event) {
            const t = e.target as HTMLInputElement;
            if (t && t.type === 'checkbox') this.applyToOtherAccounts = t.checked;
        },
        onDragStart(index: number, e: DragEvent) { this.dragIndex = index; e.dataTransfer!.effectAllowed = 'move'; },
        onDragOver(_index: number, e: DragEvent) { e.dataTransfer!.dropEffect = 'move'; },
        onDrop(targetIndex: number) {
            if (this.dragIndex === null || this.dragIndex === targetIndex) return;
            const order = [...this.draftSelectedOrder];
            const [moved] = order.splice(this.dragIndex, 1);
            order.splice(targetIndex, 0, moved);
            this.draftSelectedOrder = order;
            this.dragIndex = null;
        },
        onDragEnd() { this.dragIndex = null; },
        onNativeInput(name: string, e: Event) { this.setParam(name, (e.target as HTMLInputElement).value); },
    },
});
</script>

<style lang="scss" scoped>
.report-details {
    padding: 12px 24px;
    max-width: 1200px;

    &__back-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--b-color-label-secondary, #717171);
        text-decoration: none;
        font-size: var(--b-text-body-font-size);
        margin-bottom: 16px;
        &:hover { color: var(--b-color-label-primary, #00112c); }
    }

    &__loader {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 50vh;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 24px;
        margin-bottom: 16px;
    }

    &__header-info { flex: 1; }
    &__title { margin-bottom: 8px; }
    &__description { color: var(--b-color-label-secondary, #717171); }

    &__header-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
    }

    &__tab-content { padding: 24px 0; }
    &__section-title { margin-bottom: 16px; }

    &__table-wrapper { overflow-x: auto; }

    &__table {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--b-text-body-font-size);
        th { text-align: left; padding: 10px 12px; font-weight: 600; color: var(--b-color-label-secondary, #717171); border-bottom: 1px solid var(--b-color-outline-secondary, #e6e9eb); white-space: nowrap; }
        td { padding: 10px 12px; border-bottom: 1px solid var(--b-color-outline-tertiary, #f3f6f9); vertical-align: middle; }
    }

    &__table-row:hover { background-color: var(--b-color-background-secondary, #f3f6f9); }
    &__table-cell--right { text-align: right; }
    &__table-cell--muted { color: var(--b-color-label-secondary, #717171); white-space: nowrap; }

    &__file-link { color: var(--b-color-link-primary, #0066ff); text-decoration: none; &:hover { text-decoration: underline; } }

    &__accounts-cell { display: block; max-width: 160px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    &__spinner-inline {
        display: inline-block; width: 14px; height: 14px;
        border: 2px solid var(--b-color-outline-secondary, #e6e9eb);
        border-top-color: var(--b-color-label-primary, #00112c);
        border-radius: 50%; animation: spin 0.8s linear infinite;
        vertical-align: middle; margin-right: 8px;
    }

    &__status-tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: var(--b-text-caption-font-size); font-weight: 600; background-color: var(--b-color-background-secondary, #f3f6f9); color: var(--b-color-label-secondary, #717171); }
    &__content-placeholder { display: inline-block; width: 60px; height: 14px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 4px; }
    &__download-btn { padding: 6px 12px; border: 1px solid var(--b-color-outline-secondary, #e6e9eb); border-radius: 6px; background: none; cursor: not-allowed; opacity: 0.4; }
    &__download-link { display: inline-flex; align-items: center; justify-content: center; padding: 6px 12px; color: var(--b-color-label-primary, #00112c); text-decoration: none; &:hover { background-color: var(--b-color-background-secondary, #f3f6f9); border-radius: 6px; } }
    &__download-icon { font-size: var(--b-text-title-font-size); }

    &__table-footer { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 24px 0; text-align: center; }
    &__pending-cell { display: inline-flex; align-items: center; gap: 8px; }
    &__status-cell { display: inline-flex; flex-direction: column; align-items: flex-start; gap: 4px; }
    &__status-text { font-size: var(--b-text-caption-font-size); color: var(--b-color-label-secondary, #717171); }

    &__settings-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    &__settings-count { font-weight: 600 !important; color: var(--b-color-label-primary, #00112c); margin-bottom: 12px; }
    &__settings-columns { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px 24px; margin-bottom: 32px; }
    &__settings-col-name { font-size: var(--b-text-body-font-size); color: var(--b-color-label-primary, #00112c); }
    &__preview-title { margin-bottom: 16px; }
    &__preview-table-wrapper { overflow-x: auto; border: 1px solid var(--b-color-outline-secondary, #e6e9eb); border-radius: 8px; margin-bottom: 8px; }
    &__preview-table {
        width: 100%; border-collapse: collapse; font-size: var(--b-text-body-font-size);
        th { text-align: left; padding: 10px 16px; font-weight: 600; color: var(--b-color-label-secondary, #5c687c); background: var(--b-color-background-secondary, #f3f6f9); white-space: nowrap; }
        td { padding: 10px 16px; border-top: 1px solid var(--b-color-outline-tertiary, #f3f6f9); white-space: nowrap; }
    }
    &__preview-note { color: var(--b-color-label-secondary, #5c687c); font-size: var(--b-text-caption-font-size) !important; font-style: italic; }

    &__modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 100; }
    &__modal { background: var(--b-color-background-primary, #fff); border-radius: 12px; width: 560px; max-height: 85vh; overflow-y: auto; box-shadow: 0 0 0 1px rgba(0,17,44,0.08), 0 6px 12px rgba(0,17,44,0.08); display: flex; flex-direction: column; }
    &__modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px 16px; border-bottom: 1px solid var(--b-color-outline-secondary, #e6e9eb); }
    &__modal-close { border: none; background: none; cursor: pointer; font-size: 20px; line-height: 1; color: var(--b-color-label-secondary, #717171); width: 32px; height: 32px; border-radius: 6px; &:hover { background: var(--b-color-background-secondary, #f3f6f9); } }
    &__modal-body { padding: 20px 24px; overflow-y: auto; flex: 1; }
    &__modal-footer { display: flex; justify-content: flex-end; gap: 8px; padding: 16px 24px; border-top: 1px solid var(--b-color-outline-secondary, #e6e9eb); }

    &__form-group { margin-bottom: 16px; }
    &__form-group-nested { padding-left: 16px; margin-top: 8px; }
    &__form-label { display: block; font-size: var(--b-text-body-font-size); font-weight: 600; margin-bottom: 6px; color: var(--b-color-label-primary, #00112c); }
    &__form-input { width: 100%; height: 36px; padding: 0 12px; border: 1px solid var(--b-color-outline-secondary, #e6e9eb); border-radius: 6px; font-family: inherit; font-size: var(--b-text-body-font-size); box-sizing: border-box; &:focus { outline: none; border-color: var(--b-color-label-primary, #00112c); } }
    &__form-description { margin-bottom: 12px; }
    &__form-supporting-text { font-size: var(--b-text-caption-font-size) !important; color: var(--b-color-label-secondary, #717171); margin-top: 4px; }

    &__schedule-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    &__schedule-card { border: 1px solid var(--b-color-outline-secondary, #e6e9eb); border-radius: 8px; padding: 12px 16px; margin-bottom: 12px; position: relative; }
    &__schedule-card-actions { position: absolute; top: 8px; right: 12px; display: flex; gap: 4px; }
    &__schedule-card-row { display: flex; gap: 12px; margin-bottom: 6px; font-size: var(--b-text-body-font-size); }
    &__schedule-card-label { color: var(--b-color-label-secondary, #717171); min-width: 80px; }
    &__schedule-card-value { color: var(--b-color-label-primary, #00112c); }
    &__icon-btn { border: none; background: none; cursor: pointer; padding: 4px; color: var(--b-color-label-secondary, #717171); border-radius: 4px; &:hover { background: var(--b-color-background-secondary, #f3f6f9); color: var(--b-color-label-primary, #00112c); } }

    &__col-modal { background: var(--b-color-background-primary, #fff); border-radius: 12px; width: 860px; max-height: 88vh; overflow: hidden; box-shadow: 0 0 0 1px rgba(0,17,44,0.08), 0 6px 24px rgba(0,17,44,0.12); display: flex; flex-direction: column; }
    &__col-modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px 16px; border-bottom: 1px solid var(--b-color-outline-secondary, #e6e9eb); }
    &__col-modal-body { padding: 20px 24px; overflow-y: auto; flex: 1; }
    &__col-modal-footer { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-top: 1px solid var(--b-color-outline-secondary, #e6e9eb); }
    &__col-modal-footer-actions { display: flex; gap: 8px; }

    &__config-description { margin-bottom: 16px; }
    &__config-apply { margin-bottom: 16px; }
    &__config-accounts { margin-bottom: 16px; }

    &__col-panels { display: flex; gap: 0; border: 1px solid var(--b-color-outline-secondary, #e6e9eb); border-radius: 8px; overflow: hidden; max-height: 420px; }
    &__col-panels-divider { width: 1px; background: var(--b-color-outline-secondary, #e6e9eb); flex-shrink: 0; }
    &__col-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; &--left { background: var(--b-color-background-secondary, #f9fafb); } }
    &__col-list-heading { padding: 12px 16px 8px; font-weight: 600 !important; border-bottom: 1px solid var(--b-color-outline-secondary, #e6e9eb); }
    &__col-panel-scroll { overflow-y: auto; flex: 1; }

    &__col-row { display: flex; align-items: flex-start; gap: 12px; padding: 10px 16px; cursor: pointer; &:hover { background: var(--b-color-background-always-light-hover, #f0f4f7); } }
    &__col-row--dragging { opacity: 0.4; }
    &__col-left { flex-shrink: 0; padding-top: 2px; }
    &__col-right { flex: 1; min-width: 0; }
    &__col-name-row { display: flex; align-items: center; gap: 8px; margin-bottom: 2px; }
    &__col-name { font-weight: 500 !important; font-size: var(--b-text-body-font-size) !important; }
    &__col-type { font-size: var(--b-text-caption-font-size) !important; color: var(--b-color-label-secondary, #717171) !important; }
    &__col-desc { font-size: var(--b-text-caption-font-size) !important; color: var(--b-color-label-secondary, #717171) !important; }
    &__col-divider { height: 1px; background: var(--b-color-outline-tertiary, #f3f6f9); margin: 0 16px; }
    &__col-drag { cursor: grab; font-size: 18px; color: var(--b-color-label-secondary, #c4c9d0); &:active { cursor: grabbing; } }
    &__col-remove { border: none; background: none; cursor: pointer; font-size: 18px; line-height: 1; color: var(--b-color-label-secondary, #717171); padding: 2px 4px; margin-left: auto; border-radius: 4px; &:hover { color: var(--b-color-label-critical, #c82333); background: rgba(200,35,51,0.06); } }
    &__col-empty { padding: 24px 16px; color: var(--b-color-label-secondary, #717171); font-size: var(--b-text-body-font-size); text-align: center; }
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
</style>
