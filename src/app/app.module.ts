import { NgModule } from '@angular/core';
import {HashLocationStrategy, LocationStrategy, NgForOf, NgIf} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { CustomerComponent } from './demo/components/khachhang/customer.component';
import {CustomerService} from "./demo/components/khachhang/customer.service";
import {CustomerModule} from "./demo/components/khachhang/customer.module";
import {MessageService} from "primeng/api";
import { ReadInvoiceComponent } from './demo/components/read-invoice/read-invoice.component';
import {FileUploadModule} from "primeng/fileupload";
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {AuthInterceptorProviders} from "./helper/auth.interceptor";

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, ReadInvoiceComponent
    ],
    imports: [
        AppRoutingModule, CustomerModule,
        AppLayoutModule, FileUploadModule, ToastModule, NgIf, NgForOf, TableModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, EventService, IconService, NodeService,
        PhotoService, ProductService, MessageService, AuthInterceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
