import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectItem } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-listNav',
    templateUrl: './listNav.component.html',
    providers: []
})
export class ListNavComponent implements OnInit {
    showCreateActive: Boolean = false;
    showModifyActive: Boolean = false;
    @Input('salesActiveLink') salesActiveLink: String = "";
    constructor(private http: Http, private httpClient: HttpClient, private datePipe: DatePipe, private router: Router, route: ActivatedRoute) {
        //route.params.subscribe(params => this.getAllAccounts());
    }

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
    initialFunction() {
        if (this.salesActiveLink === "create") {
            console.log("create");
            this.showCreateActive = true;
            this.showModifyActive = false;
        }
        if (this.salesActiveLink === "modify") {
            console.log("modify");
            this.showCreateActive = false;
            this.showModifyActive = true;
        }

    }

    routeClick(routeName: string) {
        this.salesActiveLink = routeName;
        if (this.salesActiveLink === "create") {
            console.log("create");
            this.showCreateActive = true;
            this.showModifyActive = false;
        }
        if (this.salesActiveLink === "modify") {
            console.log("modify");
            this.showCreateActive = false;
            this.showModifyActive = true;
        }
    }

}
