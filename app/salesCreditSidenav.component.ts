import { Component, OnInit, AfterViewInit, AfterViewChecked, EventEmitter, Input, Output, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
@Component({
  selector: 'app-salesCreditSidenav',
  templateUrl: './salesCreditSidenav.component.html',

})

export class SalesCreditSidenavComponent implements OnInit, AfterViewChecked {
  public isExpanded = true;
  public _opened: boolean = true;
  public _mode: String = 'push';
  public showRule: Boolean = false;
  public showList: Boolean = false;
  public showAttribute: Boolean = false;
  public showProfile: Boolean = false;
  public showCategoryNew: Boolean = false;
  public showRuleReport: Boolean = false;
  public showCockpit: Boolean = false;
  public showTemplate: Boolean = false;
  constructor(private http: Http, private httpClient: HttpClient, private datePipe: DatePipe, public router: Router, public location: Location, private route: ActivatedRoute) { };

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
    this.initialFunction();
  }
  public ngAfterViewChecked() {
    this.initialFunction();
  }
  initialFunction() {
    var pathString = this.location.path();
    if (pathString === "/list") {
      this.showList = true;
      this.showAttribute = false;
      this.showProfile = false;
      this.showCategoryNew = false;
      this.showRule = false;
      this.showRuleReport = false;
      this.showCockpit = false;
      this.showTemplate = false;
    }
    if (pathString === "/attribute") {
      this.showList = false;
      this.showAttribute = true;
      this.showProfile = false;
      this.showCategoryNew = false;
      this.showRule = false;
      this.showRuleReport = false;
      this.showCockpit = false;
      this.showTemplate = false;
    }
    if (pathString.indexOf("/profile") >= 0) {
      // console.log("profile index");
      this.showList = false;
      this.showAttribute = false;
      this.showProfile = true;
      this.showCategoryNew = false;
      this.showRule = false;
      this.showRuleReport = false;
      this.showCockpit = false;
      this.showTemplate = false;
    }
    if (pathString === "/category") {
      this.showList = false;
      this.showAttribute = false;
      this.showProfile = false;
      this.showCategoryNew = true;
      this.showRule = false;
      this.showRuleReport = false;
      this.showCockpit = false;
      this.showTemplate = false;
    }
    if (pathString === "/rule") {
      this.showList = false;
      this.showAttribute = false;
      this.showProfile = false;
      this.showCategoryNew = false;
      this.showRule = true;
      this.showRuleReport = false;
      this.showCockpit = false;
      this.showTemplate = false;
    }
    if (pathString === "/rule-report") {
      this.showList = false;
      this.showAttribute = false;
      this.showProfile = false;
      this.showCategoryNew = false;
      this.showRule = false;
      this.showRuleReport = true;
      this.showCockpit = false;
      this.showTemplate = false;
    }
    if (pathString === "/cockpit") {
      this.showList = false;
      this.showAttribute = false;
      this.showProfile = false;
      this.showCategoryNew = false;
      this.showRule = false;
      this.showRuleReport = false;
      this.showCockpit = true;
      this.showTemplate = false;
    }
    if (pathString === "/template") {
      this.showList = false;
      this.showAttribute = false;
      this.showProfile = false;
      this.showCategoryNew = false;
      this.showRule = false;
      this.showRuleReport = false;
      this.showCockpit = true;
      this.showTemplate = false;
    }

  }
  goToList() {
    this.router.navigate(["/list"]);
    this.showList = true;
    this.showAttribute = false;
    this.showProfile = false;
    this.showCategoryNew = false;
    this.showRule = false;
    this.showRuleReport = false;
    this.showTemplate = false;
    this.showCockpit = false;
  }
  goToAttribute() {
    this.router.navigate(["/attribute"]);
    this.showList = false;
    this.showAttribute = true;
    this.showProfile = false;
    this.showCategoryNew = false;
    this.showRule = false;
    this.showRuleReport = false;
    this.showTemplate = false;
    this.showCockpit = false;
  }
  goToProfile() {
    this.router.navigate(["/profile"], { relativeTo: this.route });
    this.showList = false;
    this.showAttribute = false;
    this.showProfile = true;
    this.showCategoryNew = false;
    this.showRule = false;
    this.showRuleReport = false;
    this.showTemplate = false;
    this.showCockpit = false;
    console.log('showProfile '+this.showProfile);
  }
  goToCategoryNew() {
    this.router.navigate(["/category"]);
    this.showList = false;
    this.showAttribute = false;
    this.showProfile = false;
    this.showCategoryNew = true;
    this.showRule = false;
    this.showRuleReport = false;
    this.showTemplate = false;
    this.showCockpit = false;
  }
  goToRule() {
    this.router.navigate(["/rule"]);
    this.showList = false;
    this.showAttribute = false;
    this.showProfile = false;
    this.showCategoryNew = false;
    this.showRule = true;
    this.showRuleReport = false;
    this.showTemplate = false;
    this.showCockpit = false;
  }
  goToRuleReport() {
    this.router.navigate(["/rule-report"]);
    this.showList = false;
    this.showAttribute = false;
    this.showProfile = false;
    this.showCategoryNew = false;
    this.showRule = false;
    this.showRuleReport = true;
    this.showTemplate = false;
    this.showCockpit = false;
  }
  goToCockpit() {
    this.router.navigate(["/cockpit"]);
    this.showList = false;
    this.showAttribute = false;
    this.showProfile = false;
    this.showCategoryNew = false;
    this.showRule = false;
    this.showRuleReport = false;
    this.showCockpit = true;
    this.showTemplate = false;
  }
  goToTemplate() {
    this.router.navigate(["/template"]);
    this.showList = false;
    this.showAttribute = false;
    this.showProfile = false;
    this.showCategoryNew = false;
    this.showRule = false;
    this.showRuleReport = false;
    this.showCockpit = false;
    this.showTemplate = true;
  }
}