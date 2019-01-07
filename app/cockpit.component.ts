import { Component, OnInit ,ElementRef} from '@angular/core';
import { Router , ActivatedRoute, Params,NavigationEnd } from '@angular/router';
import{ATTRIBUTE_LIST} from './class/attributeList';
import {CATEGORY_LIST} from './class/categoryList';
import {MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
})
export class SalesCockpitComponent implements OnInit {
selectedConfig:string;	
applicationBreadCrumb:string[];
attributeList:any[];
categoryList:any[];
dataSource:MatTableDataSource<any>;
configOptions = [
    {
    	"label":'Define Rule Category',
    	"value":'1',
    },
    {
    	"label":'View Rule Categories',
    	"value":'2'
    },
    {
    	"label":'Define New Attribute',
    	"value":'3'
    },
    {
    	"label":'View Available Attributes',
    	"value":'4'
    }
  ];
  constructor(private router:Router) {
  	this.applicationBreadCrumb=new Array();
  	this.attributeList=ATTRIBUTE_LIST;
    this.categoryList=CATEGORY_LIST;
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
  }
  
  
}
