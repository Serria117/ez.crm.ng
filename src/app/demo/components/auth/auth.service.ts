import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginInterface} from "./LoginInterface";
import {API} from "../../api/baseApi";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
                private cookie: CookieService) {
    }

    isAuthenticate: boolean = false;
    accessToken: string = '';
    currentUser: any = null;

    authenticate(userNamePassword: LoginInterface): Observable<any> {
        return this.http.post(API.BASE + API.AUTH.login, userNamePassword)
    }

    async login(userNamePassword: LoginInterface): Promise<any> {
        return this.authenticate(userNamePassword).subscribe({
            next: res => {
                if (res.success) {
                    sessionStorage.setItem('user', JSON.stringify(res.result));
                    this.cookie.set('user', JSON.stringify(res.result));
                }
            }
        });
    }

    removeToken(){
        sessionStorage.removeItem('user');
    }

    getToken(): string {
        if(sessionStorage.getItem('user') !== null) {
            let user = JSON.parse(sessionStorage.getItem('user'));
            return user.accessToken;
        }

        return null;
    }
}
