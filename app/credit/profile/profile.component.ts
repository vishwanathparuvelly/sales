
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { QueryBuilderConfig } from "angular2-query-builder";
import { Message } from 'primeng/components/common/api';

import { SalesCreditService } from '../../salesCredit.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [SalesCreditService]
})
export class ProfileComponent implements OnInit {

  minInEndDate: Date;
  CategoryPriorityForm: FormGroup;
  categoryList: any[] = [
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
  add_values: boolean = false;
  firstStepForm: FormGroup;
  secondStepForm: FormGroup;
  End_Date: Date = new Date();
  Start_Date: Date = new Date();
  startDate: String = null;
  endDate: String = null;
  msgs: any[] = [];
  Attributes: any[] = [
    {
      "attribMapId": 0,
      "colType": "string",
      "createdBy": "string",
      "createdDate": "2018-11-28T06:02:46.878Z",
      "isListType": "Y",
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
      "attribMapId": 0,
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
      "attribMapId": 0,
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
  p2: Number = 1;
  salesActiveLinkValue: String = "create";
  public currentConfig: QueryBuilderConfig;
  @ViewChild('stepper') stepper;
  finalQue: string;
  Priority: number = 1;
  CategoryName: string = 'Select Category';
  sqlExpression: String = 'Attribute = undefined';
  findAttrPos: number = 0;
  uiExpression = {};
  uiFormatExpression = {};
  userExpression: String = 'Attribute = undefined';
  int_Value_postion: number = 0;
  ProfileName: string = ''
  fieldsS = {};
  config: QueryBuilderConfig = {
    fields: {}
  }
  operators: any[] = [];
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
  minDateValue;
  height: number;
  @Output() componentName: string;
  constructor(private route: ActivatedRoute,private datePipe: DatePipe, private salesCreditService: SalesCreditService, private _formBuilder: FormBuilder, public snackBar: MatSnackBar, private router: Router) {
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    this.minDateValue = tomorrow;
    this.End_Date = this.minDateValue;
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

    let url = this.route.snapshot.routeConfig.component.name;
    this.componentName = url;
    localStorage.setItem('path',url)
    console.log('url ', url);

    // this.salesCreditService.operatorsJSON().subscribe(
    //   res => {
    //     this.allOperator = res["operators"];
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
      console.log('operatrors list before ', JSON.stringify(this.operators));
      this.operators = this.operators.filter((value, index, array) =>
        !array.filter((v, i) => this.isEqual(value, v) && i < index).length);
      console.log('operatrors list after ', JSON.stringify(this.operators));
      for (var i = 0; i < this.Attributes.length; i++) {
        var stat = this.Attributes[i].colType;
        console.log('stat ', stat);
        switch (this.Attributes[i].colType) {
          case 'string': {
            if (this.Attributes[i].isListType == 'Y') {
              this.fieldsS[this.Attributes[i].userColumnName] = {
                name: this.Attributes[i].userColumnName,
                type: 'category',
                operators: this.operators[0].operators,
                options: [
                  { name: 'ERP', value: 'erp' }
                ]
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
                options: [
                  { name: 'Automation', value: 'automation' }
                ]
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
                options: [
                  { name: 'Business', value: 'business' }
                ]
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
      console.log('config printing ', this.config);
      this.currentConfig = this.config;
    }


this.height = window.innerHeight;
    //   },
    //   error => {
    //     console.log('error ', error);
    //   }
    // )
    if (this.Attributes.length > 0) {
      this.uiExpression = {
        condition: 'and',
        rules: []
      }
    }

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
    // this.CustomerName = localStorage.getItem('CustomerName');
    this.CategoryPriorityForm = this._formBuilder.group({
      CatePriorData: this._formBuilder.array([this.addCatPrior()])
    });

    // this.getAttributeList();
    this.getDefinedCategory();
  }

  nextToSecond() {
    console.log('ProfileName '+this.ProfileName);
    console.log('Start_Date '+this.Start_Date,' ',this.startDate);
    console.log('End_Date '+this.End_Date,' ',this.endDate);
    if(this.ProfileName == '' || this.ProfileName == null) {
      console.log("profile empty");
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Profile Name is required' });
    } else {
      this.stepper.next()
    }
  }

  getDefinedCategory() {
    this.salesCreditService.getAllCategory().subscribe((response) => {
      console.log("response from getAllCatgeory", response);
      // this.categoryList = response["content"];
    });
  }

  getAttributeList() {
    console.log("in getAttributeList");
    this.salesCreditService.getAllAttribute().subscribe(responseValues => {
      console.log("the responseValues", responseValues);
      // this.Attributes = responseValues;
    }, error => {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error fetching Attributes' });
    });
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

  addCatPrior() {
    let CatGroup = this._formBuilder.group({
      ruleCategory: ['Select Category'],
      priority: [''],
      start_Date: [''],
      end_Date: ['']
    });
    return CatGroup;
  }

  addBut() {
    const control: FormArray = this.CategoryPriorityForm.get(`CatePriorData`) as FormArray;
    control.push(this.addCatPrior());
  }

  formCatData(CategoryPriorityForm) {
    return CategoryPriorityForm.get('CatePriorData').controls;
  }

  removeCatData(index: number) {
    const control: FormArray = this.CategoryPriorityForm.get(`CatePriorData`) as FormArray;
    control.removeAt(index);
  }

  apply() {
    this.int_Value_postion = 0;
    let numb: any[] = [];
    // console.log('before pushing ' + JSON.stringify(this.uiExpression));
    this.uiFormatExpression = this.uiExpression
    numb.push(this.uiExpression)
    if (this.Attributes.length > 0) {
      if(!this.uiExpression) {
        console.log('empty');
        this.userExpression = '';
      }
      this.expressionM(this.uiExpression, this.int_Value_postion);
    } else if (this.Attributes.length == 0) {
      console.log('not length');
    }
    
  }

  expressionM(group, int_Value_postion) {
    // console.log('this.AttributeDummy ' + JSON.stringify(this.AttributeDummy));
    for (var i = 0; i <= (group.rules.length - 1); i++) {
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
      }
    }
    let re = /undefined/gi;
    let newstrUser = this.userExpression.replace(re, "");
    let newstrSql = this.sqlExpression.replace(re, "");
    this.userExpression = newstrUser;
    this.sqlExpression = newstrSql;
  }

  onSaveProfile() {
    var uiExpression = JSON.stringify(this.uiExpression);

    this.CategoryPriorityForm.value.CatePriorData.forEach((category) => {
      console.log("the catgeory", category);
      (<any>category).endDate = this.datePipe.transform(category.end_Date, 'yyyy-MM-dd');
      (<any>category).startDate = this.datePipe.transform(category.start_Date, 'yyyy-MM-dd');
    });
    let Profile = {
      "linenScExpressions": [
        {
          "endDate": this.datePipe.transform(this.End_Date, 'yyyy-MM-dd'),
          "expressionText": "",
          "sqlExpression": this.sqlExpression,
          "startDate": this.datePipe.transform(this.Start_Date, 'yyyy-MM-dd'),
          "uiExpression": uiExpression,
          "userExpression": this.userExpression
        }
      ],
      "linenScProfileDetail": this.CategoryPriorityForm.value.CatePriorData,
      "linenScProfileHeader": {
        "endDate": this.datePipe.transform(this.End_Date, 'yyyy-MM-dd'),
        "obsoleteFlag": "N",
        "profileName": this.ProfileName,
        "startDate": this.datePipe.transform(this.Start_Date, 'yyyy-MM-dd')
      }
    }
    console.log('profile object ', Profile);
    this.salesCreditService.createProfile(Profile).subscribe((response) => {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'The Profile was created successfully' });
      this.CategoryPriorityForm.reset()
      this.Start_Date = new Date();
      this.End_Date = new Date();
      this.userExpression = '';
      this.sqlExpression = '';
      this.uiExpression = {};
      /*  condition: 'and',
        rules: [
          { field: "Transaction Type", operator: "=" },
          { field: "Transaction Source", operator: "!=" }
        ]
      };*/
      this.CategoryName = 'Select Category';
      this.Priority = 1;
      this.stepper.reset()
    }, error => {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'The Profile could not be created' });
    });
  }

  onChagneCategory(value: string, event) {
    this.CategoryName = value;
  }

  addAttr() {
    let ExpressionGroup = this._formBuilder.group({
      Expression: [''],
      // AttributeArr: this._formBuilder.array(this.AttributesLoad),
      ExpressionType: ['Select Expression'],
      AttributeType: ['Select Attribute'],
      Condition: [''],
      secound_Condition: [''],
      ListArrayValues: new FormControl(),
      ExpressionNEqual: ['']
    });

    return ExpressionGroup;
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

  selectedEndDate(End_Date,Start_Date) {
      this.endDate = this.datePipe.transform(End_Date, 'yyyy-MM-dd');
  }

  formData(dropdownsList) {
    return dropdownsList.get('ExpressionArray').controls;
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

  getDate(event, rule) {
    console.log('rule date changes ', rule, 'event ', event);
    this.uiFormatExpression = this.uiExpression;
    this.findAttr(this.uiFormatExpression, this.findAttrPos, rule)
  }
}
