import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../khachhang/customer.service";
import {BangkeService} from "./bangke.service";
import {MessageService} from "primeng/api";
import {InvoiceModel} from "../../api/InvoiceModel";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Customer, CustomerInput} from "../../api/customer";
import {CommonService} from "../../../common/common.service";

@Component({
    selector: 'app-bangke',
    templateUrl: './bangke.component.html',
    styleUrls: ['./bangke.component.scss']
})
export class BangkeComponent implements OnInit {
    ngOnInit(): void {
        this.initForm();
        this.invoiceList = [
            {
                id: 1,
                invoiceNumber: '0998',
                sellerTaxCode: '00997754556'

            },
            {
                id: 2,
                invoiceNumber: '0991',
                sellerTaxCode: '00997754556'

            }
        ]
    }

    constructor(private customerService: CustomerService,
                private common: CommonService,
                private bangkeService: BangkeService,
                private message: MessageService) {
    }

    currentCustomer: CustomerInput = null;
    customerList: CustomerInput[] = null;
    invoiceList: InvoiceModel[];
    currentInvoice: InvoiceModel = null;
    invForm: FormGroup = null;

    initForm() {
        this.invForm = new FormGroup({
            invoiceNumber: new FormControl(null),
            issueDate: new FormControl(null),
            signingDate: new FormControl(null),
            sellerTaxCode: new FormControl(null),
            sellerName: new FormControl(null),
            totalAmount: new FormControl(null, [Validators.required]),
            totalTax: new FormControl(null),
            totalAmountAfterTax: new FormControl(null),
            customerId: new FormControl(null, [Validators.required]),
            isReported: new FormControl(false),
            reportPeriod: new FormControl(null)

        })
    }

    loadCustomer(page: number, size: number): void {
        this.customerService.getAll(page, size).subscribe({
            next: res => {
                if (res.result !== undefined) {
                    this.customerList = res.result.items;
                }
            },
            error: err => {
                console.log(err);
            }
        })
    }

    getCustomerFromService(): void {
        this.currentCustomer = {...this.common.currentCustomer};
    }

    saveCurentCustomerToStorage(customer: CustomerInput): void {
        if (this.currentCustomer !== null)
            this.common.saveToStorage("customer", JSON.stringify(this.currentCustomer));
    }


}
