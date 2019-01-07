import {Component, AfterViewInit, ViewChild,OnInit} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Router , ActivatedRoute, Params,NavigationEnd } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import{SelectionModel } from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import{ATTRIBUTE_LIST} from './class/attributeList';
import {CATEGORY_LIST} from './class/categoryList';

import {NgxChartsModule} from '@swimlane/ngx-charts';



@Component({
  selector: 'app-ruleReport',
  templateUrl: './rule-report.component.html',
  providers: []
})
export class RuleReportComponent implements OnInit {
   
  single:any[];
  multi:any[];
  trx:any[];
  view: any[] = [1000,200];
  view2: any[] = [1000,200];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#5642F4']
  };
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Rule Category';
  showYAxisLabel = true;
  yAxisLabel = 'Transaction';

  constructor(private http: HttpClient,private router:Router) {
    Object.assign(this, {single,trx,multi})   
  }
  
  onSelect(event) {
    console.log(event);
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
   
}
export var single = [
  {
    "name": "Exception",
    "value": 1000
  },
  {
    "name": "Deal/Opportunity",
    "value": 5000
  },
  {
    "name": "Named Account",
    "value": 7000
  },
  {
    "name": "Geo Account",
    "value": 1500
  },
  {
    "name": "Partner Based",
    "value": 2500
  }
];
export var trx = [
  {
    "name": "Exception",
    "value": 100000,
  },
  {
    "name": "Deal/Opportunity",
    "value": 708987,
  },
  {
    "name": "Named Account",
    "value": 457898,
  },
  {
    "name": "Geo Account",
    "value": 30798
  },
  {
    "name": "Partner Based",
    "value": 200909
  }
];

var multi=[
   {
    "name": "Exception",
    "series": [
      {
        "name": "2017",
        "value": 100890
      },
      {
        "name": "2018",
        "value": 100000
      }
    ]
  },
  {
    "name": "Deal",
    "series": [
      {
        "name": "2017",
        "value": 590987
      },
      {
        "name": "2018",
        "value": 708987
      }
    ]
  },
  {
    "name": "Named Account",
    "series": [
      {
        "name": "2017",
        "value": 307898
      },
      {
        "name": "2018",
        "value": 457898
      }
    ]
  },
  {
    "name": "Geo Account",
    "series": [
      {
        "name": "2017",
        "value": 80798
      },
      {
        "name": "2018",
        "value": 30798
      }
    ]
  },
  {
    "name": "Partner",
    "series": [
      {
        "name": "2017",
        "value": 123456
      },
      {
        "name": "2018",
        "value": 200909
      }
    ]
  }
]