import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API} from "../../api/baseApi";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaxAuthorityService {

    constructor(private http: HttpClient) {
    }

    getAll(page: number, size: number): Observable<any> {
        return this.http.get(API.BASE + API.TaxAuthority.getAll,
            {
                params: {
                    Page: page,
                    Size: size,
                }
            })
    }

    getByParent(id: number, page: number, size: number): Observable<any> {
    return this.http.get(API.BASE + API.TaxAuthority.getByParent,
        {
            params: {
                id: id,
                Page: page,
                Size: size
            }
        })
    }

    getById(id: number): Observable<any>{
        return this.http.get(API.BASE + API.TaxAuthority.getById,{
            params: {
                id: id
            }
        })
    }
}
