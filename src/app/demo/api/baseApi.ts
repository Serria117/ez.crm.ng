export const API = {
    BASE : `https://localhost:44311`,

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
        validate: `customer/validate-taxCode`
    }
}
