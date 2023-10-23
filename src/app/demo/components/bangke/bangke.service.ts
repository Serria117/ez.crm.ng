import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API} from "../../api/baseApi";

@Injectable({
    providedIn: 'root'
})
export class BangkeService {

    constructor(private http: HttpClient) {
    }

    BASE_URL: string = API.BASE;

}
