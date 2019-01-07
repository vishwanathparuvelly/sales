import { Component, OnInit, ViewChild, Directive, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { MatStepper } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesCreditService } from './salesCredit.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Message } from 'primeng/components/common/api';
import { saveAs } from "file-saver";
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';
// import { saveAs } from 'file-saver/FileSaver';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    providers: [SalesCreditService]
})
export class ListComponent implements OnInit {
    listValues: any[] = [];
    listName: String = null;
    attributeList: any[] = [];
    selectedAttribute: String = null;
    startDate: Date = new Date;
    endDate: Date = new Date;
    msgs: Message[] = [];
    fileName: "Template";
    listObj: any = { "listName": "", "attributeName": "", "listValues": [] };
    salesActiveLinkValue: String = "create";
    showSave: Boolean = false;
    p: Number = 1;
    @ViewChild('stepper') stepper;
    constructor(private http: Http, private router: Router, private _formBuilder: FormBuilder, private datePipe: DatePipe, private salesCreditService: SalesCreditService) {

    }

    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                this.router.navigated = false;
                window.scrollTo(0, 0);
            }
        });
        this.getAttributeList();
    }
    getAttributeList() {
        console.log("in getAttributeList");
        this.salesCreditService.getAllAttribute().subscribe(responseValues => {
            console.log("the responseValues", responseValues);
            this.attributeList = responseValues;
        }, error => {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error fetching Attributes Data' });
        });

    }


    addList() {
        console.log("add")
        this.salesCreditService.fetchAllList().subscribe(responseValues => {
            console.log("the response of fetchAllList", responseValues);
            var index = responseValues.indexOf(this.listName);
            console.log("the index is", index);
            var find = _.indexOf(responseValues, this.listName);
            console.log("teh find is", find);
            if (index >= 0) {
                console.log("list already exists");
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: 'The list name already exists' });
            } else {
                var new_list = { "listName": this.listName, "attributeName": this.selectedAttribute, "listValue": "", "displayStartDate": new Date(), "displayEndDate": new Date(), "split": 100 };
                (<any>new_list).startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
                (<any>new_list).endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
                this.listValues.push(new_list);
            }
        });
        if (this.listName == '' || this.listName == null) {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Profile Name is required' });
        } else {
            this.showSave = true;
            this.stepper.next()
        }

    }
    save() {
        /* this.listObj.listName=this.listName;
         this.listObj.attributeName=this.selectedAttribute;
         this.listObj.listValues=this.listValues;*/
        console.log("the list to be creatde is", this.listValues);
        this.salesCreditService.createList(this.listValues).subscribe(response => {
            console.log("the response of createList", response);
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'The list created successfully' });
            this.createNew();
        }, error => {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'List could not be created' });
        });
    }
    changeStartDate(single_list) {

        single_list.startDate = this.datePipe.transform(single_list.displayStartDate, 'yyyy-MM-dd');
    }
    changeEndDate(single_list) {

        single_list.endDate = this.datePipe.transform(single_list.displayEndDate, 'yyyy-MM-dd');
    }
    createNew() {
        this.showSave = false;
        this.listValues = [];
        this.listName = null;
        this.selectedAttribute = null;
        // this.listObj={"listName":"","attributeName":"","listValues":[]};

    }
    /* download() {
         const headers = new Headers();
         // headers.append('Accept', 'text/plain');
         headers.append('Authorization','Basic bGluZW4uY2xpZW50OmxpbmVu');
         headers.append('x-tenant-key','bb7775d627d94fec9697d666dd7b578c');
         this.http.get('https://linen-api-v2.herokuapp.com/linen/api/file/download', { headers: headers })
           .toPromise()
           .then(response => this.saveToFileSystem(response));
       }
      
       private saveToFileSystem(response) {
         const contentDispositionHeader: string = response.headers.get('Content-Disposition');
         const parts: string[] = contentDispositionHeader.split(';');
         const filename = parts[1].split('=')[1];
         const blob = new Blob([response._body], { type: 'text/plain' });
         saveAs(blob, filename);
       }*/

}
