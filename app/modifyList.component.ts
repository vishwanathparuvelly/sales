import {Component, AfterViewInit, ViewChild,OnInit} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Router , ActivatedRoute, Params,NavigationEnd } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormControl,FormBuilder, FormGroup, Validators} from '@angular/forms';
import{SelectionModel } from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {SelectItem} from 'primeng/components/common/api';
import {Message} from 'primeng/components/common/api';
import { forEach } from '@angular/router/src/utils/collection';
import { single } from 'rxjs/operator/single';
import { Response } from '@angular/http/src/static_response';
import { SalesCreditService} from './salesCredit.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-modifyList',
  templateUrl: './modifyList.component.html',
  providers:[SalesCreditService]
})
export class ModifyListComponent implements  OnInit {
  
  salesActiveLinkValue:String="modify";
  allLists:any[]=[];
  searchValue:String=null;
  selectedSearchType:string=null;
  list:any[]=[];
  new_list:any[]=[];
  listUpdated:Boolean=false;
  listValUpdated:any;
  msgs:Message[]=[];
  newLists:any[]=[];
  updatedLists:any[]=[];
  p:Number=1;
  p2:Number=1;
  constructor(private http: HttpClient,private router:Router,private datePipe:DatePipe,private salesCreditService:SalesCreditService) {
  }
  ngOnInit(){
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
          this.router.navigated = false;
          window.scrollTo(0, 0);
      }
    });
    this.getAllLists();
  }
  getAllLists(){
    console.log("in getAllLists");
    this.salesCreditService.fetchAllList().subscribe(response=>{
      console.log("the response of getLists",response);
      this.allLists=response;
      this.newLists=[];
      this.allLists.forEach((list)=>{
        var newval={};
        (<any>newval).selected=false;
        (<any>newval).listName=list;
        this.newLists.push(newval);
      });
     this. selectList(this.newLists[0]);
    });
  }
  selectList(single_list){
    this.searchValue=single_list.listName;
    single_list.selected=true;
    this.newLists.forEach((list)=>{
      if(list.listName!==single_list.listName){
        list.selected=false;
      }
    });
    this.searchList();
  }
  
  searchList(){
    this.salesCreditService.searchListValue(this.searchValue).subscribe(response=>{
      console.log("the response of searchLists",response);
      this.list=response["content"];
      
      this.list.forEach((single_list)=>{
        single_list.displayStartDate=new Date(single_list.startDate);
        single_list.displayEndDate=new Date(single_list.endDate);
        (<any>single_list).new=false;
       console.log("single_list",single_list);
      });
      this.updatedLists=this.list;
      
    });
  }
  changeEndDate(single_val){
    // this.listUpdated=true;
    single_val.endDate=this.datePipe.transform(single_val.displayEndDate, 'yyyy-MM-dd');
    /*this.listValUpdated={};
    this.listValUpdated.attributeName=single_val.attributeName;
    this.listValUpdated.endDate=single_val.endDate;
    this.listValUpdated.listName=single_val.listName;
    this.listValUpdated.listValue=single_val.listValue;
    this.listValUpdated.ruleHeaderId=single_val.ruleHeaderId;
    this.listValUpdated.split=single_val.split;
    this.listValUpdated.startDate=single_val.startDate;*/
  }
  changeStartDate(single_val){
    // this.listUpdated=true;
    single_val.startDate=this.datePipe.transform(single_val.displayStartDate, 'yyyy-MM-dd');
    /*this.listValUpdated={};
    this.listValUpdated.attributeName=single_val.attributeName;
    this.listValUpdated.endDate=single_val.endDate;
    this.listValUpdated.listName=single_val.listName;
    this.listValUpdated.listValue=single_val.listValue;
    this.listValUpdated.ruleHeaderId=single_val.ruleHeaderId;
    this.listValUpdated.split=single_val.split;
    this.listValUpdated.startDate=single_val.startDate;*/
  }
  updateList(){

    console.log("the list to be updated is",this.list);
    this.salesCreditService.updateBulkList(this.list).subscribe((response)=>{
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'The list is updated successfully' });
      this.getAllLists();
      this.list=[];
      this.searchValue=null;
    },error=>{
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error in updating the list' });
    });
    if(this.new_list.length>0){
      this.salesCreditService.createList(this.new_list).subscribe((response)=>{
        console.log("new listValue is created",response);
      },error=>{
        console.log("list could not be created");
      });
    }
    /*this.salesCreditService.updateList(this.listValUpdated).subscribe(response=>{
      console.log("the response of updateList",response);
      
    });
    if(this.new_list.length>0){
      this.salesCreditService.createList(this.new_list).subscribe((response)=>{
        console.log("new listValue is updated",response);
      },error=>{
        console.log("list could not be created");
      });
    }*/
  }
  addNew(){
    var list_var={"listName":this.list[0].listName,"attributeName":this.list[0].attributeName,"listValue":"","displayStartDate":new Date(),"displayEndDate":new Date(),"split":100,"tenantKey":"bb7775d627d94fec9697d666dd7b578c","new":true};
    (<any>list_var).startDate=this.datePipe.transform(new Date(),'yyyy-MM-dd');
    (<any>list_var).endDate=this.datePipe.transform(new Date(),'yyyy-MM-dd');
    this.updatedLists.push(list_var);
    this.new_list.push(list_var);
  }
   
}

