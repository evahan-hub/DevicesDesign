export interface GeneratedReport {
    fileName: string;
    generationDate: string;
    size: number;
    links: { download: string };
    merchantAccountCodes: string[] | null;
    reportParameters: { merchantAccountCodes?: string[] } | null;
}

export interface ReportRequest {
    fileName: string;
    requestDate: string;
    status: string;
    failed: boolean;
    reportParameters: { merchantAccountCodes?: string[] } | null;
}

function daysAgo(n: number): Date {
    const d = new Date();
    d.setDate(d.getDate() - n);
    d.setHours(Math.floor(Math.random() * 12) + 6, Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
    return d;
}

function formatFileName(reportCode: string, date: Date, ext = 'csv'): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${reportCode}_${y}_${m}_${d}.${ext}`;
}

function makeReport(
    reportCode: string,
    daysOffset: number,
    opts: { format?: string; size?: number; merchantAccountCodes?: string[] } = {}
): GeneratedReport {
    const date = daysAgo(daysOffset);
    const ext = opts.format || 'csv';
    return {
        fileName: formatFileName(reportCode, date, ext),
        generationDate: date.toISOString(),
        size: opts.size || Math.floor(Math.random() * 500000) + 10000,
        links: { download: '#' },
        merchantAccountCodes: opts.merchantAccountCodes || null,
        reportParameters: opts.merchantAccountCodes
            ? { merchantAccountCodes: opts.merchantAccountCodes }
            : null,
    };
}

export function getMockGeneratedReports(reportCode: string): GeneratedReport[] {
    const ma = ['AdyenTechSupport_NL', 'AdyenTechSupport_EU', 'AdyenTechSupport_US'];
    return [
        makeReport(reportCode, 0, { merchantAccountCodes: [ma[0]], size: 245760 }),
        makeReport(reportCode, 1, { merchantAccountCodes: [ma[0], ma[1]], size: 189440 }),
        makeReport(reportCode, 2, { merchantAccountCodes: [ma[2]], size: 312000 }),
        makeReport(reportCode, 3, { size: 156000 }),
        makeReport(reportCode, 5, { merchantAccountCodes: ma, size: 478200 }),
        makeReport(reportCode, 7, { size: 98304 }),
        makeReport(reportCode, 10, { merchantAccountCodes: [ma[1]], size: 204800 }),
        makeReport(reportCode, 14, { size: 167936 }),
        makeReport(reportCode, 21, { merchantAccountCodes: [ma[0]], size: 389120 }),
        makeReport(reportCode, 30, { size: 51200 }),
    ];
}

export function getMockReportRequests(reportCode: string): ReportRequest[] {
    return [
        {
            fileName: formatFileName(reportCode, new Date(), 'csv'),
            requestDate: new Date().toISOString(),
            status: 'IN_PROGRESS',
            failed: false,
            reportParameters: { merchantAccountCodes: ['AdyenTechSupport_NL'] },
        },
    ];
}
