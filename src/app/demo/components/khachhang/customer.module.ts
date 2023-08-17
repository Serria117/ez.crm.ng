import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerComponent} from "./customer.component";
import {CustomerService} from "./customer.service";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {FileUploadModule} from "primeng/fileupload";
import {RippleModule} from "primeng/ripple";
import {ToolbarModule} from "primeng/toolbar";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {KeyFilterModule} from "primeng/keyfilter";
import {ToastModule} from "primeng/toast";
import {CheckboxModule} from "primeng/checkbox";


@NgModule({
    declarations: [CustomerComponent],
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        FileUploadModule,
        RippleModule,
        ToolbarModule,
        InputTextModule,
        DialogModule,
        DropdownModule,
        InputTextareaModule,
        FormsModule,
        KeyFilterModule,
        ReactiveFormsModule,
        ToastModule,
        CheckboxModule
    ],
    providers: [CustomerService,]
})
export class CustomerModule {
}
