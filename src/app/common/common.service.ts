import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {an} from "@fullcalendar/core/internal-common";

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private http: HttpClient) {
    }

    validateTaxCode(taxCode?: string): boolean {
        if (taxCode === null || typeof taxCode !== 'string')
            return false;
        let taxId: string = taxCode.indexOf('-') == -1 ? taxCode : taxCode.split('-')[0];
        if (!taxId.match(/^[0-9]{10}$/))
            return false;
        let arrayCheck: number[] = [31, 29, 23, 19, 17, 13, 7, 5, 3];
        let checkNumber: number = 0;
        for (let i: number = 0; i < 9; i++) {
            checkNumber += Number(taxId[i]) * arrayCheck[i];
        }
        let lastNumber: number = 10 - (checkNumber % 11);
        return Number(taxId[9]) == lastNumber;
    }

    trimInput(input: string): string {
        return input.trim().replace(/\s+/, " ");
    }

    trimObjectFields(obj: object): void {
        Object.keys(obj).forEach(key => {
            if (typeof obj[key] === 'string') {
                obj[key] = this.trimInput(obj[key]);
            }
        })
    }

    removeVietnameseAccents(str: string): string {
        const accentsMap: { [key: string]: string } = {
            'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
            'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
            'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
            'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
            'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
            'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
            'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
            'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
            'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
            'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
            'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
            'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
            'đ': 'd',
            'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
            'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
            'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
            'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
            'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
            'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
            'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
            'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
            'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
            'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
            'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
            'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y',
            'Đ': 'D'
        };

        return str.replace(/[\u0300-\u036f]/g, function (char) {
            return accentsMap[char] || char;
        });
    }

    getFormValidationErrors(form: FormGroup) {

        const result = [];
        Object.keys(form.controls).forEach(key => {

            const controlErrors: ValidationErrors = form.get(key).errors;
            if (controlErrors) {
                Object.keys(controlErrors).forEach(keyError => {
                    result.push({
                        'control': key,
                        'error': keyError,
                        'value': controlErrors[keyError]
                    });
                });
            }
        });

        return result;
    }
}
