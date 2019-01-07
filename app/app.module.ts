import '../polyfills';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CdkTableModule} from '@angular/cdk/table';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import {GrowlModule} from 'primeng/growl';
import { NgDragDropModule } from 'ng-drag-drop';
import { CalendarModule } from 'primeng/calendar';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import {MaterialModule} from './material.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {NgxPaginationModule} from 'ngx-pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import {AppRoutingModule } from './app-routing.module';
import { CreditModule } from './credit/credit.module';
//Component
import { AppComponent } from './app.component';
import { ListComponent } from './list.component';
import {AttributesComponent} from './attributes.component';
import { ListNavComponent } from './listNav.component';
import { ModifyListComponent } from './modifyList.component';
import { CategoryComponent } from './category.component';
import { SalesCreditSidenavComponent } from './salesCreditSidenav.component';
import { RulePageComponent } from './rule-page.component';
import { RuleReportComponent } from './rule-report.component';
import { SalesCockpitComponent } from './cockpit.component';
import { QueryTestingComponent } from './query-testing.component';
// import {ModifyNavComponent } from './modifyNav.component';
import {TemplateComponent} from './template.component';
import { LoginComponent } from './login.component';
import { QueryBuilderModule } from "angular2-query-builder";
import { queryBuilder } from 'jQuery-QueryBuilder';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  DateAdapter
} from '@angular/material';
import { DomChangeDirective } from './changedetect.directive';
import { ChildComponent } from './child.component';
import { from } from 'rxjs/observable/from';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AttributesComponent,
    ListNavComponent,
    ModifyListComponent,
    CategoryComponent,
    SalesCreditSidenavComponent,
    RulePageComponent,
    RuleReportComponent,
    SalesCockpitComponent,
    TemplateComponent,
    LoginComponent,
    DomChangeDirective,
    ChildComponent,
    QueryTestingComponent
  ],
  imports: [
	  BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatAutocompleteModule,
	  MatButtonModule,
	  MatButtonToggleModule,
	  MatCardModule,
	  MatCheckboxModule,
	  MatChipsModule,
	  MatDatepickerModule,
	  MatDialogModule,
	  MatExpansionModule,
	  MatGridListModule,
	  MatIconModule,
	  MatInputModule,
	  MatListModule,
	  MatMenuModule,
	  MatNativeDateModule,
	  MatPaginatorModule,
	  MatProgressBarModule,
	  MatProgressSpinnerModule,
	  MatRadioModule,
	  MatRippleModule,
	  MatSelectModule,
	  MatSidenavModule,
	  MatSliderModule,
	  MatSlideToggleModule,
	  MatSnackBarModule,
	  MatSortModule,
	  MatTableModule,
	  MatTabsModule,
	  MatToolbarModule,
	  MatTooltipModule,
	  MatStepperModule,
    Ng2DeviceDetectorModule.forRoot(),
    GrowlModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    CreditModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    HttpModule,
    NgDragDropModule.forRoot(),
    NgxChartsModule,
    TypeaheadModule.forRoot(),
    QueryBuilderModule
	],
  providers: [
    DatePipe,
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
  
}
