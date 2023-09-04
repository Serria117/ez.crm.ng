export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Email {
    id?: number,
    email: string,
    taxCode: string,
}

export interface Customer {
    taxCode?: string,
    fullName?: string,
    shortName?: string,
    address?: string,
    address2?: string,
    email?: string[],
    emails?: Email[],
    representative?: string,
    representativePhone?: string,
    accountant?: string,
    accountantPhone?: string,
    taxAccount?: string,
    taxAccountPassword?: string,
    tokenPin?: string,
    taxInvoiceAccount?: string,
    taxInvoiceAccountPassword?: string,
    invoiceProvider?: string,
    invoiceAccount?: string,
    invoiceAccountPassword?: string,
    description?: string,
    createdAt?: any
}

export interface CustomerInput {
    id?: string;
    fullName?: string;
    shortName?: string;
    taxCode?: string;
    taxAccount?: string;
    taxAccountPassword?: string | null;
    taxInvoicePassword?: string | null;
    invoiceProvider?: string | null;
    invoiceAccount?: string | null;
    invoiceAccountPassword?: string | null;
    tokenPin?: string | null;
    managerName?: string | null;
    managerPhone?: string | null;
    accountantName?: string | null;
    accountantPhone?: string | null;
    address?: string | null;
    address2?: string | null;
    customerEmails?: string[] | null;
    description?: string;
}
