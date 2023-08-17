import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../../api/customer";
import {API} from "../../api/baseApi";

@Injectable()
export class CustomerService {

    constructor(private httpClient: HttpClient) {
    }

    BASE_URL: string = API.BASE;

    getAll(page: number, size: number): Observable<any> {
        return this.httpClient.get(this.BASE_URL + API.Customer.getAll,
            {
                params: {
                    page: page,
                    size: size
                }
            });
    }

    create(customer: Customer): Observable<any> {
        return this.httpClient.post(this.BASE_URL + API.Customer.create, customer)
    }

    findById(taxCode: string): Observable<any> {
        return this.httpClient.get(this.BASE_URL + API.Customer.findById + taxCode);
    }

    update(customer: Customer): Observable<any> {
        return this.httpClient.post(this.BASE_URL + API.Customer.update, customer)
    }

    search(keyword: string, page: number, size: number): Observable<any> {
        return this.httpClient.get(this.BASE_URL + API.Customer.search,
            {
                params: {
                    keyword: keyword,
                    page: page,
                    size: size
                }
            });
    }

    checkDuplicate(taxCode: string): Observable<any> {
        return this.httpClient.post(this.BASE_URL + API.Customer.check,
            null,
            {
                params: {taxCode: taxCode}
            });
    }

    validateTaxCode(taxCode: string): Observable<any> {
        return this.httpClient.get(this.BASE_URL + API.Customer.validate,
            {
                params: {taxCode: taxCode}
            });
    }
}
