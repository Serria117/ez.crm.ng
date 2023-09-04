import {Component} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {AuthService} from "../auth.service";
import {LoginInterface} from "../LoginInterface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    user: LoginInterface = {}
    loginForm: FormGroup
    isAuthenticate: boolean = false;

    constructor(public layoutService: LayoutService,
                private authService: AuthService,
                private router: Router) {
        this.initLoginForm();
    }

    initLoginForm(): void {
        this.loginForm = new FormGroup({
            userNameOrEmailAddress: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            rememberClient: new FormControl(true)
        })
    }

    login(): any {
        if (!this.loginForm.invalid) {
            this.user = {...this.loginForm.value}
            this.authService.authenticate(this.user).subscribe({
                next: res => {
                    if(res.success){
                        sessionStorage.setItem('user', JSON.stringify(res.result));
                        this.isAuthenticate = true;
                        this.router.navigate(['/khach-hang'])
                    }
                }
            })

        } else {
            console.log("Invalid login")
        }
    }

}
