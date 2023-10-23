export const API = {
    BASE : `http://localhost:44311` || `http://14.225.19.135:44311`,

    AUTH: {
        login: `/api/TokenAuth/Authenticate`
    },

    Customer : {
        getAll: `/api/services/app/Customer/GetAllCustomer`,
        create: `/api/services/app/Customer/CreateCustomer`,
        update: `/api/services/app/Customer/UpdateCustomer`,
        findById: `/api/services/app/Customer/GetCustomerByTaxCode`,
        search: `/api/services/app/Customer/Search`,
        check: `/api/services/app/Customer/CheckTaxCodeDuplication`,
        validate: `customer/validate-taxCode`,
        getInfo: `/api/services/app/Customer/GetInfoByTaxCode`
    },
    TaxAuthority: {
        getAll: `/api/services/app/TaxAuthority/GetAll`,
        getByParent: `/api/services/app/TaxAuthority/GetAllByParent`,
        getById: `/api/services/app/TaxAuthority/GetById`
    },
    BangKe: {
        create: `/api/services/app/Invoice/CreateInvoice`,
        getAllByCustomer: `/api/services/app/Invoice/GetInvoiceList`,
        deleteInvoice: `/api/services/app/Invoice/DeleteInvoice`
    }

}
