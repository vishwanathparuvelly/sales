
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesCreditService } from './salesCredit.service';
import { Message } from 'primeng/components/common/api';
@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  providers: [SalesCreditService]
})
export class AttributesComponent implements OnInit, DoCheck {
  edit: Boolean = false;
  attributeDataType: String = null;
  attributeName: String = null;
  attributeValueType: String = null;
  attributeObj: any = {
    "linenAttributeMap": {
      "colType": "",
      "isMapped": "",
      "linenAttribute": {
        "applicableModules": "",
        "colName": "",
        "colType": "",
        "fixedAttribute": "",
        "userColumnName": ""
      },
      "userColumnName": ""
    },
    "linenAttributeMapValue": []
  };
  attribute_lov: any[] = [];
  msgs: Message[] = [];
  Technical_Skills = [];
  techValue: string;
  p: number = 1;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  Count: number;
  skip: number = 0;
  limit: number = 5;
  @ViewChild('stepper') stepper;
  AttributesList: any[] = [
    {
      "attribMapId": 1,
      "colType": "string",
      "createdBy": "string",
      "createdDate": "2018-12-19T06:21:43.485Z",
      "isListType": "Y",
      "isMapped": "string",
      "lastModifiedBy": "string",
      "lastModifiedDate": "2018-12-19T06:21:43.485Z",
      "linenAttribute": {
        "applicableModules": "string",
        "colName": "string",
        "colType": "string",
        "createdBy": "string",
        "createdDate": "2018-12-19T06:21:43.485Z",
        "fixedAttribute": "string",
        "lastModifiedBy": "string",
        "lastModifiedDate": "2018-12-19T06:21:43.485Z",
        "userColumnName": "string"
      },
      "userColumnName": "Transaction Type",
      "selected": false
    },
    {
      "attribMapId": 2,
      "colType": "string",
      "createdBy": "string",
      "createdDate": "2018-12-19T06:21:43.485Z",
      "isListType": "N",
      "isMapped": "string",
      "lastModifiedBy": "string",
      "lastModifiedDate": "2018-12-19T06:21:43.485Z",
      "linenAttribute": {
        "applicableModules": "string",
        "colName": "string",
        "colType": "string",
        "createdBy": "string",
        "createdDate": "2018-12-19T06:21:43.485Z",
        "fixedAttribute": "string",
        "lastModifiedBy": "string",
        "lastModifiedDate": "2018-12-19T06:21:43.485Z",
        "userColumnName": "string"
      },
      "userColumnName": "Country Code",
      "selected": false
    }
  ];
  latestVar: any;
  selectedAttribute: any;
  value_list: any[] = [];
  description: String = null;
  isListType;
  showEditOption;
  inputType;
  caseItems = [
    { value: 'STRING', viewValue: 'String' },
    { value: 'NUMBER', viewValue: 'Number' },
    { value: 'DATE', viewValue: 'Date' }

  ];

  Attribute_values_array = [
    { value: '1', view_Value: 'Freeform text' },
    { value: '2', view_Value: 'List of values' },
  ]
  selectedValue = 'String';
  values: boolean = false;
  ValuesA: any[] = [];
  TypeData: string;
  Type: string;
  attrSelected: number = -1;
  newValue: string = '';
  AttributeFind(value) {
    this.selectedValue = value;
    if (this.selectedValue == 'Freeform text') {
      this.attribute_lov = [];
      this.secondFormGroup.value.ListValues = [];
    }
  }

  AttributeVulue: any;
  Attribute_type_data_value: any;
  AttributeName: any;
  AttributeType: any;
  Attribute_Object: any = new Object;
  Attributr_array: any[] = [];
  Freeformtext: any;
  Attribute_typevalues: any;
  attributeDetail: any;

  constructor(private _formBuilder: FormBuilder, private salesCreditService: SalesCreditService, private detect: ChangeDetectorRef) { }

