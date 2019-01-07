import { Component, OnInit,ViewChild,Directive, Renderer2, ElementRef,AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, ActivatedRoute, Params,Router,NavigationEnd } from '@angular/router';
import { MatStepper } from '@angular/material';
import{SelectionModel } from '@angular/cdk/collections';
import {FormControl,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SalesCreditService} from './salesCredit.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Message } from 'primeng/components/common/api';
import {saveAs} from "file-saver";
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';
// import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  providers: [SalesCreditService]
})
export class TemplateComponent implements OnInit {
    
    fileName:"Template";
    
  constructor(private http:Http,private router:Router,private _formBuilder: FormBuilder,private datePipe:DatePipe,private salesCreditService:SalesCreditService) {
    
  }

  ngOnInit() {
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
      };
      this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
            this.router.navigated = false;
            window.scrollTo(0, 0);
        }
      });
    
    }
    
    download() {
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
      }
    
}
