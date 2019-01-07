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
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [SalesCreditService]
})
export class LoginComponent implements OnInit {
    username:string=null;
    password:string=null;
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
    login(){
        if(this.username==="linenadmin" && this.password==="linenadmin"){
            this.router.navigate(["/attribute"]);
        }
    }
}
