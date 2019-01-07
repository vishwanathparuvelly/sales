import { Component, Input, SimpleChanges, ChangeDetectorRef, DoCheck, ChangeDetectionStrategy, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, OnChanges } from "@angular/core";

import { QueryBuilderConfig, QueryBuilderClassNames, QueryBuilderComponent } from "angular2-query-builder";
import { SalesCreditService } from "./salesCredit.service";
import { FormBuilder, FormControl } from "@angular/forms";

@Component({
    selector: 'child',
    templateUrl: './child.component.html'
})

export class ChildComponent extends QueryBuilderComponent implements DoCheck, OnChanges {
    isMultiple: boolean = false;
    msgs: any[] = [];
    AttributeDummy: any[] = [
        {
            "userColumnName": "Attribute1",
            "colType": "category",
            "isListType": "Y",
            "userColumnOptions": [
                { name: 'ERP', value: 'erp' },
                { name: 'Automation', value: 'automation' }
            ]
        },
        {
            "userColumnName": "Attribute2",
            "colType": "date",
            "isListType": "N",
            "userColumnOptions": []
        },
        {
            "userColumnName": "Attribute3",
            "colType": "string",
            "isListType": "N",
            "userColumnOptions": []
        },
        {
            "userColumnName": "Attribute4",
            "colType": "number",
            "isListType": "N",
            "userColumnOptions": []
        }
    ]
    int_Value_postion: number = 0;
    sqlExpression: String = 'Attribute = undefined';
    public queryCtrl: FormControl;
    public uiExpression = {
        condition: 'and',
        rules: [
            {
                field: "Attribute1",
                operator: "Equals"
            }
        ]
    };