  ngOnInit() {
    this.Count = this.AttributesList.length;
    this.Attributr_array = JSON.parse((localStorage.getItem('Attributr_array') != null) ? localStorage.getItem('Attributr_array') : JSON.stringify([]));
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      Attribute_Name: ['', Validators.required],
      Attribute_type: ['', Validators.required],
      Attribute_type_values: ['', Validators.required],
      // Freeform_text: ['', Validators.required],
      attributelov: [''],
      ListValues: this._formBuilder.array([]),
      Attr_Description: ['']
    });
    this.Count = this.AttributesList.length;
    console.log('Attributes ', JSON.stringify(this.AttributesList));
    // this.getAttributeList();
  }

  goto_next() {
    this.attribute_lov = [];
    this.secondFormGroup.value.Attribute_type = 'Select Attribute Data Type';
    this.secondFormGroup.value.Attribute_type_values = 'Select Attribute Value';
    this.secondFormGroup.reset()
  }

  onSubmitAttributes() {
    if (this.selectedValue == 'Freeform text' || this.selectedValue == 'List of values' && this.attribute_lov.length > 0) {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Attribute values are available' });
      this.stepper.next();
      this.fetchLatest();
    } else {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Attribute values are required' });
    }
    /*this.Attributr_array = [];
    this.AttributeName = this.secondFormGroup.value.Attribute_Name
    this.AttributeType = this.secondFormGroup.value.Attribute_type
    this.Attribute_typevalues = this.secondFormGroup.value.Attribute_type_values
    this.Freeformtext = this.secondFormGroup.value.Freeform_text
    this.Attribute_Object.AttributeName = this.AttributeName
    this.Attribute_Object.AttributeType = this.AttributeType;
    this.Attribute_Object.Attribute_typevalues = this.Attribute_typevalues
    this.Attribute_Object.Freeformtext = this.Freeformtext
    this.Attribute_Object.attribute_lov = this.secondFormGroup.value.ListValues
    this.Attributr_array.push(this.Attribute_Object);
    if(this.secondFormGroup.value.Attribute_type_values=='List of values') {
      console.log('values');
      this.values = true;
    } else if(this.secondFormGroup.value.Attribute_type_values=='Freeform text') {
      this.values = false;
    }*/

  }

  onKeyTech(event) {
    var mail: string = event.target.value;
    var pushing = mail.search(';')
    if (pushing != -1) {
      this.addTech()
    } else {
      console.log('not pushing');
    }
  }

  isEqual(arr) {
    this.attribute_lov = arr.filter(function (elem, index, self) {
      return index == self.indexOf(elem);
    });
    return this.attribute_lov
  }

  isAttrVal(arr) {
    this.value_list = arr.filter(function (elem, index, self) {
      return index == self.indexOf(elem);
    });
    return this.value_list
  }

  addTech() {
    let valu: string = this.techValue.toLowerCase();
    console.log('techValue ', valu.substr(0, valu.length - 1));
    this.attribute_lov.push(valu.substr(0, valu.length - 1))
    let newArray = new Array();
    for (var i = 0; i < this.attribute_lov.length; i++) {
      if (this.attribute_lov[i]) {
        newArray.push(this.attribute_lov[i]);
      }
    }
    this.attribute_lov = newArray;
    this.secondFormGroup.value.ListValues.push(valu.substr(0, valu.length - 1))
    console.log("the attribute_lov is before ", JSON.stringify(this.attribute_lov));
    this.isEqual(this.attribute_lov);
    this.techValue = '';
    console.log("the attribute_lov is after ", JSON.stringify(this.attribute_lov));
  }

  removeTech(emi) {
    this.attribute_lov.splice(emi, 1)
    this.secondFormGroup.value.ListValues.splice(emi, 1)
  }

  pageChanged(event: number) {
    this.p = event;
    var p = this.p - 1;
    let skip_value = p * this.limit;
    this.skip = skip_value;
  }

  attributeSelected(AL, ALI) {
    this.selectedAttribute = AL;
    AL.selected = true;
    this.AttributesList.forEach((list) => {
      if (list.userColumnName !== AL.userColumnName) {
        list.selected = false;
      }
    });
    console.log("the attribute selected is", AL);
    var id = Number(AL.attribMapId);
    this.newValue = null;
    this.value_list = [];
    this.edit = false;
    this.isListType = this.AttributesList[id - 1].isListType;
    if (this.isListType == "Y") {
      this.showEditOption = true;
    } else if (this.isListType == "N") {
      this.showEditOption = false;
    }
    if(this.AttributesList[id-1].colType == "number"){
      this.inputType = true;
    }else{
      this.inputType = false;
    }
    if (AL.attribMapId == 1) {
      this.attributeDetail = [
        {
          "attribMapId": 1,
          "attribMapValue": ["ONE", "TWO"],
          "createdBy": "string",
          "createdDate": "2018-12-19T07:11:35.624Z",
          "id": "string",
          "lastModifiedBy": "string",
          "lastModifiedDate": "2018-12-19T07:11:35.624Z"
        }
      ]
    } else if (AL.attribMapId == 2) {
      this.attributeDetail = [
        {
          "attribMapId": 2,
          "attribMapValue": [],
          "createdBy": "string",
          "createdDate": "2018-12-19T07:11:35.624Z",
          "id": "string",
          "lastModifiedBy": "string",
          "lastModifiedDate": "2018-12-19T07:11:35.624Z"
        }
      ]
    }

    // this.salesCreditService.fetchAttributeMapValue(AL.attribMapId).subscribe(response => {
    //   console.log("the response of fectLatest", response);
    //   this.attributeDetail = response["content"];
    // }, error => {
    //   this.msgs = [];
    //   this.msgs.push({ severity: 'error', summary: 'Error fetching Attribute Detail' });
    // });
  }

  saveAttr() {
    this.createAttribute();
    /*this.stepper.reset()
    localStorage.setItem('AttributesData',JSON.stringify(this.Attributr_array))
    let one: any = JSON.parse(localStorage.getItem('AttributesData'))
    let array = [];
    if(this.AttributesList.length>0) {
      this.AttributesList.push(this.Attribute_Object)
      this.Count++
      // array.push(one)
      // this.AttributesList = array;
      // this.Count = this.AttributesList.length;
      // console.log('in const ',JSON.stringify(this.AttributesList))
    }*/
  }
  getAttributeList() {
    console.log("in getAttributeList");
    this.salesCreditService.getAllAttribute().subscribe(responseValues => {
      console.log("the responseValues", this.AttributesList);
      this.AttributesList = responseValues;
      this.AttributesList.forEach((list) => {
        (<any>list).selected = false;
      });
      this.Count = this.AttributesList.length;
      this.attributeSelected(this.AttributesList[0], 1);
    }, error => {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error fetching Attributes' });
    });
  }
  fetchLatest() {
    console.log("the attributeDataType", this.attributeDataType);
    var fetchVar = {};
    (<any>fetchVar).fixedAttribute = "Y";
    (<any>fetchVar).colType = this.attributeDataType;
    console.log("the fetchVar", fetchVar);
    this.salesCreditService.fetchLatestAttrbute(fetchVar).subscribe(response => {
      console.log("the response of fectLatest", response);
      this.latestVar = response;
    }, error => {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error fetching Attribute Information' });
    });
  }
  createAttribute() {
    console.log("this.Attribute_Object", this.Attribute_Object);
    /*this.Attribute_Object.AttributeName = this.AttributeName
    this.Attribute_Object.AttributeType = this.AttributeType
    this.Attribute_Object.Attribute_typevalues = this.Attribute_typevalues
    this.Attribute_Object.Freeformtext = this.Freeformtext
    this.Attribute_Object.attribute_lov = this.secondFormGroup.value.ListValues*/

    this.attributeObj.linenAttributeMap.colType = this.attributeDataType;
    this.attributeObj.linenAttributeMap.isMapped = "Y";
    this.attributeObj.linenAttributeMap.linenAttribute = this.latestVar;
    this.attributeObj.linenAttributeMap.userColumnName = this.attributeName;
    this.attributeObj.linenAttributeMapValue = [];
    if (this.attribute_lov.length > 0) {
      this.attribute_lov.forEach((data) => {
        var new_var = {};
        if (data !== "" || data !== null) {
          (<any>new_var).attribMapValue = data;
          this.attributeObj.linenAttributeMapValue.push(new_var);
        }

      });

    }
    console.log("the attributeObj is", this.attributeObj);
    this.salesCreditService.createAttribute(this.attributeObj).subscribe(response => {
      console.log("the response of fectLatest", response);
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Attribute Created Successfully' });
      this.stepper.reset();
      this.attributeDataType = null;
      this.attributeName = null;
      this.attributeValueType = null;
      this.selectedAttribute = {};
      this.attributeDetail = [];
      this.attributeObj = {
        "linenAttributeMap": {
          "colType": "",
          "isMapped": "",
          "linenAttribute": {
            "applicableModules": "",
            "colName": "",
            "colType": "",
            "fixedAttribute": "",
            "userColumnName": ""
          },
          "userColumnName": ""
        },
        "linenAttributeMapValue": []
      };
      this.attribute_lov = [];
      this.getAttributeList();
    }, error => {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Database Error.Please contact Administrator' });
    });
  }
  add() {
    console.log('newValue ' + this.newValue);
    if (this.newValue != '') {
      let valu: string = this.newValue.toLowerCase();
      this.value_list.push(valu);
      this.isAttrVal(this.value_list)
      this.newValue = '';
    } else {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Attribute map value is required' });
    }
  }
  save() {
    var listValues = [];
    if (this.value_list.length > 0) {
      this.value_list.forEach((single_value) => {
        var new_var = {};
        (<any>new_var).attribMapValue = single_value;
        listValues.push(new_var);
      });
      console.log("teh selected attribute is", this.selectedAttribute);
      console.log("teh values to be saved are", listValues);
      this.salesCreditService.addMapAttributeValue(this.selectedAttribute.attribMapId, listValues).subscribe((response) => {
        console.log("teh resposne", response);
        this.newValue = '';
        this.value_list = [];
        this.edit = false;
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Values successfully added to the map' });
        this.salesCreditService.fetchAttributeMapValue(this.selectedAttribute.attribMapId).subscribe(responseValues => {
          console.log("the response of fectLatest", responseValues);
          this.attributeDetail = responseValues["content"];
        }, error => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error fetching Attribute Detail' });
        });
      });
    } else {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Add Attribute map value' });
    }

  }
  cancel() {
    this.newValue = null;
    this.value_list = [];
    this.edit = false;
  }
  showEdit() {
    this.edit = true;
  }
  removeTechValue(emi) {
    this.value_list.splice(emi, 1)

  }
  ngDoCheck() {
    this.detect.detectChanges()
  }
}
