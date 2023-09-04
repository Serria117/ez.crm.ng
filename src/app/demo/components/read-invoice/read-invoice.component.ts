import {Component, OnInit} from '@angular/core';
import {Parser} from 'xml2js';
import * as xmlConverter from 'xml-js';
import {FileUploadEvent, UploadEvent} from "primeng/fileupload";

export interface Invoice {
    SHDon: string;
    Ngay: string;
    NBan: string;
    MSTNBan: string;
    NoiDung: any[];
    TongCThue: any;
    TienThue: any;
    TongSThue: any;
}
@Component({
    selector: 'app-read-invoice',
    templateUrl: './read-invoice.component.html',
    styleUrls: ['./read-invoice.component.scss']
})
export class ReadInvoiceComponent implements OnInit {
    constructor() {
    }
    public invoiceList: Invoice[] = [];
    uploadedFiles: File[] = [];
    xml: string = '<HD>Hóa đơn</HD>>';
    jsonResult: any[] = [];
    xmlParser: Parser = new Parser();
    xmlConverter = xmlConverter;
    ngOnInit(): void {

    }

    onUpload(event: FileUploadEvent) {
        for (let file of event.files) {
            let ext = file.name.split(".")[1];
            if (ext === 'xml') {
                this.uploadedFiles.push(file);
                file.text().then(res => {
                    let json = JSON.parse(this.xmlConverter.xml2json(res, {compact: true}));
                    let inv: Invoice = {
                        MSTNBan: json.HDon.DLHDon.NDHDon.NBan.MST._text,
                        NBan: json.HDon.DLHDon.NDHDon.NBan.Ten._text,
                        Ngay: json.HDon.DLHDon.TTChung.NLap._text,
                        NoiDung: [],
                        TienThue: Number(json.HDon.DLHDon.NDHDon.TToan.TgTThue._text).toLocaleString("de-DE"),
                        TongCThue: Number(json.HDon.DLHDon.NDHDon.TToan.TgTCThue._text).toLocaleString("de-DE"),
                        TongSThue: Number(Number(json.HDon.DLHDon.NDHDon.TToan.TgTThue._text) + Number(json.HDon.DLHDon.NDHDon.TToan.TgTCThue._text)).toLocaleString("de-DE") ,
                        SHDon: json.HDon.DLHDon.TTChung.SHDon._text
                    }
                    this.invoiceList.push(inv);
                });
            }
        }
    }

    protected readonly JSON = JSON;
    protected readonly Number = Number;

    protected readonly Intl = Intl;
}
