export interface InvoiceModel {
    id?: number;
    symbol?: string | null;
    invoiceNumber?: string | null;
    issueDate?: string;
    signingDate?: string | null;
    invoiceData?: string | null;
    xmlFilePath?: string | null;
    sellerTaxCode?: string | null;
    sellerName?: string | null;
    totalAmount?: number;
    totalTax?: number | null;
    totalAmountAfterTax?: number;
    customerId?: string;
    invoiceDetails?: InvoiceDetailCreateModel[] | null;
    isReported?: boolean;
    reportPeriod?: string | null;
}

export interface InvoiceDetailCreateModel {
    description?: string | null;
    price?: number;
    taxRate?: number;
    taxAmount?: number;
    total?: number;
    invoiceId?: string | null;
}
