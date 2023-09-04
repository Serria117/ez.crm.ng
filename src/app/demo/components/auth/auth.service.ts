import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginInterface} from "./LoginInterface";
import {API} from "../../api/baseApi";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    isAuthenticate: boolean = false;
    accessToken: string = '';
    currentUser: any = null;

    authenticate(userNamePassword: LoginInterface): Observable<any> {
        return this.http.post('https://localhost:44311/api/TokenAuth/Authenticate', userNamePassword)
    }

    async login(userNamePassword: LoginInterface): Promise<any> {
        return this.authenticate(userNamePassword).subscribe({
            next: res => {
                if (res.success) {
                    sessionStorage.setItem('user', JSON.stringify(res.result));
                }
            }
        });
    }

    removeToken(){
        sessionStorage.removeItem('user');
    }

    getToken(): any {{
        if(sessionStorage.getItem('user') !== null) {
            let user = JSON.parse(sessionStorage.getItem('user'));
            return user.accessToken;
        }
        return null;
    }}
}
