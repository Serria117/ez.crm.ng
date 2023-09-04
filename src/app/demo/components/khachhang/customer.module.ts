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
import {ChipModule} from "primeng/chip";
import {ChipsModule} from "primeng/chips";
import {SplitButtonModule} from "primeng/splitbutton";
import {PaginatorModule} from "primeng/paginator";
import {DividerModule} from "primeng/divider";
import {EditorModule} from "primeng/editor";


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
        CheckboxModule,
        ChipModule,
        ChipsModule,
        SplitButtonModule,
        PaginatorModule,
        DividerModule,
        EditorModule
    ],
    providers: [CustomerService,]
})
export class CustomerModule {
}
