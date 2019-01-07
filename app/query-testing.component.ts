import { Component, OnInit, AfterContentInit } from "@angular/core";

import { QueryBuilderConfig, QueryBuilderComponent } from "angular2-query-builder";

@Component({
    selector: 'app-query-testing',
    templateUrl: './query-testing.component.html'
})

export class QueryTestingComponent implements OnInit, AfterContentInit {
    Attributes: any[] = [
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
            "userColumnName": "Attribute3"
        }
    ];
    public currentConfig: QueryBuilderConfig;
    fieldsS = {};
    config: QueryBuilderConfig = {
        fields: {
            age: { name: 'Age', type: 'number' },
            gender: {
                name: 'Gender',
                type: 'category',
                options: [
                    { name: 'Male', value: 'm' },
                    { name: 'Female', value: 'f' }
                ]
            }
        }
    }
    uiExpression = {};
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

    constructor() {
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

            console.log('updated config ', JSON.stringify(this.config));
            this.currentConfig = this.config;
        }
        this.uiExpression = {
            condition: 'and',
            rules: []
        }
    }

    ngOnInit() { }

    isEqual(a, b) {
        for (var i in a)
            if (a[i] != b[i])
                return false;
        for (var i in b)
            if (b[i] != a[i])
                return false;
        return true;
    }

    apply() {
        console.log('apply calling');
    }

    ngAfterContentInit() {
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
    }

    changeFields(event, rule) {
        let val = this.Attributes.findIndex(res => res.userColumnName === rule.field);
        var field = rule.field;
        if (this.Attributes[val].isListType == 'Y') {
          console.log('It is a list of values');
          /*let options = [
            { name: "Male", value: "m" },
            { name: "Female", value: "f" }
          ];
          console.log('existing config ', JSON.stringify(this.config.fields));*/
    
        //   this.salesCreditService.fetchAllList(this.Attributes[val].userColumnName).subscribe(
        //     res => {
        //       console.log('res ', res);
        //       let options = res;
        //       this.config.fields[field].options = options;
        //     },
        //     error => {
        //       this.msgs = [];
        //       this.msgs.push({ severity: 'error', summary: 'Error fetching Attributes' });
        //     }
        //   );
        } else if (this.Attributes[val].isListType == 'N') {
          console.log('It is not a list of values');
        }
      }
}