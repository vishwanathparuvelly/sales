import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SalesCreditService } from '../../salesCredit.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import {Message} from 'primeng/components/common/api';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  providers:[SalesCreditService]
})
export class ModifyProfileComponent implements OnInit {
  ProfileData: any[] = [
    { "Selected": false, "CustomerName": "Customer1", "Profile_Name": "Rajesh", "Profile_Start_Date": "2018-09-20T18:30:00.000Z", "Profile_End_Date": "2018-09-21T18:30:00.000Z", "Expression_Data": [{ "Expression": "(Transation Type != ERP OR Transaction Type = Enterprise) AND Transaction Source IN('India','Sri Lanka')", "ExpressionType": "In_List", "AttributeType": "Transaction_Source", "AND": false, "OR": false }] },
    { "Selected": false, "CustomerName": "Customer1", "Profile_Name": "Naresh", "Profile_Start_Date": "2018-09-21T18:30:00.000Z", "Profile_End_Date": "2018-09-22T18:30:00.000Z", "Expression_Data": [{ "Expression": "Transation Type != ERP OR (Transation Type = Enterprise AND Transaction Source IN('India','Sri Lanka'))", "ExpressionType": "Not_In_List", "AttributeType": "Deal_Id", "AND": false, "OR": false }] },
    { "Selected": false, "CustomerName": "Customer1", "Profile_Name": "Naresh", "Profile_Start_Date": "2018-09-21T18:30:00.000Z", "Profile_End_Date": "2018-09-22T18:30:00.000Z", "Expression_Data": [{ "Expression": "Transation Type != ERP AND (Transation Type = Enterprise OR Transaction Source IN('India','Sri Lanka'))", "ExpressionType": "Not_In_List", "AttributeType": "Deal_Id", "AND": false, "OR": false }] }
  ];
  ProfileSelected: boolean = false;
  ProfileSelectedIn: number = -1;
  ExpressionArray: any[] = [];
  firstStepForm: FormGroup;
  selectedProfile:any={};
  profileObj:any={};
  msgs:Message[]=[];
  showEdit:Boolean=false;
  @ViewChild('stepper') stepper;
  p2:Number=1;
  profileDetail:any[]=[];
  salesActiveLinkValue:String="modify";
  constructor(private _formBuilder: FormBuilder,private salesCreditService:SalesCreditService,private datePipe:DatePipe, private route: ActivatedRoute) {
    let url = this.route.snapshot.routeConfig.component.name;
    localStorage.setItem('path',url)
    // let PD: any = JSON.parse(localStorage.getItem('ProfileData'))
    // console.log('Profiles ',JSON.stringify(PD))
    // this.ProfileData = PD;
  }

  ngOnInit() {
    this.firstStepForm = this._formBuilder.group({
      QueryGroup: this._formBuilder.array([this.addAttr()])
    });
    console.log('Modify Profile');
    this.getAllProfiles();
  }
  getAllProfiles(){
    this.salesCreditService.getAllProfiles().subscribe((response)=>{
      console.log("teh reposne from all profiles",response);
      this.ProfileData=response["content"];
      this.ProfileData.forEach((profile)=>{
        (<any>profile).showEdit=false;
        (<any>profile).selected=false;
      });
      this.onSelect(this.ProfileData[0]);
    });
  }
  addAttr() {
    let ExpressionGroup = this._formBuilder.group({
      condition: 'or',
      rules: [
        { field: 'gender', operator: '=', entity: 'physical' },
        { field: 'occupation', operator: 'in', entity: 'nonphysical' },
        { field: 'school', operator: 'is null', entity: 'nonphysical' },
        { field: 'notes', operator: '=', entity: 'nonphysical' }
      ]
    });

    return ExpressionGroup;
  }
  formData(firstStepForm) {
    return firstStepForm.get('QueryGroup').controls;
  }

  onSelect(profile) {
    
    console.log("the selected profile is",profile);
    profile.selected=true;
    this.ProfileData.forEach((single_profile)=>{
      if(single_profile.profileName!==profile.profileName){
        single_profile.selected=false;
      }
    });
    this.selectedProfile=profile;
    // this.selectedProfile.selected
    this.salesCreditService.getProfileExpression(profile.profileHeaderId).subscribe((response)=>{
      console.log("teh response for the expression is",response);
      this.ExpressionArray=response["content"];
    });
    this.salesCreditService.getProfileHeaderDetail(profile.profileHeaderId).subscribe((responseValues)=>{
      console.log("the profile header detail is",responseValues);
      this.profileDetail=responseValues["content"];
    });
    // profileHeaderId
    /*
    if (this.ProfileSelectedIn != index) {
      this.ProfileData[index].Selected = true;
      if (this.ProfileSelectedIn != -1) {
        this.ProfileData[this.ProfileSelectedIn].Selected = false;
      }
      this.ProfileSelectedIn = index;
      this.ExpressionArray = this.ProfileData[index].Expression_Data
      console.log('Expression_Data ', JSON.stringify(this.ExpressionArray));
    } else if (this.ProfileSelectedIn == index) {
      this.ProfileData[this.ProfileSelectedIn].Selected = false;
      this.ProfileSelectedIn = -1;
      this.ExpressionArray = [];
    }*/
  }

  editExpression(item) { 
    this.stepper.selectedIndex=1;
  }
  selectedEndDate(End_Date){
    this.profileObj.endDate=this.datePipe.transform(End_Date,'yyyy-MM-dd');

  }
  editProfile(profile){
    profile.showEdit=true;
    this.onSelect(profile);
  }
  cancel(profile){
    profile.showEdit=false;
  }
  update(profile){
    this.salesCreditService.updateProfile(this.profileObj,profile.profileHeaderId).subscribe((response)=>{
      console.log("the response",response);
      profile.showEdit=false;
      this.getAllProfiles();
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Modified the profile successfully' });
    },error=>{
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error in modifying the profile' });
    });
  }
}
