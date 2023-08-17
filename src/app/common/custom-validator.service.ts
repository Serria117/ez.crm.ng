import {Injectable} from '@angular/core';
import {CommonService} from "./common.service";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {an} from "@fullcalendar/core/internal-common";
import {CustomerService} from "../demo/components/khachhang/customer.service";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CustomValidatorService {

    constructor(private commonService: CommonService, private customer: CustomerService) {

    }

    taxCodeValid(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            return this.commonService.validateTaxCode(control.value)
                ? null
                : {invalidTaxCode: 'Mã số thuế không đúng định dạng'};
        }
    }

    apiValidator(apiCall: (value: string) => Observable<boolean>): ValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return apiCall(control.value).pipe(
                map((isValid: boolean) => {
                    return !isValid ? null : { apiError: 'error' };
                })
            );
        };
    }
}
