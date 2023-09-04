import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class GuardService {

    constructor(private router: Router, private auth: AuthService) {}
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.auth.getToken();
        if(token === null) {
            this.router.navigate(['/auth/login'])
            return false;
        }
        return true;
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(GuardService).canActivate(next, state);
}
