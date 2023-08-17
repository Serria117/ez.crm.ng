import {Component, OnInit} from '@angular/core';
import {CustomerService} from "./customer.service";
import {Customer} from "../../api/customer";
import {CommonService} from "../../../common/common.service";
import {TableModule} from 'primeng/table';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MessageService} from "primeng/api";
import {b} from "@fullcalendar/core/internal-common";
import {EditorModule} from 'primeng/editor';
import {CustomValidatorService} from "../../../common/custom-validator.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-khachhang',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})


export class CustomerComponent implements OnInit {

    constructor(private customerService: CustomerService,
                private commonService: CommonService,
                private messageService: MessageService,
                private customValidator: CustomValidatorService) {
    }

    customerList: Customer[];
    country: any[];
    page: number = 1;
    size: number = 10;

    loading: boolean = true;
    isUpdate: boolean = false;
    isSucceed: boolean = false;
    isFormValid: boolean = true;
    inputDialog: boolean = false;
    inputDialogHeader: string = null;
    taxCodeReGex: RegExp = /^[0-9-]+$/;

    customerForm: FormGroup;

    ngOnInit(): void {
        this.initForm();
        this.loadCustomer(this.page, this.size);
    }

    initForm(): void {
        this.customerForm = new FormGroup({
            taxCode: new FormControl(null,
                [Validators.required,
                    this.customValidator.taxCodeValid(),
                ]),
            fullName: new FormControl(null, [Validators.required]),
            shortName: new FormControl(null,
                [Validators.required,
                    Validators.maxLength(20)]),
            address: new FormControl(null),
            email: new FormControl(null, [Validators.email]),
            phone: new FormControl(null, [Validators.pattern(/^[0-9]{8-12}$/)]),
            taxAccount: new FormControl(null),
            taxAccountPassword: new FormControl(null),
            invoiceProvider: new FormControl(null),
            invoiceAccount: new FormControl(null),
            invoiceAccountPassword: new FormControl(null)
        });
    }

    checkDuplicateTaxCode(): void {
        let taxCode = this.customerForm.get('taxCode').value;
        if (this.commonService.validateTaxCode(taxCode))
            this.customerService.checkDuplicate(this.customerForm.get('taxCode').value)
                .subscribe({
                    next: res => {
                        if (res === true) {
                            this.customerForm.get('taxCode').setErrors({dupTaxCode: "Mã số thuế đã tồn tại"})
                        } else {
                            if (this.customerForm.get('taxCode').hasError('dupTaxCode')) {
                                delete this.customerForm.get('taxCode').errors['dupTaxCode'];
                                this.customerForm.get('taxCode').updateValueAndValidity();
                            }
                        }

                    }
                });
    }

    handleSubmit(): void {
        this.customerForm.markAllAsTouched();
        if (this.customerForm.invalid) {
            this.messageService.add({
                key: 'mess',
                severity: 'error',
                summary: 'Thông tin chưa hợp lệ',
                detail: 'Vui lòng kiểm tra lại các trường thông tin',
                life: 5000
            });
        } else {
            let inputCustomer: Customer = {...this.customerForm.value}
            if (this.isUpdate === false) {
                this.createCustomer(inputCustomer);
            } else {

            }
        }
        if (this.isSucceed) {
            this.closeDialog();
        }
    }

    addNewDialog(): void {
        this.isUpdate = false;
        this.inputDialogHeader = 'Thêm mới khách hàng';
        this.inputDialog = true;
    }

    updateDialog(): void {
        this.inputDialogHeader = 'Cập nhật thông tin khách hàng';
        this.isUpdate = true;
        this.inputDialog = true;
    }

    closeDialog(): void {
        this.inputDialog = false;
    }

    clearForm(): void {
        this.customerForm.reset();
    }

    loadCustomer(page: number, size: number): void {
        this.customerService.getAll(page, size).subscribe({
            next: res => {
                if (res.items !== undefined) {
                    this.customerList = res.items;
                }
            },
            error: err => {
                console.log(err);
            }
        })
    }

    createCustomer(customer: Customer): void {
        this.customerService.create(customer).subscribe({
            next: res => {
                if (res) {
                    console.log(res)
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Thông báo',
                        detail: `Tạo mới thành công khách hàng: ${customer.fullName} - ${customer.taxCode}`,
                        life: 5000
                    });
                    this.isSucceed = true;
                }
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Cảnh báo',
                    detail: 'Có lỗi xảy ra, vui lòng kiểm tra lại cái trường thông tin.'
                })
            }
        });
    }

}
