import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import {CookieService} from "ngx-cookie-service";

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule
    ],
    providers: [CookieService]
})
export class AuthModule { }
