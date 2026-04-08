import type { ColItem } from './report-details.types';

export const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const INPUT_TYPE_ORDER: Record<string, number> = {
    accountCodes: 0,
    date: 1, date_in_companytimezone: 1, date_as_parameter: 1,
    dateRange: 1, datetime_utc: 1,
    month: 1, monthSelection: 1, monthSelectionWithMaxDate: 1, monthSelectionWithMaxDateUsingDateFormat: 1,
    yearquarter: 1,
    timezone: 2,
    boolean: 3,
};

export const SCHEDULE_EXCLUDED = ['date','date_in_companytimezone','date_as_parameter','datetime_utc','dateRange','month','monthSelection','monthSelectionWithMaxDate','monthSelectionWithMaxDateUsingDateFormat','yearquarter'];

export const ALL_COLUMNS: Omit<ColItem, 'enabled'>[] = [
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

export const DEFAULT_ENABLED = new Set(['companyAccount','merchantAccount','subMerchantIdentifier','pspReference','merchantReference','paymentMethod','creationDate','type','modificationReference','grossCurrency','commission','markup','schemeFees','interchange','paymentMethodVariant','modMerchantReference','batchNumber','reserved4','reserved5','reserved6','reserved7','reserved8']);

export const PREVIEW_ROWS: Record<string, string>[] = [
    { companyAccount:'TheHarporium', merchantAccount:'TheHarporiumEU', subMerchantIdentifier:'Store_001', pspReference:'A9S2K3LD0P2M', merchantReference:'2857493285', paymentMethod:'Visa', creationDate:'Dec 28, 2020, 10:20', type:'Settled', modificationReference:'MOD-001', grossCurrency:'EUR 120.00', commission:'1.20', markup:'0.15', schemeFees:'0.08', interchange:'0.45', paymentMethodVariant:'visacredit', modMerchantReference:'MMOD-001', batchNumber:'1001' },
    { companyAccount:'TheHarporium', merchantAccount:'TheHarporiumEU', subMerchantIdentifier:'Store_002', pspReference:'B4H7G1J9K2RT', merchantReference:'9573957395', paymentMethod:'Visa', creationDate:'Dec 28, 2020, 10:20', type:'Settled', modificationReference:'MOD-002', grossCurrency:'EUR 85.50', commission:'0.86', markup:'0.10', schemeFees:'0.06', interchange:'0.32', paymentMethodVariant:'visadebit', modMerchantReference:'MMOD-002', batchNumber:'1001' },
    { companyAccount:'TheHarporium', merchantAccount:'TheHarporiumEU', subMerchantIdentifier:'Store_001', pspReference:'Z7X9C3V1B5NM', merchantReference:'8596846378', paymentMethod:'Mastercard', creationDate:'Dec 28, 2020, 10:21', type:'Refunded', modificationReference:'MOD-003', grossCurrency:'EUR 42.00', commission:'0.42', markup:'0.05', schemeFees:'0.03', interchange:'0.18', paymentMethodVariant:'mc', modMerchantReference:'MMOD-003', batchNumber:'1002' },
];
