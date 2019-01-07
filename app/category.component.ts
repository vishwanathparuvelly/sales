import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatStepper, MatSnackBar } from '@angular/material';
import { SalesCreditService } from './salesCredit.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Message } from 'primeng/components/common/api';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  providers: [SalesCreditService]
})
export class CategoryComponent implements OnInit {

  droppedItems: any[] = [];
  msgs: Message[] = [];
  DefinedCategoryList: any[] = [];
  categoryList: any[] = [
    {
      lookupValue: 'Category One'
    },
    {
      lookupValue: 'Category Two'
    },
    {
      lookupValue: 'Category Three'
    }
  ];
  CategoryName: string = '';
  @ViewChild('stepper') stepper: MatStepper;
  End_Date: Date = new Date();
  Start_Date: Date = new Date();
  SavedCategory: any[] = [];
  finalStart: string = null;
  finalEnd: string = null;
  add: Boolean = false;
  reviewCategories: any[] = [];
  p: Number = 1;
  p2: Number = 1;
  minDateValue: Date;
  minInEndDate: Date;

  constructor(private datePipe: DatePipe, private router: Router, private snackBar: MatSnackBar, private salesCreditService: SalesCreditService) {
    // this.attributeList=ATTRIBUTE_LIST;
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    this.minDateValue = tomorrow;
    this.End_Date = this.minDateValue;
  }

  ngOnInit() {
    this.droppedItems = [];
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
    this.getDefinedCategory();

  }
  addCatgeory() {
    console.log("in addCategory");
    this.getCategoryList();
  }
  getDefinedCategory() {
    this.salesCreditService.getAllCategory().subscribe((response) => {
      console.log("response from getAllCatgeory", response);
      this.DefinedCategoryList = response["content"];
    });
  }
  getCategoryList() {
    this.salesCreditService.getCatgeoryLookup("SC_CATEGORY").subscribe((response) => {
      console.log("response from getDefinedCatgeory", response);
      this.categoryList = response["content"];

    });

  }
  onItemDragged(i) {
    this.categoryList.splice(i, 1);
    console.log("the index of item being dragged is", i);
  }
  removeItem(i) {
    console.log("the dropeed array", this.droppedItems);
    var item = this.droppedItems[i];
    console.log("the item to be removed is", item);
    this.categoryList.push(item);
    this.droppedItems.splice(i, 1);
  }
  onItemDrop(e: any) {
    // Get the dropped data here
    this.droppedItems.push(e.dragData);

  }
  addNew() {
    this.add = true;
    this.stepper.selectedIndex = 2;
  }

  selectedStartDate(Start_Date, End_Date) {
    this.finalStart = this.datePipe.transform(this.Start_Date, 'yyyy-MM-dd');
    if (this.End_Date.getDate() > this.Start_Date.getDate()) {
      this.End_Date = this.End_Date;
      var tmp = new Date(this.Start_Date);
      tmp.setDate(tmp.getDate() + 1);
      if (this.minDateValue.getDate() < tmp.getDate()) {
        this.minInEndDate = tmp;
      } else {
        this.minInEndDate = this.minDateValue;
      }
    } else if (this.End_Date.getDate() <= this.Start_Date.getDate()){
      let tmp = new Date(this.Start_Date);
      tmp.setDate(tmp.getDate() + 1);
      this.End_Date = tmp;
      // console.log(this.End_Date+"false");
      if (this.minDateValue.getDate() < tmp.getDate()) {
        this.minInEndDate = tmp;
      } else {
        this.minInEndDate = this.minDateValue;
      }
    }
  }

  selectedEndDate(End_Date, Start_Date) {
    this.finalEnd = this.datePipe.transform(End_Date, 'yyyy-MM-dd');
  }

  skipAdd() {
    this.reviewCategories = [];
    if (this.droppedItems.length > 0) {
      this.add = false;
      this.droppedItems.forEach((item) => {
        var category_new = {};
        (<any>category_new).ruleCategory = item.lookupValue;
        (<any>category_new).startDate = item.startDate;
        (<any>category_new).endDate = item.endDate;
        this.reviewCategories.push(category_new);
      });
    } else if (this.droppedItems.length == 0) {
      this.add = true;
    }
  }
  nextToThirdStepCategory() {
    console.log('this.CategoryName ', this.CategoryName, ' this.finalStart ', this.finalStart, ' this.finalEnd ', this.finalEnd);
    if (this.CategoryName == '' || this.CategoryName == null) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Category Name is required' });
    } else {
      this.stepper.next()
      this.SavedCategory = [];
      let ob = {};
      (<any>ob).ruleCategory = this.CategoryName;
      if (this.finalStart) {
        (<any>ob).startDate = this.finalStart;
      } else {
        (<any>ob).startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      }
      if (this.finalEnd) {
        (<any>ob).endDate = this.finalEnd;
      } else {
        (<any>ob).endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

      }
      this.SavedCategory.push(ob);
      this.reviewCategories = [];
      this.droppedItems.forEach((item) => {
        var category_new = {};
        (<any>category_new).ruleCategory = item.lookupValue;
        (<any>category_new).startDate = item.startDate;
        (<any>category_new).endDate = item.endDate;
        this.reviewCategories.push(category_new);
      });
      this.reviewCategories.push(ob);
    }

    // if (this.droppedItems.length != 0) {
    //   let indexS: number = 3;
    //   this.stepper.selectedIndex = indexS;
    //   this.SavedCategory = this.droppedItems;
    // } else if (this.droppedItems.length == 0) {
    //   this.SavedCategory = [];
    //   let ob = {
    //     ruleCategory: this.CategoryName,
    //     startDate: this.finalStart,
    //     endDate: this.finalEnd
    //   }
    //   this.SavedCategory.push(ob)
    // }
  }

  onSaveCategory() {
    console.log("teh saved obj is", this.SavedCategory);
    console.log("the droppedItems", this.droppedItems);

    console.log()
    this.salesCreditService.createBullkCategory(this.reviewCategories).subscribe((response) => {
      console.log("the response of bulk category create is", response);
      this.SavedCategory = [];
      this.droppedItems = [];
      this.CategoryName = '';
      this.finalEnd = null;
      this.finalStart = null;
      this.Start_Date = new Date()
      this.End_Date = new Date();
      this.stepper.reset();
      this.getCategoryList();
      this.getDefinedCategory();
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'The category was created successfully' });
    }, error => {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'The category could not be created' });
    });
    /*if(this.SavedCategory.length>0){
      
    }*/
    /* this.snackBar.open(
       'Category Saved Successfully',
       null,
       {
         duration: 3000
       }
     );*/

  }

}
