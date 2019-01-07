import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html'
})
export class CreditComponent implements OnInit {
  showCreateActive: Boolean = false;
  showModifyActive: Boolean = false;
  @Input('salesActiveLink') salesActiveLink: String = "";
  CustomersList: any[] = [
    {
      Name: 'Customer1',
      value: 1201
    },
    {
      Name: 'Customer2',
      value: 1202
    },
    {
      Name: 'Customer3',
      value: 1203
    }
  ]
  CustomerID: any = 'Select Customer';
  routeIndex = 1;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.salesActiveLink = 'create';
    this.showCreateActive = true;
    this.showModifyActive = false;
    let url = localStorage.getItem('path');
    if (url === "ProfileComponent") {
      this.showCreateActive = true;
      this.showModifyActive = false;
    } else if (url === "ModifyProfileComponent") {
      this.showModifyActive = true;
      this.showCreateActive = false;
    }

  }

  clickSelectCustomer(value: string, event) {
    localStorage.setItem('CustomerName', value)
    console.log('CustomerID ', this.CustomerID);
  }

  routeClick(routeName: string) {
    this.salesActiveLink = routeName;
    // if (this.salesActiveLink === "create") {
    //   console.log("create");
    //   this.showCreateActive = true;
    //   this.showModifyActive = false;
    // }
    // if (this.salesActiveLink === "modify") {
    //   console.log("modify");
    //   this.showModifyActive = true;
    //   this.showCreateActive = false;
    // }
  }

  getValue(event: string) {
    console.log('event name ',event);
  }
}
