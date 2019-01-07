
import { Component,OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params } from '@angular/router';
import { Ng2DeviceService } from 'ng2-device-detector';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	providers:[]
})

export class AppComponent implements OnInit {
	public isIn:Boolean
	public header:any;
	public username : string;
	public deviceInfo: any;
	public appStyle:Boolean=false;
	constructor(public routing:Router,private route: ActivatedRoute,private deviceService: Ng2DeviceService) {}

	ngOnInit() {
		this.isIn = false;
		this.checkCredentials();
		console.log("the routing url",this.routing.url);
	}
	
	checkCredentials() {
		if(this.routing.url==='/'){
			this.appStyle=false;
			console.log("the appStyle value",this.appStyle);
		}else{
			this.appStyle=true;
			console.log("the appStyle value",this.appStyle);
		}
	console.log(localStorage.getItem("username"));
    	if (localStorage.getItem("username") === null) {
        	this.routing.navigate(['/']);
    	}
		else {
			let path = window.location.pathname.replace(/\//,"");
			this.routing.navigate([path]);
		}
	  } 
	  logout() {
		localStorage.removeItem("username");
		this.routing.navigate(['/']);
	  }
	  browserDetection() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
}
  public toggleState=()=> { // click handler
    console.log("in toggleState");
      var bool = this.isIn;
      this.isIn = bool === false ? true : false; 
  }
  
      public status: any = {
        isFirstOpen: true,
        isOpen: true
      };
}
