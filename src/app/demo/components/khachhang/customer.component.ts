import {Component, OnInit} from '@angular/core';
import {CustomerService} from "./customer.service";
import {Customer, CustomerInput} from "../../api/customer";
import {CommonService} from "../../../common/common.service";
import {TableModule} from 'primeng/table';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MenuItem, MessageService} from "primeng/api";
import {CustomValidatorService} from "../../../common/custom-validator.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {map} from "rxjs/operators";
import {Clipboard} from "@angular/cdk/clipboard";
import {el} from "@fullcalendar/core/internal-common";

@Component({
    selector: 'app-khachhang',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})


export class CustomerComponent implements OnInit {

    constructor(private customerService: CustomerService,
                private commonService: CommonService,
                private messageService: MessageService,
                private customValidator: CustomValidatorService,
                private clipboard: Clipboard) {
    }

    public customerList: CustomerInput[];
    public selectedCustomer: CustomerInput = {};
    country: any[];
    page: number = 1;
    size: number = 100;

    loading: boolean = true;
    isUpdate: boolean = false;
    isSucceed: boolean = false;
    isFormValid: boolean = true;
    inputDialog: boolean = false;
    inputDialogHeader: string = null;
    detailDialog: boolean = false;
    taxCodeReGex: RegExp = /^[0-9-]+$/;
    address2: boolean = false;

    customerForm: FormGroup;

    detailButton: MenuItem[] = [
        {
            label: 'Sửa thông tin',
            icon: 'pi pi-cog',
            command: () => {
                this.updateDialog();
            }
        },
        {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => {
            }
        },
    ]

    ngOnInit(): void {
        this.initForm();
        this.loadCustomer(this.page, this.size);
    }

    initForm(): void {
        this.customerForm = new FormGroup({
            taxCode: new FormControl(null,
                [Validators.required, this.customValidator.taxCodeValid(),]),
            fullName: new FormControl(null, [Validators.required]),
            shortName: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
            address: new FormControl(null, [Validators.required]),
            address2: new FormControl(null),
            customerEmails: new FormControl(null),
            managerPhone: new FormControl(null, [Validators.pattern(/^\+?[0-9]{8,12}$/)]),
            accountantPhone: new FormControl(null, [Validators.pattern(/^\+?[0-9]{8,12}$/)]),
            taxAccount: new FormControl(null),
            taxAccountPassword: new FormControl(null),
            tokenPin: new FormControl(null),
            taxInvoiceAccount: new FormControl(null),
            taxInvoiceAccountPassword: new FormControl(null),
            invoiceProvider: new FormControl(null),
            invoiceAccount: new FormControl(null),
            invoiceAccountPassword: new FormControl(null),
            managerName: new FormControl(null, [Validators.required]),
            accountantName: new FormControl(null),
            description: new FormControl(null, [Validators.maxLength(2000)])
        });
    }

    checkDuplicateTaxCode(): void {
        let taxCode = this.customerForm.get('taxCode').value;
        if (this.commonService.validateTaxCode(taxCode))
            this.customerService.checkDuplicate(this.customerForm.get('taxCode').value)
                .subscribe({
                    next: res => {
                        if (res === true && this.isUpdate === false) {
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

    checkEmail() {
        let emails = this.customerForm.get('customerEmails').value;
        let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emails !== null) {
            emails.forEach((email: string) => {
                if (!pattern.test(email)) {
                    this.customerForm.get('customerEmails').setErrors({invalidEmail: "Email không hợp lệ"});
                } else {
                    if (this.customerForm.get('customerEmails').hasError('invalidEmail')) {
                        delete this.customerForm.get('customerEmails').errors['invalidEmail'];
                        this.customerForm.get('customerEmails').updateValueAndValidity();
                    }
                }
            });
        }

    }

    copyText(text: string) {
        if (text !== null && text !== '') {
            this.clipboard.copy(text);
            this.messageService.add({
                key: 'mess',
                severity: 'success',
                summary: 'Copied!',
                detail: text,
                life: 1000
            });
        } else {
            this.messageService.add({
                key: 'mess',
                severity: 'info',
                summary: 'Oops!',
                detail: 'Nothing to copy!',
                life: 1000
            })
        }

    }

    handleSubmit(): void {
        this.customerForm.markAllAsTouched();
        //console.log(this.customerForm.value);
        console.log(this.customerForm.errors);
        if (this.customerForm.invalid) {
            this.messageService.add({
                key: 'mess',
                severity: 'error',
                summary: 'Thông tin chưa hợp lệ',
                detail: 'Vui lòng kiểm tra lại các trường thông tin',
                life: 5000
            });
        } else {
            let inputCustomer: CustomerInput = {...this.customerForm.value}
            if (this.isUpdate === false) {
                this.createCustomer(inputCustomer);
            } else {
                inputCustomer.id = this.selectedCustomer.id;
                this.updateCustomer(inputCustomer);
            }
        }
    }

    addNewDialog(): void {
        this.isUpdate = false;
        this.inputDialogHeader = 'Thêm mới khách hàng';
        this.inputDialog = true;
    }

    updateDialog(): void {
        this.customerForm.patchValue(this.selectedCustomer);
        this.inputDialogHeader = `Cập nhật thông tin khách hàng: ${this.selectedCustomer.taxCode || ''}`;
        this.isUpdate = true;
        this.inputDialog = true;
    }

    closeDialog(): void {
        this.inputDialog = false;
    }

    clearForm(): void {
        this.customerForm.reset();
    }

    changeAddress(): void {
        if (this.customerForm.get('address').value !== null
            && this.customerForm.get('address').value !== ''
            && this.address2 === true) {
            this.customerForm.get('address2').setValue(this.customerForm.get('address').value);
        } else {
            this.customerForm.get('address2').setValue(null);
        }
    }

    checkedAddress() {
        this.address2 = !this.address2;
        if (this.address2 === true) {
            this.customerForm.get('address2').setValue(this.customerForm.get('address').value);
            this.customerForm.get('address2').disable();
        } else {
            this.customerForm.get('address2').setValue(null);
            this.customerForm.get('address2').enable();
        }
    }

    iTaxAccount() {
        let taxCode = this.customerForm.get('taxCode').value
        console.log(taxCode)
        if (taxCode !== null && taxCode !== '')
            this.customerForm.get('taxAccount').setValue(taxCode + '-QL');
    }

    selectCustomer(customer: any): void {
        this.selectedCustomer = {...customer};
    }

    viewCustomer(customer: any): void {
        this.selectCustomer(customer);
        this.detailDialog = true;
        //TODO call dialog to view customer (no change data)
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

    createCustomer(customer: CustomerInput): void {
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
                    this.loadCustomer(this.page, this.size);
                    this.closeDialog();
                }
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Cảnh báo',
                    detail: 'Có lỗi xảy ra, vui lòng kiểm tra lại các trường thông tin.'
                })
            }
        });
    }

    updateCustomer(customer: CustomerInput): void {
        //TODO call update customer API
        console.log({update: customer})
        this.customerService.update(customer).subscribe(
            {
                next: res => {
                    if (res.success) {
                        this.messageService.add({
                            severity: 'info',
                            summary: 'Thông báo',
                            detail: `Cập nhật thành công khách hàng: ${customer.taxCode}`,
                            life: 5000
                        });
                        this.isSucceed = true;
                        this.loadCustomer(this.page, this.size);
                        this.closeDialog();
                    }
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Server error',
                        detail: 'Có lỗi xảy ra.'
                    })
                }
            }
        )
    }

}
