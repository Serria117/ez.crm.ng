export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    taxCode?: string,
    fullName?: string,
    shortName?: string,
    address?: string,
    email?: string,
    phone?: string,
    taxAccount?: string,
    taxAccountPassword?: string,
    tokenPin?: string,
    invoiceProvider?: string,
    invoiceAccount?: string,
    invoiceAccountPassword?: string,
    description?: string,
    createdAt?: any
}
