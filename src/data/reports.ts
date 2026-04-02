export interface ReportParameter {
    name: string;
    label: string;
    inputType: string;
    options?: { value: any; label: string }[];
}

export interface MockReport {
    code: string;
    reportCode: string;
    title: string;
    description: string;
    category: string;
    subCategory: string;
    favorite: boolean;
    suggested: boolean;
    isMerchantOnly: boolean;
    isIPAR: boolean;
    displayAction: null;
    userAllowedToManageReport: boolean;
    subscription: { active: boolean };
    links: { generateReport: string | null; subscription: string | null };
    formats: string[];
    scheduledPeriodicities: string[];
    parameters: ReportParameter[];
}

const DEFAULT_PARAMETERS: ReportParameter[] = [
    { name: 'merchantAccountCodes', label: 'Accounts', inputType: 'accountCodes' },
    { name: 'reportstartdate', label: 'Start date', inputType: 'date' },
    { name: 'reportenddate', label: 'End date', inputType: 'date' },
];

const DEFAULT_PERIODICITIES = ['DAILY', 'WEEKLY', 'MONTHLY'];

function r(
    code: string,
    title: string,
    description: string,
    category: string,
    subCategory: string,
    opts: {
        favorite?: boolean;
        suggested?: boolean;
        isMerchantOnly?: boolean;
        automated?: boolean;
        isIPAR?: boolean;
        noSubscription?: boolean;
        formats?: string[];
        scheduledPeriodicities?: string[];
        parameters?: ReportParameter[];
    } = {}
): MockReport {
    return {
        code,
        reportCode: code,
        title,
        description,
        category,
        subCategory,
        favorite: opts.favorite || false,
        suggested: opts.suggested || false,
        isMerchantOnly: opts.isMerchantOnly || false,
        isIPAR: opts.isIPAR || false,
        displayAction: null,
        userAllowedToManageReport: true,
        subscription: { active: opts.automated || false },
        links: {
            generateReport: '/generate',
            subscription: opts.noSubscription || opts.isIPAR ? null : '/subscribe',
        },
        formats: opts.formats || ['csv', 'xlsx'],
        scheduledPeriodicities: opts.scheduledPeriodicities || (opts.isIPAR ? [] : DEFAULT_PERIODICITIES),
        parameters: opts.parameters || (opts.isIPAR ? [] : DEFAULT_PARAMETERS),
    };
}

