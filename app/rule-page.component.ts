import { Component, OnInit, ViewChild, ChangeDetectorRef, OnChanges, ChangeDetectionStrategy, NgZone, ApplicationRef, DoCheck, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatStepper, MatSnackBar } from '@angular/material';
import { Message } from 'primeng/components/common/api';
import { QueryBuilderConfig, QueryBuilderComponent } from "angular2-query-builder";
import { SalesCreditService } from './salesCredit.service';

@Component({
  selector: 'app-rule-page',
  templateUrl: './rule-page.component.html',
  providers: [
    SalesCreditService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RulePageComponent extends QueryBuilderComponent implements OnInit, OnChanges, DoCheck, AfterViewInit {
 
  split: number;
  minInEndDate: Date;
  Attributes: any[] = [
    {
      "attribMapId": 1,
      "colType": "string",
      "createdBy": "string",
      "createdDate": "2018-11-28T06:02:46.878Z",
      "isListType": "N",
      "isMapped": "string",
      "lastModifiedBy": "string",
      "lastModifiedDate": "2018-11-28T06:02:46.878Z",
      "linenAttribute": {
        "applicableModules": "string",
        "colName": "string",
        "colType": "string",
        "createdBy": "string",
        "createdDate": "2018-11-28T06:02:46.879Z",
        "fixedAttribute": "string",
        "lastModifiedBy": "string",
        "lastModifiedDate": "2018-11-28T06:02:46.879Z",
        "userColumnName": "string"
      },
      "userColumnName": "Attribute1"
    },
    {
      "attribMapId": 2,
      "colType": "date",
      "createdBy": "string",
      "createdDate": "2018-11-28T06:02:46.878Z",
      "isListType": "N",
      "isMapped": "string",
      "lastModifiedBy": "string",
      "lastModifiedDate": "2018-11-28T06:02:46.878Z",
      "linenAttribute": {
        "applicableModules": "string",
        "colName": "string",
        "colType": "string",
        "createdBy": "string",
        "createdDate": "2018-11-28T06:02:46.879Z",
        "fixedAttribute": "string",
        "lastModifiedBy": "string",
        "lastModifiedDate": "2018-11-28T06:02:46.879Z",
        "userColumnName": "string"
      },
      "userColumnName": "Attribute2"
    },
    {
      "attribMapId": 3,
      "colType": "string",
      "createdBy": "string",
      "createdDate": "2018-11-28T06:02:46.878Z",
      "isListType": "N",
      "isMapped": "string",
      "lastModifiedBy": "string",
      "lastModifiedDate": "2018-11-28T06:02:46.878Z",
      "linenAttribute": {
        "applicableModules": "string",
        "colName": "string",
        "colType": "string",
        "createdBy": "string",
        "createdDate": "2018-11-28T06:02:46.879Z",
        "fixedAttribute": "string",
        "lastModifiedBy": "string",
        "lastModifiedDate": "2018-11-28T06:02:46.879Z",
        "userColumnName": "string"
      },
      "userColumnName": "Attribute3"
    }
  ];
  int_Value_postion: number = 0;
  sqlExpression: String = 'Attribute = undefined';
  uiExpression = {};
  uiFormatExpression = {};
  fieldsS = {}
  config: QueryBuilderConfig = {
    fields: {}
  }
  // "Attribute1": {
  //   name: "Attribute1",
  //   type: "string",
  //   operators: ["Equals", "Does not Equal", "Starts With", "Contains", "Does Not Contain", "Does Not Start With", "Does Not End With"]
  // }
  operators: any[] = [];
  @ViewChild('stepper') stepper: MatStepper;
  findAttrPos: number = 0;
  selectedOwner: any = {};
  p: Number = 1;
  RuleOwnerList: any[] = [
    {
      selected: false,
      agentName: 'Rule Owner 1',
      agentId: 1,
      territoryName: 'Territory Name 1',
      territoryId: 1,
      startDate: '2018-01-10',
      endDate: '2018-10-10'
    },
    {
      selected: false,
      agentName: 'Rule Owner 2',
      agentId: 2,
      territoryName: 'Territory Name 2',
      territoryId: 2,
      startDate: '2018-01-10',
      endDate: '2018-10-10'
    },
    {
      selected: false,
      agentName: 'Rule Owner 3',
      agentId: 3,
      territoryName: 'Territory Name 3',
      territoryId: 3,
      startDate: '2018-01-10',
      endDate: '2018-10-10'
    },
    {
      selected: false,
      agentName: 'Rule Owner 4',
      agentId: 4,
      territoryName: 'Territory Name 4',
      territoryId: 4,
      startDate: '2018-01-10',
      endDate: '2018-10-10'
    },
    {
      selected: false,
      agentName: 'Rule Owner 5',
      agentId: 5,
      territoryName: 'Territory Name 5',
      territoryId: 5,
      startDate: '2018-01-10',
      endDate: '2018-10-10'
    }
  ];
  owner_header: any[] = [];
  owner_list: any[] = [];
  // CategoryName: string = null;
  CategoryValue: string = null;
  CategoryLists: any[] = [
    {
      "createdBy": "string",
      "createdDate": "2018-11-28T06:01:32.798Z",
      "endDate": "string",
      "id": "string",
      "lastModifiedBy": "string",
      "lastModifiedDate": "2018-11-28T06:01:32.798Z",
      "ruleCategory": "Category1",
      "startDate": "string"
    },
    {
      "createdBy": "string",
      "createdDate": "2018-11-28T06:01:32.798Z",
      "endDate": "string",
      "id": "string",
      "lastModifiedBy": "string",
      "lastModifiedDate": "2018-11-28T06:01:32.798Z",
      "ruleCategory": "Category2",
      "startDate": "string"
    }
  ];
  priority: number = 1;
  Start_Date: Date = new Date();
  End_Date: Date = new Date();
  startDate: string = null;
  endDate: string = null;
  RuleName: string = null;
  RuleOwner: string = null;
  // FinalQuery: string;
  msgs: any[] = [];
  RuleOwnerValue: string = 'Select Rule Owner Name';
  TerritoryValue: string = 'Select Territory Name';
  allRules: any[] = [
    {
      "createdBy": "string",
      "createdDate": "2018-11-28T05:59:47.171Z",
      "endDate": "30-11-2018",
      "lastModifiedBy": "string",
      "lastModifiedDate": "2018-11-28T05:59:47.171Z",
      "obsoleteFlag": "string",
      "profileDetailId": 0,
      "ruleCategory": "Category1",
      "ruleHeaderId": 0,
      "ruleName": "Rule1",
      "startDate": "28-11-2018"
    }
  ];
  userExpression: String = 'Attribute = undefined';
  // ruleValue: any;
  public currentConfig: QueryBuilderConfig;
  allOperator = [
    {
      "attributeType": "string",
      "operators": [
        { "displayOperator": "Equals", "sqlOperator": " =(VALUE)" },
        { "displayOperator": "Does not Equal", "sqlOperator": "<>(VALUE)" },
        { "displayOperator": "Starts With", "sqlOperator": "LIKE %(VALUE)" },
        { "displayOperator": "Ends With", "sqlOperator": "LIKE (VALUE)%" },
        { "displayOperator": "Contains", "sqlOperator": "LIKE %(VALUE)%" },
        { "displayOperator": "Does Not Contain", "sqlOperator": "NOT LIKE %(VALUE)" },
        { "displayOperator": "Does Not Start With", "sqlOperator": "NOT LIKE (VALUE)%" },
        { "displayOperator": "Does Not End With", "sqlOperator": "NOT LIKE %(VALUE)%" }
      ]
    },
    {
      "attributeType": "number",
      "operators": [
        { "displayOperator": "Equals", "sqlOperator": " =(VALUE)" },
        { "displayOperator": "Does not Equal", "sqlOperator": "<>(VALUE)" },
        { "displayOperator": "Greater", "sqlOperator": ">(VALUE)" },
        { "displayOperator": "Equal or Greater", "sqlOperator": ">=(VALUE)" },
        { "displayOperator": "Less", "sqlOperator": "<(VALUE)" },
        { "displayOperator": "Equal or Less", "sqlOperator": "<=(VALUE)" },
        { "displayOperator": "Within", "sqlOperator": "BETWEEN (VALUE1) AND (VALUE2)" }
      ]
    },
    {
      "attributeType": "date",
      "operators": [
        { "displayOperator": "Equals", "sqlOperator": " =(VALUE)" },
        { "displayOperator": "On or After", "sqlOperator": ">=(VALUE)" },
        { "displayOperator": "Before", "sqlOperator": "<(VALUE)" },
        { "displayOperator": "Between", "sqlOperator": "BETWEEN (VALUE1) AND (VALUE2)" }
      ]
    }
  ];
  minDateValue: Date;
  constructor(public zone: NgZone, 
    private salesCreditService: SalesCreditService, 
    private datePipe: DatePipe, 
    private snackBar: MatSnackBar, 
    public detect: ChangeDetectorRef, 
    private application: ApplicationRef) {
    super(detect);
    // this.currentConfig = this.config;
    var objStr = {
      attributeType: "string",
      operators: []
    }
    var objNum = {
      attributeType: "number",
      operators: []
    }
    var objDate = {
      attributeType: "date",
      operators: []
    }
    
    // this.salesCreditService.operatorsJSON().subscribe(
    //   res => {
    //     this.allOperator = res["operators"];
    // console.log('res ', JSON.stringify(res["operators"]));
    if (this.allOperator.length > 0) {
      for (var j = 0; j < this.allOperator.length; j++) {
        if (this.allOperator[j].attributeType == 'string') {
          for (let num of this.allOperator[j].operators) {
            objStr.operators.push(num.displayOperator)
            this.operators.push(objStr)
          }
        } else if (this.allOperator[j].attributeType == 'number') {
          for (let num of this.allOperator[j].operators) {
            objNum.operators.push(num.displayOperator)
            this.operators.push(objNum)
          }
        } else if (this.allOperator[j].attributeType == 'date') {
          for (let num of this.allOperator[j].operators) {
            objDate.operators.push(num.displayOperator)
            this.operators.push(objDate)
          }
        }
      }
      this.operators = this.operators.filter((value, index, array) =>
        !array.filter((v, i) => this.isEqual(value, v) && i < index).length);
    }


    //   },
    //   error => {
    //     console.log('error ', error);
    //   }
    // )

    this.salesCreditService.sampleApi().subscribe(
      res => {
        console.log('res ', JSON.stringify(res));
        this.formConfig()
      },
      error => {
        console.log('error ', JSON.stringify(error));
      }
    )

    if (this.Attributes.length > 0) {
      this.uiExpression = {
        condition: 'and',
        rules: []
      }
    }

    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    this.minDateValue = tomorrow;
    this.End_Date = this.minDateValue;

    var re = /undefined/gi;
    var newstr = this.userExpression.replace(re, "");
    this.userExpression = newstr;
  }

  isEqual(a, b) {
    for (var i in a)
      if (a[i] != b[i])
        return false;
    for (var i in b)
      if (b[i] != a[i])
        return false;
    return true;
  }

  ngOnInit() {
    this.getAllRules();
  }

  goToRule() {
    this.getDefinedCategory();
    this.getAttributeList();
  }

  getAllRules() {
    this.salesCreditService.getAllRules().subscribe((response) => {
      // this.allRules = response["content"];
      console.log("the rules ", JSON.stringify(response["content"]));
    });
  }

  formConfig() {
    console.log('Attributes list ',JSON.stringify(this.Attributes));
    for (var i = 0; i < this.Attributes.length; i++) {
      var stat = this.Attributes[i].colType;
      switch (this.Attributes[i].colType) {
        case 'string': {
          if (this.Attributes[i].isListType == 'Y') {
            this.fieldsS[this.Attributes[i].userColumnName] = {
              name: this.Attributes[i].userColumnName,
              type: 'category',
              operators: this.operators[0].operators,
              options: []
            }
            this.config.fields = this.fieldsS;
          } else if (this.Attributes[i].isListType == 'N') {
            this.fieldsS[this.Attributes[i].userColumnName] = {
              name: this.Attributes[i].userColumnName,
              type: this.Attributes[i].colType.toLowerCase(),
              operators: this.operators[0].operators,
              options: ""
            }
            this.config.fields = this.fieldsS;
          }
          break;
        }
        case 'number': {
          if (this.Attributes[i].isListType == 'Y') {
            this.fieldsS[this.Attributes[i].userColumnName] = {
              name: this.Attributes[i].userColumnName,
              type: 'category',
              operators: this.operators[1].operators,
              options: []
            }
            this.config.fields = this.fieldsS;
          } else if (this.Attributes[i].isListType == 'N') {
            this.fieldsS[this.Attributes[i].userColumnName] = {
              name: this.Attributes[i].userColumnName,
              type: this.Attributes[i].colType.toLowerCase(),
              operators: this.operators[1].operators,
              options: ""
            }
            this.config.fields = this.fieldsS;
          }
          break;
        }
        case 'date': {
          if (this.Attributes[i].isListType == 'Y') {
            this.fieldsS[this.Attributes[i].userColumnName] = {
              name: this.Attributes[i].userColumnName,
              type: 'category',
              operators: this.operators[2].operators,
              options: []
            }
            this.config.fields = this.fieldsS;
          } else if (this.Attributes[i].isListType == 'N') {
            this.fieldsS[this.Attributes[i].userColumnName] = {
              name: this.Attributes[i].userColumnName,
              type: this.Attributes[i].colType.toLowerCase(),
              operators: this.operators[2].operators,
              options: ""
            }
            this.config.fields = this.fieldsS;
          }
          break;
        }
      }
      
    }
    this.currentConfig = this.config;
      this.detect.detectChanges()
    console.log('currentConfig ', JSON.stringify(this.currentConfig));
  }

  getAttributeList() {
    console.log("in getAttributeList");
    console.log('Attributes list before API ',JSON.stringify(this.Attributes));
    this.salesCreditService.getAllAttribute().subscribe(responseValues => {
      console.log("Attributes List ---> ", JSON.stringify(responseValues));
      this.Attributes = responseValues;
      // this.formConfig();
    }, error => {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error fetching Attributes' });
    });
  }

  getDefinedCategory() {
    this.salesCreditService.getAllCategory().subscribe((response) => {
      // this.CategoryLists = response["content"];
      console.log("response from getAllCatgeory", response);
    });
  }

  changeOperators(rule) {
    // console.log("the rule is", rule);
    // if (rule.operator == "contains") {
    //   this.findAttr(this.uiExpression, this.findAttrPos, rule)
    // }
  }

  findAttr(group, firstPosition, rule) {
    for (var i = 0; i <= (group.rules.length - 1); i++) {
      if (i == 0) {
        if (firstPosition == 0) {
          if (group.rules[i].field == rule.field && group.rules[i].operator == rule.operator) {
            console.log('not a null field ', group.rules[i].field, ' rule.operator ', rule.operator);
            group.rules[i].value = this.datePipe.transform(rule.value, 'yyyy-MM-dd');
            console.log('not a null value ', group.rules[i].value);
          }
        } else {
          if (group.rules[i].field == rule.field && group.rules[i].operator == rule.operator) {
            console.log('not a null field ', group.rules[i].field, ' rule.operator ', rule.operator);
            group.rules[i].value = this.datePipe.transform(rule.value, 'yyyy-MM-dd');
            console.log('not a null value ', group.rules[i].value);
          }
        }
      } else {
        if (group.rules[i].field == null) {
          if (group.rules[i].field == rule.field && group.rules[i].operator == rule.operator) {
            console.log('not a null field ', group.rules[i].field, ' rule.operator ', rule.operator);
            group.rules[i].value = this.datePipe.transform(rule.value, 'yyyy-MM-dd');
            console.log('not a null value ', group.rules[i].value);
          }
          firstPosition++;
          this.findAttr(group.rules[i], firstPosition, rule)
        } else {
          if (i != group.rules.length - 1) {
            if (group.rules[i].field == rule.field && group.rules[i].operator == rule.operator) {
              console.log('not a null field ', group.rules[i].field, ' rule.operator ', rule.operator);
              group.rules[i].value = this.datePipe.transform(rule.value, 'yyyy-MM-dd');
              console.log('not a null value ', group.rules[i].value);
            }
          } else {
            if (group.rules[i].field == rule.field && group.rules[i].operator == rule.operator) {
              console.log('not a null field ', group.rules[i].field, ' rule.operator ', rule.operator);
              group.rules[i].value = this.datePipe.transform(rule.value, 'yyyy-MM-dd');
              console.log('not a null value ', group.rules[i].value);
            }
          }
        }
      }
    }
    this.uiFormatExpression = group;
    console.log('uiFormatExpression ', this.uiFormatExpression);
    console.log('uiExpression ', this.uiExpression);
  }

  onChagneCategory(CategoryValue: string, event) {
    this.CategoryValue = CategoryValue;
  }

  onChagneRuleOwner(RuleOwnerValue: string, event) {
    this.RuleOwnerValue = RuleOwnerValue;
  }

  onChagneTerritory(TerritoryValue: string, event) {
    this.TerritoryValue = TerritoryValue;
  }

  selectedStartDate(Start_Date, End_Date) {
    
    this.startDate = this.datePipe.transform(this.Start_Date, 'yyyy-MM-dd');
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

  nextToThird() {
    console.log('RuleName '+this.RuleName);
    console.log('Start_Date '+this.Start_Date,' ',this.startDate);
    console.log('End_Date '+this.End_Date,' ',this.endDate);
    if(this.RuleName == '' || this.RuleName == null) {
      console.log(this.RuleName)
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Profile Name is required' });
    } else if(this.CategoryValue == '' || this.CategoryValue == null) {
      console.log(this.CategoryValue)
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Category is required' });
    }else if(this.End_Date == null) {
      console.log(this.End_Date)
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'end date is required' });
    }else if(this.Start_Date == null) {
      console.log(this.Start_Date)
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'start date is required' });
    }else {
      this.stepper.next()
    }
  }

  selectedEndDate(End_Date) {
    this.endDate = this.datePipe.transform(End_Date, 'yyyy-MM-dd');
  }

  apply() {
    this.int_Value_postion = 0;
    let numb: any[] = [];
    // console.log('before pushing ' + JSON.stringify(this.uiExpression));
    this.uiFormatExpression = this.uiExpression
    console.log(this.uiFormatExpression)
    numb.push(this.uiFormatExpression)
    if (this.Attributes.length > 0) {
      this.expressionM(this.uiFormatExpression, this.int_Value_postion);
      console.log('not length');
    } else if (this.Attributes.length == 0) {
      console.log('not length');
    }
    }

  expressionM(group, int_Value_postion) {
    // console.log('this.Attributes ' + JSON.stringify(this.Attributes));
    console.log("exp")
    console.log(this.userExpression.length)
  if(group.rules.length == 0){
     this.msgs = [];
     this.msgs.push({ severity: 'error', summary: "required atleast one value" });
  }
    for (var i = 0; i <= (group.rules.length - 1); i++) {
      if(group.rules[i].value == '' || group.rules[i].value == null) {
        console.log("empty");
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: "value is required" });
      } else {
        this.stepper.next()
       if (i == 0) {
        if (int_Value_postion == 0) {
          console.log('group.rules[i] ', JSON.stringify(group.rules[i]));
          let valss = this.Attributes.findIndex(res => res.userColumnName === group.rules[i].field);
          let typ = this.Attributes[valss].colType;
          if (typ == 'number') {
            this.sqlExpression = "((" + group.rules[i].field + " " + ((group.rules[i].operator == 'Equals') ? '= ' + group.rules[i].value :
              (group.rules[i].operator == 'Does not Equal') ? '<> ' + group.rules[i].value :
                (group.rules[i].operator == 'Starts With') ? 'LIKE %' + group.rules[i].value :
                  (group.rules[i].operator == 'Ends With') ? 'LIKE ' + group.rules[i].value + '%' :
                    (group.rules[i].operator == 'Contains') ? 'LIKE %' + group.rules[i].value + '%' :
                      (group.rules[i].operator == 'Does Not Contain') ? 'NOT LIKE %' + group.rules[i].value + '' :
                        (group.rules[i].operator == 'Does Not Start With') ? 'NOT LIKE ' + group.rules[i].value + '%' :
                          (group.rules[i].operator == 'Does Not End With') ? 'NOT LIKE %' + group.rules[i].value + '%' :
                            (group.rules[i].operator == 'Greater') ? '> ' + group.rules[i].value :
                              (group.rules[i].operator == 'Equal or Greater') ? '>= ' + group.rules[i].value :
                                (group.rules[i].operator == 'Less') ? '< ' + group.rules[i].value :
                                  (group.rules[i].operator == 'Equal or Less') ? '<= ' + group.rules[i].value :
                                    (group.rules[i].operator == 'Within') ? 'BETWEEN ' + group.rules[i].value :
                                      (group.rules[i].operator == 'On or After') ? '>= ' + group.rules[i].value :
                                        (group.rules[i].operator == 'Before') ? '< ' + group.rules[i].value :
                                          (group.rules[i].operator == 'Between') ? 'BETWEEN ' + group.rules[i].value : group.rules[i].value) + ")";
            this.userExpression = group.rules[i].field + " " + group.rules[i].operator + " " + group.rules[i].value;
          } else {
            this.sqlExpression = "((" + group.rules[i].field + " " + ((group.rules[i].operator == 'Equals') ? "= '" + group.rules[i].value + "'" :
              (group.rules[i].operator == 'Does not Equal') ? "<> '" + group.rules[i].value + "'" :
                (group.rules[i].operator == 'Starts With') ? "LIKE %'" + group.rules[i].value + "'" :
                  (group.rules[i].operator == 'Ends With') ? "LIKE '" + group.rules[i].value + "'%" :
                    (group.rules[i].operator == 'Contains') ? "LIKE %'" + group.rules[i].value + "'%" :
                      (group.rules[i].operator == 'Does Not Contain') ? "NOT LIKE %'" + group.rules[i].value + "'" :
                        (group.rules[i].operator == 'Does Not Start With') ? "NOT LIKE '" + group.rules[i].value + "'" :
                          (group.rules[i].operator == 'Does Not End With') ? "NOT LIKE %'" + group.rules[i].value + "'" :
                            (group.rules[i].operator == 'Greater') ? "> '" + group.rules[i].value + "'" :
                              (group.rules[i].operator == 'Equal or Greater') ? ">= '" + group.rules[i].value + "'" :
                                (group.rules[i].operator == 'Less') ? "< '" + group.rules[i].value + "'" :
                                  (group.rules[i].operator == 'Equal or Less') ? "<= '" + group.rules[i].value + "'" :
                                    (group.rules[i].operator == 'Within') ? "BETWEEN '" + group.rules[i].value + "'" :
                                      (group.rules[i].operator == 'On or After') ? ">= '" + group.rules[i].value + "'" :
                                        (group.rules[i].operator == 'Before') ? "< '" + group.rules[i].value + "'" :
                                          (group.rules[i].operator == 'Between') ? "BETWEEN '" + group.rules[i].value + "'" : group.rules[i].value) + ")";
            this.userExpression = group.rules[i].field + " " + group.rules[i].operator + " " + group.rules[i].value;
          }

        } else {
          let valss = this.Attributes.findIndex(res => res.userColumnName === group.rules[i].field);
          let typ = this.Attributes[valss].colType;
          if (typ == 'number') {
            this.sqlExpression += "((" + group.rules[i].field + " " + ((group.rules[i].operator == 'Equals') ? '= ' + group.rules[i].value :
              (group.rules[i].operator == 'Does not Equal') ? '<> ' + group.rules[i].value :
                (group.rules[i].operator == 'Starts With') ? 'LIKE %' + group.rules[i].value :
                  (group.rules[i].operator == 'Ends With') ? 'LIKE ' + group.rules[i].value + '%' :
                    (group.rules[i].operator == 'Contains') ? 'LIKE %' + group.rules[i].value + '%' :
                      (group.rules[i].operator == 'Does Not Contain') ? 'NOT LIKE %' + group.rules[i].value + '' :
                        (group.rules[i].operator == 'Does Not Start With') ? 'NOT LIKE ' + group.rules[i].value + '%' :
                          (group.rules[i].operator == 'Does Not End With') ? 'NOT LIKE %' + group.rules[i].value + '%' :
                            (group.rules[i].operator == 'Greater') ? '> ' + group.rules[i].value :
                              (group.rules[i].operator == 'Equal or Greater') ? '>= ' + group.rules[i].value :
                                (group.rules[i].operator == 'Less') ? '< ' + group.rules[i].value :
                                  (group.rules[i].operator == 'Equal or Less') ? '<= ' + group.rules[i].value :
                                    (group.rules[i].operator == 'Within') ? 'BETWEEN ' + group.rules[i].value :
                                      (group.rules[i].operator == 'On or After') ? '>= ' + group.rules[i].value :
                                        (group.rules[i].operator == 'Before') ? '< ' + group.rules[i].value :
                                          (group.rules[i].operator == 'Between') ? 'BETWEEN ' + group.rules[i].value : group.rules[i].value) + ")";
            this.userExpression += group.rules[i].field + " " + group.rules[i].operator + " " + group.rules[i].value;
          } else {
            this.sqlExpression += "((" + group.rules[i].field + " " + ((group.rules[i].operator == 'Equals') ? "= '" + group.rules[i].value + "'" :
              (group.rules[i].operator == 'Does not Equal') ? "<> '" + group.rules[i].value + "'" :
                (group.rules[i].operator == 'Starts With') ? "LIKE %'" + group.rules[i].value + "'" :
                  (group.rules[i].operator == 'Ends With') ? "LIKE '" + group.rules[i].value + "'%" :
                    (group.rules[i].operator == 'Contains') ? "LIKE %'" + group.rules[i].value + "'%" :
                      (group.rules[i].operator == 'Does Not Contain') ? "NOT LIKE %'" + group.rules[i].value + "'" :
                        (group.rules[i].operator == 'Does Not Start With') ? "NOT LIKE '" + group.rules[i].value + "'%" :
                          (group.rules[i].operator == 'Does Not End With') ? "NOT LIKE %'" + group.rules[i].value + "'%" :
                            (group.rules[i].operator == 'Greater') ? "> '" + group.rules[i].value + "'" :
                              (group.rules[i].operator == 'Equal or Greater') ? ">= '" + group.rules[i].value + "'" :
                                (group.rules[i].operator == 'Less') ? "< '" + group.rules[i].value + "'" :
                                  (group.rules[i].operator == 'Equal or Less') ? "<= '" + group.rules[i].value + "'" :
                                    (group.rules[i].operator == 'Within') ? "BETWEEN '" + group.rules[i].value + "'" :
                                      (group.rules[i].operator == 'On or After') ? ">= '" + group.rules[i].value + "'" :
                                        (group.rules[i].operator == 'Before') ? "< '" + group.rules[i].value + "'" :
                                          (group.rules[i].operator == 'Between') ? "BETWEEN '" + group.rules[i].value + "'" : group.rules[i].value) + ")";
            this.userExpression += group.rules[i].field + " " + group.rules[i].operator + " " + group.rules[i].value;
          }

        }
      } else {
        if (group.rules[i].field == null) {
          this.sqlExpression += ")" + " " + group.condition + " ";
          this.userExpression += " " + group.condition + " ";
          int_Value_postion++;
          this.expressionM(group.rules[i], int_Value_postion);
        } else {
          if (i != group.rules.length - 1) {
            let valss = this.Attributes.findIndex(res => res.userColumnName === group.rules[i].field);
            let typ = this.Attributes[valss].colType;
            if (typ == 'number') {
              this.sqlExpression += " " + group.condition + " ";
              this.sqlExpression += "(" + group.rules[i].field + " " + ((group.rules[i].operator == 'Equals') ? '= ' + group.rules[i].value :
                (group.rules[i].operator == 'Does not Equal') ? '<> ' + group.rules[i].value :
                  (group.rules[i].operator == 'Starts With') ? 'LIKE %' + group.rules[i].value :
                    (group.rules[i].operator == 'Ends With') ? 'LIKE ' + group.rules[i].value + '%' :
                      (group.rules[i].operator == 'Contains') ? 'LIKE %' + group.rules[i].value + '%' :
                        (group.rules[i].operator == 'Does Not Contain') ? 'NOT LIKE %' + group.rules[i].value + '' :
                          (group.rules[i].operator == 'Does Not Start With') ? 'NOT LIKE ' + group.rules[i].value + '%' :
                            (group.rules[i].operator == 'Does Not End With') ? 'NOT LIKE %' + group.rules[i].value + '%' :
                              (group.rules[i].operator == 'Greater') ? '> ' + group.rules[i].value :
                                (group.rules[i].operator == 'Equal or Greater') ? '>= ' + group.rules[i].value :
                                  (group.rules[i].operator == 'Less') ? '< ' + group.rules[i].value :
                                    (group.rules[i].operator == 'Equal or Less') ? '<= ' + group.rules[i].value :
                                      (group.rules[i].operator == 'Within') ? 'BETWEEN ' + group.rules[i].value :
                                        (group.rules[i].operator == 'On or After') ? '>= ' + group.rules[i].value :
                                          (group.rules[i].operator == 'Before') ? '< ' + group.rules[i].value :
                                            (group.rules[i].operator == 'Between') ? 'BETWEEN ' + group.rules[i].value : group.rules[i].value) + ")";
              this.userExpression += " " + group.condition + " ";
              this.userExpression += group.rules[i].field + " " + group.rules[i].operator + " " + group.rules[i].value;
            } else {
              this.sqlExpression += " " + group.condition + " ";
              this.sqlExpression += "(" + group.rules[i].field + " " + ((group.rules[i].operator == 'Equals') ? "= '" + group.rules[i].value + "'" :
                (group.rules[i].operator == 'Does not Equal') ? "<> '" + group.rules[i].value + "'" :
                  (group.rules[i].operator == 'Starts With') ? "LIKE %'" + group.rules[i].value + "'" :
                    (group.rules[i].operator == 'Ends With') ? "LIKE '" + group.rules[i].value + "'%" :
                      (group.rules[i].operator == 'Contains') ? "LIKE %'" + group.rules[i].value + "'%" :
                        (group.rules[i].operator == 'Does Not Contain') ? "NOT LIKE %'" + group.rules[i].value + "'" :
                          (group.rules[i].operator == 'Does Not Start With') ? "NOT LIKE '" + group.rules[i].value + "'%" :
                            (group.rules[i].operator == 'Does Not End With') ? "NOT LIKE %'" + group.rules[i].value + "'%" :
                              (group.rules[i].operator == 'Greater') ? "> '" + group.rules[i].value + "'" :
                                (group.rules[i].operator == 'Equal or Greater') ? ">= '" + group.rules[i].value + "'" :
                                  (group.rules[i].operator == 'Less') ? "< '" + group.rules[i].value + "'" :
                                    (group.rules[i].operator == 'Equal or Less') ? "<= '" + group.rules[i].value + "'" :
                                      (group.rules[i].operator == 'Within') ? "BETWEEN '" + group.rules[i].value + "'" :
                                        (group.rules[i].operator == 'On or After') ? ">= '" + group.rules[i].value + "'" :
                                          (group.rules[i].operator == 'Before') ? "< '" + group.rules[i].value + "'" :
                                            (group.rules[i].operator == 'Between') ? "BETWEEN '" + group.rules[i].value + "'" : group.rules[i].value) + ")";
              this.userExpression += " " + group.condition + " ";
              this.userExpression += group.rules[i].field + " " + group.rules[i].operator + " " + group.rules[i].value;
            }

          } else {
            let valss = this.Attributes.findIndex(res => res.userColumnName === group.rules[i].field);
            let typ = this.Attributes[valss].colType;
            if (typ == 'number') {
              this.sqlExpression += " " + group.condition + " ";
              this.sqlExpression += "(" + group.rules[i].field + " " + ((group.rules[i].operator == 'Equals') ? '= ' + group.rules[i].value :
                (group.rules[i].operator == 'Does not Equal') ? '<> ' + group.rules[i].value :
                  (group.rules[i].operator == 'Starts With') ? 'LIKE %' + group.rules[i].value :
                    (group.rules[i].operator == 'Ends With') ? 'LIKE ' + group.rules[i].value + '%' :
                      (group.rules[i].operator == 'Contains') ? 'LIKE %' + group.rules[i].value + '%' :
                        (group.rules[i].operator == 'Does Not Contain') ? 'NOT LIKE %' + group.rules[i].value + '' :
                          (group.rules[i].operator == 'Does Not Start With') ? 'NOT LIKE ' + group.rules[i].value + '%' :
                            (group.rules[i].operator == 'Does Not End With') ? 'NOT LIKE %' + group.rules[i].value + '%' :
                              (group.rules[i].operator == 'Greater') ? '> ' + group.rules[i].value :
                                (group.rules[i].operator == 'Equal or Greater') ? '>= ' + group.rules[i].value :
                                  (group.rules[i].operator == 'Less') ? '< ' + group.rules[i].value :
                                    (group.rules[i].operator == 'Equal or Less') ? '<= ' + group.rules[i].value :
                                      (group.rules[i].operator == 'Within') ? 'BETWEEN ' + group.rules[i].value :
                                        (group.rules[i].operator == 'On or After') ? '>= ' + group.rules[i].value :
                                          (group.rules[i].operator == 'Before') ? '< ' + group.rules[i].value :
                                            (group.rules[i].operator == 'Between') ? 'BETWEEN ' + group.rules[i].value : group.rules[i].value) + ")";
              this.sqlExpression += ")";
              this.userExpression += " " + group.condition + " ";
              this.userExpression += group.rules[i].field + " " + group.rules[i].operator + " " + group.rules[i].value;
              this.userExpression += "";
            } else {
              this.sqlExpression += " " + group.condition + " ";
              this.sqlExpression += "(" + group.rules[i].field + " " + ((group.rules[i].operator == 'Equals') ? "= '" + group.rules[i].value + "'" :
                (group.rules[i].operator == 'Does not Equal') ? "<> '" + group.rules[i].value + "'" :
                  (group.rules[i].operator == 'Starts With') ? "LIKE %'" + group.rules[i].value + "'" :
                    (group.rules[i].operator == 'Ends With') ? "LIKE '" + group.rules[i].value + "'%" :
                      (group.rules[i].operator == 'Contains') ? "LIKE %'" + group.rules[i].value + "'%" :
                        (group.rules[i].operator == 'Does Not Contain') ? "NOT LIKE %'" + group.rules[i].value + "'" :
                          (group.rules[i].operator == 'Does Not Start With') ? "NOT LIKE '" + group.rules[i].value + "'%" :
                            (group.rules[i].operator == 'Does Not End With') ? "NOT LIKE %'" + group.rules[i].value + "'%" :
                              (group.rules[i].operator == 'Greater') ? "> '" + group.rules[i].value + "'" :
                                (group.rules[i].operator == 'Equal or Greater') ? ">= '" + group.rules[i].value + "'" :
                                  (group.rules[i].operator == 'Less') ? "< '" + group.rules[i].value + "'" :
                                    (group.rules[i].operator == 'Equal or Less') ? "<= '" + group.rules[i].value + "'" :
                                      (group.rules[i].operator == 'Within') ? "BETWEEN '" + group.rules[i].value + "'" :
                                        (group.rules[i].operator == 'On or After') ? ">= '" + group.rules[i].value + "'" :
                                          (group.rules[i].operator == 'Before') ? "< '" + group.rules[i].value + "'" :
                                            (group.rules[i].operator == 'Between') ? "BETWEEN '" + group.rules[i].value + "'" : group.rules[i].value) + ")";
              this.sqlExpression += ")";
              this.userExpression += " " + group.condition + " ";
              this.userExpression += group.rules[i].field + " " + group.rules[i].operator + " " + group.rules[i].value;
              this.userExpression += "";
            }
          }
        }
      }}
    }
    let re = /undefined/gi;
    let newstrUser = this.userExpression.replace(re, "");
    let newstrSql = this.sqlExpression.replace(re, "");
    this.userExpression = newstrUser;
    this.sqlExpression = newstrSql;
    console.log('user ' + this.userExpression)
    console.log('SQL ' + this.sqlExpression)
    var length = this.owner_list.length;
    this.owner_list.forEach((single_owner) => {
      var owner_obj = {};
      (<any>owner_obj).agentId = single_owner.agentId;
      (<any>owner_obj).agentName = single_owner.agentName;
      (<any>owner_obj).endDate = single_owner.endDate;
      (<any>owner_obj).splitPercent = 100 / length;
      (<any>owner_obj).startDate = single_owner.startDate;
      (<any>owner_obj).territoryId = single_owner.territoryId;
      (<any>owner_obj).territoryName = single_owner.territoryName;
      (<any>owner_obj).ruleHeaderId = 0;
      this.owner_header.push(owner_obj);
      (<any>single_owner).splitPercent = 100 / length;
      // console.log("the onwer ", single_owner);
    });
  }

  onSaveRule() {
    var uiExpression = JSON.stringify(this.uiExpression);
    if (this.startDate === null) {
      this.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    }
    if (this.endDate === null) {
      this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    }
    // var userExpression=JSON.stringify(this.userExpression);
    let Rule = {
      "linenScExpressions": [
        {
          "endDate": this.endDate,
          "expressionText": uiExpression,
          "sqlExpression": this.sqlExpression,
          "startDate": this.startDate,
          "uiExpression": uiExpression,
          "userExpression": this.userExpression
        }
      ],
      "linenScRuleHeader": {
        "endDate": this.endDate,
        "obsoleteFlag": "N",
        "profileDetailId": 0,
        "ruleCategory": this.CategoryValue,
        "ruleName": this.RuleName,
        "startDate": this.startDate
      },

      "linenScRuleOwnerDetails": this.owner_header
    };
    // console.log("teh rule is", Rule);
    this.salesCreditService.createRule(Rule).subscribe((response) => {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'The Rule was created successfully' });
      this.RuleName = '';
      this.CategoryValue = null;
      this.Start_Date = new Date();
      this.End_Date = new Date();
      this.userExpression = '';
      this.sqlExpression = '';
      this.uiExpression = {};
      /* condition: 'and',
       rules: [
         { field: "Transaction Type", operator: "=" },
         { field: "Transaction Source", operator: "!=" }
       ]
     };*/
      this.RuleOwnerValue = 'Select Rule Owner Name';
      this.TerritoryValue = 'Select Territory Name';
      this.stepper.reset()
    }, error => {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'The Rule could not be created' });
    });

  }

  nextStepThree(){
    if(this.owner_list.length == 0){
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Select atleast one agent' });
    } else {
      this.stepper.next()
   }
  }

  splitCheck(single_owner,splitter){
  console.log(single_owner.territoryId);
  console.log(splitter+"click firing");
  }
  splitChecks(splitter){
    console.log(splitter+"key up firing");
  }
  onSelect(rule_owner, event, index) {
    console.log("the rule owner is", rule_owner);
    console.log("the event is", event);
    if (event.target.checked) {
      rule_owner.selected = true;
      this.owner_list.push(rule_owner);
    } else {
      this.owner_list.splice(index, 1);
    }
    this.split = 100/(this.owner_list.length)
  }

  changeFields(event, rule) {
    let val = this.Attributes.findIndex(res => res.userColumnName === rule.field);
    var field = rule.field;
    if (this.Attributes[val].isListType == 'Y') {
      console.log('It is a list of values');
      let options = [
        { name: "Male", value: "m" },
        { name: "Female", value: "f" }
      ];
      console.log('existing config ', JSON.stringify(this.config.fields));
      this.config.fields[field].options = options;
      // this.salesCreditService.fetchAllList().subscribe(
      //   res => {
      //     console.log('res ', res);
      //   },
      //   error => {
      //     this.msgs = [];
      //     this.msgs.push({ severity: 'error', summary: 'Error fetching Attributes' });
      //   }
      // )
    } else if (this.Attributes[val].isListType == 'N') {
      console.log('It is not a list of values');
    }
  }

  ngDoCheck() {
    // console.log('ngDoCheck')
    this.detect.detectChanges()
  }

  getDate(event, rule) {
    console.log('rule date changes ', rule, 'event ', event);
    this.uiFormatExpression = this.uiExpression;
    this.findAttr(this.uiFormatExpression, this.findAttrPos, rule)
  }

  ngAfterViewInit() {
    this.formConfig()
  }

  ngOnChanges() {
    this.formConfig()
  }
}