    fieldsS = {}
    public config: QueryBuilderConfig = {
        fields: {
            Attribute1: {
                name: "Attribute1",
                type: "category",
                operators: ["Equals", "Does not Equal", "Starts With", "Ends With", "Contains", "Does Not Contain", "Does Not Start With", "Does Not End With"],
                options: [
                    { name: 'ERP', value: 'erp' },
                    { name: 'Automation', value: 'automation' }
                ]
            },
            Attribute2: {
                name: "Attribute2",
                type: "date",
                operators: ["On or After", "Equals", "Before", "Between"],
                options: []
            },
            Attribute3: {
                name: "Attribute3",
                type: "string",
                operators: ["Equals", "Does not Equal", "Starts With", "Ends With", "Contains", "Does Not Contain", "Does Not Start With", "Does Not End With"],
                options: []
            },
            Attribute4: {
                name: "Attribute4",
                type: "number",
                operators: ["Greater", "Equals", "Does not Equal", "Equal or Greater", "Less", "Equal or Less", "Within"],
                options: []
            }
        }
    }
    public currentConfig: QueryBuilderConfig;
    public allowRuleset: boolean = true;
    public allowCollapse: boolean = false;
    operators: any[] = [];
    findAttrPos: number = 0;
    userExpression: String = 'Attribute = undefined';
    owner_list: any[] = [];
    owner_header: any[] = [];
    constructor(private salesCreditService: SalesCreditService, public detect: ChangeDetectorRef, private formBuilder: FormBuilder) {
        super(detect);
        this.queryCtrl = this.formBuilder.control(this.uiExpression);
        this.currentConfig = this.config;
        // var objStr = {
        //     attributeType: "STRING",
        //     operators: []
        // }
        // var objNum = {
        //     attributeType: "number",
        //     operators: []
        // }
        // var objDate = {
        //     attributeType: "Date",
        //     operators: []
        // }
        // var objCategory = {
        //     attributeType: "category",
        //     operators: []
        // }
        // for (var j = 0; j < this.salesCreditService.operators.length; j++) {
        //     if (this.salesCreditService.operators[j].attributeType == 'STRING') {
        //         for (let num of this.salesCreditService.operators[j].operators) {
        //             objStr.operators.push(num.displayOperator)
        //             this.operators.push(objStr)
        //         }
        //     } else if (this.salesCreditService.operators[j].attributeType == 'number') {
        //         for (let num of this.salesCreditService.operators[j].operators) {
        //             objNum.operators.push(num.displayOperator)
        //             this.operators.push(objNum)
        //         }
        //     } else if (this.salesCreditService.operators[j].attributeType == 'Date') {
        //         for (let num of this.salesCreditService.operators[j].operators) {
        //             objDate.operators.push(num.displayOperator)
        //             this.operators.push(objDate)
        //         }
        //     } else if (this.salesCreditService.operators[j].attributeType == 'category') {
        //         for (let num of this.salesCreditService.operators[j].operators) {
        //             objCategory.operators.push(num.displayOperator)
        //             this.operators.push(objCategory)
        //         }
        //     }
        // }
        // this.operators = this.operators.filter((value, index, array) =>
        //     !array.filter((v, i) => this.isEqual(value, v) && i < index).length);
        // console.log('operators list ' + JSON.stringify(this.operators));
        // for (var i = 0; i < this.AttributeDummy.length; i++) {
        //     var stat = this.AttributeDummy[i].colType;
        //     console.log(stat);
        //     switch (stat) {
        //         case 'string': {
        //             this.fieldsS[this.AttributeDummy[i].userColumnName] = {
        //                 name: this.AttributeDummy[i].userColumnName,
        //                 type: this.AttributeDummy[i].colType.toLowerCase(),
        //                 operators: this.operators[0].operators,
        //                 options: []
        //             }
        //             this.config.fields = this.fieldsS;
        //             break;
        //         }
        //         case 'number': {
        //             this.fieldsS[this.AttributeDummy[i].userColumnName] = {
        //                 name: this.AttributeDummy[i].userColumnName,
        //                 type: this.AttributeDummy[i].colType.toLowerCase(),
        //                 operators: this.operators[1].operators,
        //                 options: []
        //             }
        //             this.config.fields = this.fieldsS;
        //             break;
        //         }
        //         case 'date': {
        //             this.fieldsS[this.AttributeDummy[i].userColumnName] = {
        //                 name: this.AttributeDummy[i].userColumnName,
        //                 type: this.AttributeDummy[i].colType.toLowerCase(),
        //                 operators: this.operators[2].operators,
        //                 options: []
        //             }
        //             this.config.fields = this.fieldsS;
        //             break;
        //         }
        //         case 'category': {
        //             this.fieldsS[this.AttributeDummy[i].userColumnName] = {
        //                 name: this.AttributeDummy[i].userColumnName,
        //                 type: this.AttributeDummy[i].colType.toLowerCase(),
        //                 operators: this.operators[0].operators,
        //                 options: this.AttributeDummy[i].userColumnOptions
        //             }
        //             this.config.fields = this.fieldsS;
        //             break;
        //         }
        //     }
        console.log('config ', JSON.stringify(this.config))
        // }
        if (this.AttributeDummy.length > 0) {
            // this.uiExpression = {
            //     condition: 'and',
            //     rules: []
            // }
            // [
            //   {
            //     field: this.AttributeDummy[0].userColumnName,
            //     operator: this.config.fields.operators
            //   }
            // ]
            console.log('uiExpression in constructor ' + JSON.stringify(this.uiExpression));
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

    changeOperators(rule) {
        console.log("the rule is", rule);
        // if (rule.operator == "contains") {
        //   this.findAttr(this.uiExpression, this.findAttrPos, rule)
        // }
    }

    apply() {
        this.int_Value_postion = 0;
        let numb: any[] = [];
        // console.log('before pushing ' + JSON.stringify(this.uiExpression));
        numb.push(this.uiExpression)
        if (this.AttributeDummy.length > 0) {
            this.expressionM(this.uiExpression, this.int_Value_postion);
        } else if (this.AttributeDummy.length == 0) {
            console.log('not length');
        }
    }

    expressionM(group, int_Value_postion) {
        // console.log('this.AttributeDummy ' + JSON.stringify(this.AttributeDummy));
        for (var i = 0; i <= (group.rules.length - 1); i++) {
            if (i == 0) {
                if (int_Value_postion == 0) {
                    this.sqlExpression = "((" + group.rules[i].field + " " + ((group.rules[i].operator == 'Equals') ? '=' + group.rules[i].value :
                        (group.rules[i].operator == 'Does not Equal') ? '<>' + group.rules[i].value :
                            (group.rules[i].operator == 'Starts With') ? 'LIKE %' + group.rules[i].value :
                                (group.rules[i].operator == 'Ends With') ? 'LIKE ' + group.rules[i].value + '%' :
                                    (group.rules[i].operator == 'Contains') ? 'LIKE %' + group.rules[i].value + '%' :
                                        (group.rules[i].operator == 'Does Not Contain') ? 'NOT LIKE %' + group.rules[i].value + '' :
                                            (group.rules[i].operator == 'Does Not Start With') ? 'NOT LIKE ' + group.rules[i].value + '%' :
                                                (group.rules[i].operator == 'Does Not End With') ? 'NOT LIKE %' + group.rules[i].value + '%' :
                                                    (group.rules[i].operator == 'Greater') ? '>' + group.rules[i].value :
                                                        (group.rules[i].operator == 'Equal or Greater') ? '>=' + group.rules[i].value :
                                                            (group.rules[i].operator == 'Less') ? '<' + group.rules[i].value :
                                                                (group.rules[i].operator == 'Equal or Less') ? '<=' + group.rules[i].value :
                                                                    (group.rules[i].operator == 'Within') ? 'BETWEEN ' + group.rules[i].value :
                                                                        (group.rules[i].operator == 'On or After') ? '>=' + group.rules[i].value :
                                                                            (group.rules[i].operator == 'Before') ? '<' + group.rules[i].value :
                                                                                (group.rules[i].operator == 'Between') ? 'BETWEEN ' + group.rules[i].value : group.rules[i].value) + ")";
                    this.userExpression = group.rules[i].field + " " + group.rules[i].operator + " " + group.rules[i].value;
                } else {
                    this.sqlExpression += "((" + group.rules[i].field + " " + ((group.rules[i].operator == 'Equals') ? '=' + group.rules[i].value :
                        (group.rules[i].operator == 'Does not Equal') ? '<>' + group.rules[i].value :
                            (group.rules[i].operator == 'Starts With') ? 'LIKE %' + group.rules[i].value :
                                (group.rules[i].operator == 'Ends With') ? 'LIKE ' + group.rules[i].value + '%' :
                                    (group.rules[i].operator == 'Contains') ? 'LIKE %' + group.rules[i].value + '%' :
                                        (group.rules[i].operator == 'Does Not Contain') ? 'NOT LIKE %' + group.rules[i].value :
                                            (group.rules[i].operator == 'Does Not Start With') ? 'NOT LIKE ' + group.rules[i].value + '%' :
                                                (group.rules[i].operator == 'Does Not End With') ? 'NOT LIKE %' + group.rules[i].value + '%' :
                                                    (group.rules[i].operator == 'Greater') ? '>' + group.rules[i].value :
                                                        (group.rules[i].operator == 'Equal or Greater') ? '>=' + group.rules[i].value :
                                                            (group.rules[i].operator == 'Less') ? '<' + group.rules[i].value :
                                                                (group.rules[i].operator == 'Equal or Less') ? '<=' + group.rules[i].value :
                                                                    (group.rules[i].operator == 'Within') ? 'BETWEEN ' + group.rules[i].value :
                                                                        (group.rules[i].operator == 'On or After') ? '>=' + group.rules[i].value :
                                                                            (group.rules[i].operator == 'Before') ? '<' + group.rules[i].value :
                                                                                (group.rules[i].operator == 'Between') ? 'BETWEEN ' + group.rules[i].value : group.rules[i].value) + ")";
                    this.userExpression += group.rules[i].field + " " + group.rules[i].operator + " " + group.rules[i].value;
                }
            } else {
                if (group.rules[i].field == null) {
                    this.sqlExpression += ")" + " " + group.condition + " ";
                    this.userExpression += " " + group.condition + " ";
                    int_Value_postion++;
                    this.expressionM(group.rules[i], int_Value_postion);
                } else {
                    if (i != group.rules.length - 1) {
                        this.sqlExpression += " " + group.condition + " ";
                        this.sqlExpression += "(" + group.rules[i].field + " " + ((group.rules[i].operator == 'Equals') ? '=' + group.rules[i].value :
                            (group.rules[i].operator == 'Does not Equal') ? '<>' + group.rules[i].value :
                                (group.rules[i].operator == 'Starts With') ? 'LIKE %' + group.rules[i].value :
                                    (group.rules[i].operator == 'Ends With') ? 'LIKE ' + group.rules[i].value + '%' :
                                        (group.rules[i].operator == 'Contains') ? 'LIKE %' + group.rules[i].value + '%' :
                                            (group.rules[i].operator == 'Does Not Contain') ? 'NOT LIKE %' + group.rules[i].value :
                                                (group.rules[i].operator == 'Does Not Start With') ? 'NOT LIKE ' + group.rules[i].value + '%' :
                                                    (group.rules[i].operator == 'Does Not End With') ? 'NOT LIKE %' + group.rules[i].value + '%' :
                                                        (group.rules[i].operator == 'Greater') ? '>' + group.rules[i].value :
                                                            (group.rules[i].operator == 'Equal or Greater') ? '>=' + group.rules[i].value :
                                                                (group.rules[i].operator == 'Less') ? '<' + group.rules[i].value :
                                                                    (group.rules[i].operator == 'Equal or Less') ? '<=' + group.rules[i].value :
                                                                        (group.rules[i].operator == 'Within') ? 'BETWEEN ' + group.rules[i].value :
                                                                            (group.rules[i].operator == 'On or After') ? '>=' + group.rules[i].value :
                                                                                (group.rules[i].operator == 'Before') ? '<' + group.rules[i].value :
                                                                                    (group.rules[i].operator == 'Between') ? 'BETWEEN ' + group.rules[i].value : group.rules[i].value) + ")";
                        this.userExpression += " " + group.condition + " ";
                        this.userExpression += group.rules[i].field + " " + group.rules[i].operator + " " + group.rules[i].value;
                    } else {
                        this.sqlExpression += " " + group.condition + " ";
                        this.sqlExpression += "(" + group.rules[i].field + " " + ((group.rules[i].operator == 'Equals') ? '=' + group.rules[i].value :
                            (group.rules[i].operator == 'Does not Equal') ? '<>' + group.rules[i].value :
                                (group.rules[i].operator == 'Starts With') ? 'LIKE %' + group.rules[i].value :
                                    (group.rules[i].operator == 'Ends With') ? 'LIKE ' + group.rules[i].value + '%' :
                                        (group.rules[i].operator == 'Contains') ? 'LIKE %' + group.rules[i].value + '%' :
                                            (group.rules[i].operator == 'Does Not Contain') ? 'NOT LIKE %' + group.rules[i].value :
                                                (group.rules[i].operator == 'Does Not Start With') ? 'NOT LIKE ' + group.rules[i].value + '%' :
                                                    (group.rules[i].operator == 'Does Not End With') ? 'NOT LIKE %' + group.rules[i].value + '%' :
                                                        (group.rules[i].operator == 'Greater') ? '>' + group.rules[i].value :
                                                            (group.rules[i].operator == 'Equal or Greater') ? '>=' + group.rules[i].value :
                                                                (group.rules[i].operator == 'Less') ? '<' + group.rules[i].value :
                                                                    (group.rules[i].operator == 'Equal or Less') ? '<=' + group.rules[i].value :
                                                                        (group.rules[i].operator == 'Within') ? 'BETWEEN ' + group.rules[i].value :
                                                                            (group.rules[i].operator == 'On or After') ? '>=' + group.rules[i].value :
                                                                                (group.rules[i].operator == 'Before') ? '<' + group.rules[i].value :
                                                                                    (group.rules[i].operator == 'Between') ? 'BETWEEN ' + group.rules[i].value : group.rules[i].value) + ")";
                        this.sqlExpression += ")";
                        this.userExpression += " " + group.condition + " ";
                        this.userExpression += group.rules[i].field + " " + group.rules[i].operator + " " + group.rules[i].value;
                        this.userExpression += "";
                    }
                }
            }
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

    changeFields(event, rule) {
        let val = this.AttributeDummy.findIndex(res => res.userColumnName === rule.field);
        var field = rule.field;
        if (this.AttributeDummy[val].isListType == 'Y') {
            console.log('It is a list of values');
            let options = [
                { name: "Male", value: "m" },
                { name: "Female", value: "f" }
            ];
            console.log('existing config ', JSON.stringify(this.config.fields));
            this.config.fields[field].options = options;
        } else if (this.AttributeDummy[val].isListType == 'N') {
            console.log('It is not a list of values');
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        this.apply()
        // this.detect.markForCheck();
        console.log('Changes ', JSON.stringify(changes));
    }

    ngDoCheck() {
        console.log('ngDoCheck')
        this.detect.detectChanges()
    }

    // ngAfterViewInit() {
    //     console.log('ngAfterViewInit')
    //     // this.detect.detectChanges()
    // }

    // ngAfterViewChecked() {
    //     console.log('ngAfterViewChecked')
    //     // this.detect.detectChanges()
    // }

    // ngAfterContentInit() {
    //     console.log('ngAfterContentInit')
    //     // this.detect.detectChanges()
    // }

    // ngAfterContentChecked() {
    //     console.log('ngAfterContentChecked')
    //     // this.detect.detectChanges()
    // }
}