export const mockReports: MockReport[] = [
    // === FINANCE (17) ===
    r('monthly_finance', 'Monthly finance', 'Monthly data on payments by status, open balances, and payouts.', 'finance', 'SETTLEMENTS', { favorite: true, automated: true }),
    r('settlement_details', 'Settlement details', 'Data on all transactions in a certain batch or time period.', 'finance', 'SETTLEMENTS', { favorite: true }),
    r('payout_report', 'Payout details report', 'Detailed payout data including amounts, dates, and bank account information.', 'finance', 'SETTLEMENTS', { automated: true }),
    r('balance_report', 'Balance report', 'Current and historical balance data across accounts.', 'finance', 'SETTLEMENTS'),
    r('settlement_summary', 'Settlement summary', 'Summary of settlement batches with totals per currency.', 'finance', 'SETTLEMENTS'),
    r('received_payment_details', 'Received payment details', 'Data on all authorized or refused payments.', 'finance', 'PAYMENTS', { favorite: true }),
    r('payment_accounting_report', 'Payment accounting report', 'Detailed payment accounting data including fees, markups, and interchange.', 'finance', 'PAYMENTS', { suggested: true, automated: true }),
    r('interactive_payment_accounting_report', 'Interactive Payment accounting report', 'Generate custom or invoice reconciliation reports with detailed payment accounting data.', 'finance', 'PAYMENTS', { isIPAR: true }),
    r('payment_method_report', 'Payment method report', 'Breakdown of transactions by payment method and currency.', 'finance', 'PAYMENTS'),
    r('capture_report', 'Capture report', 'Data on captured payments and their settlement status.', 'finance', 'PAYMENTS', { automated: true }),
    r('fee_report', 'Fee breakdown report', 'Detailed breakdown of processing fees, interchange, and scheme fees.', 'finance', 'FEES_AND_COSTS'),
    r('interchange_report', 'Interchange report', 'Interchange fee data by card type, region, and transaction type.', 'finance', 'FEES_AND_COSTS', { automated: true }),
    r('scheme_fee_report', 'Scheme fee report', 'Scheme fee data broken down by card network and fee type.', 'finance', 'FEES_AND_COSTS'),
    r('invoice_report', 'Invoice report', 'Monthly invoice data with line-item details.', 'finance', 'FEES_AND_COSTS', { noSubscription: true }),
    r('surcharge_report', 'Surcharge report', 'Data on surcharges applied to transactions by payment method.', 'finance', 'FEES_AND_COSTS'),
    r('cost_estimate_report', 'Cost estimate report', 'Estimated processing costs per transaction.', 'finance', 'FEES_AND_COSTS'),
    r('tax_report', 'Tax report', 'Tax-related data for financial reporting and compliance.', 'finance', 'FEES_AND_COSTS'),
    // === RISK (8) ===
    r('dispute_report', 'Dispute report', 'Overview of all chargebacks, refunds, and second chargebacks.', 'risk', 'OTHERS'),
    r('fraud_report', 'Fraud notification report', 'Data on fraud notifications received from schemes.', 'risk', 'OTHERS', { automated: true }),
    r('risk_report', 'Risk management report', 'Overview of risk rules triggered and their impact on transactions.', 'risk', 'OTHERS'),
    r('chargeback_report', 'Chargeback report', 'Detailed chargeback data including reason codes and deadlines.', 'risk', 'OTHERS'),
    r('risk_scoring_report', 'Risk scoring report', 'Transaction risk scores and the rules that contributed to them.', 'risk', 'OTHERS'),
    r('velocity_check_report', 'Velocity check report', 'Data on velocity checks triggered during payment processing.', 'risk', 'OTHERS'),
    r('blocklist_report', 'Blocklist report', 'Overview of blocked shoppers, cards, and IP addresses.', 'risk', 'OTHERS'),
    r('referral_report', 'Referral report', 'Transactions flagged for manual review and their outcomes.', 'risk', 'OTHERS'),
    // === PERFORMANCE (6) ===
    r('conversion_report', 'Conversion report', 'Data on payment conversion rates across different payment methods.', 'performance', 'OTHERS', { suggested: true }),
    r('authorization_report', 'Authorization report', 'Detailed data on authorization rates and decline reasons.', 'performance', 'OTHERS', { automated: true }),
    r('retry_report', 'Retry report', 'Overview of retry attempts and their success rates.', 'performance', 'OTHERS'),
    r('shopper_report', 'Shopper report', 'Data on shopper behavior and payment preferences.', 'performance', 'OTHERS'),
    r('benchmarking_report', 'Benchmarking report', 'Compare your performance against industry benchmarks.', 'performance', 'OTHERS'),
    r('decline_analysis_report', 'Decline analysis report', 'Analysis of declined transactions by reason code and issuer.', 'performance', 'OTHERS'),
    // === ACCOUNT (1) ===
    r('account_report', 'Account report', 'Overview of account configuration and settings.', 'accounts', 'OTHERS', { isMerchantOnly: true }),
    // === POINT OF SALE (5) ===
    r('pos_terminal_report', 'Terminal fleet report', 'Data on terminal status, firmware versions, and connectivity.', 'pointofsale', 'OTHERS'),
    r('pos_payment_report', 'In-person payment report', 'Payment data for in-person transactions at point of sale.', 'pointofsale', 'PAYMENTS', { automated: true }),
    r('pos_inventory_report', 'Terminal inventory report', 'Inventory data for all terminals across stores.', 'pointofsale', 'OTHERS'),
    r('pos_diagnostics_report', 'Terminal diagnostics report', 'Diagnostics and health data for point of sale terminals.', 'pointofsale', 'OTHERS'),
    r('pos_store_report', 'Store overview report', 'Overview of store configurations and associated terminals.', 'pointofsale', 'OTHERS'),
    // === BALANCE PLATFORM (5) ===
    r('balance_platform_payments', 'Balance platform payment report', 'Data on payments processed through the balance platform including transfers and payouts.', 'balanceplatform', 'PAYMENTS'),
    r('balance_platform_account', 'Balance account report', 'Overview of balance accounts, their configurations, and current balances.', 'balanceplatform', 'OTHERS'),
    r('balance_platform_transfers', 'Transfer report', 'Detailed data on internal and external fund transfers across balance accounts.', 'balanceplatform', 'OTHERS', { automated: true }),
    r('balance_platform_fees', 'Platform fee report', 'Breakdown of platform fees charged per balance account and transaction type.', 'balanceplatform', 'FEES_AND_COSTS'),
    r('unified_fee_report', 'Fee report', 'Consolidated view of all fees across payment methods and regions.', 'balanceplatform', 'FEES_AND_COSTS'),
    // === TRANSACTIONS (5) ===
    r('transaction_report', 'Transaction details report', 'Detailed data on individual transactions including payment method and status.', 'transactions', 'PAYMENTS', { automated: true }),
    r('batch_transaction_report', 'Batch transaction report', 'Aggregated transaction data grouped by batch.', 'transactions', 'PAYMENTS'),
    r('recurring_report', 'Recurring transactions report', 'Data on recurring and subscription-based transactions.', 'transactions', 'PAYMENTS'),
    r('transactions_3ds_report', '3D Secure report', 'Data on 3D Secure authentication attempts and results.', 'transactions', 'PAYMENTS'),
    r('refund_report', 'Refund report', 'Data on all refund transactions and their statuses.', 'transactions', 'PAYMENTS'),
];
