import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Params } from '@angular/router';
import { AppComponent } from './app.component';
import { ListComponent } from './list.component';
import { AttributesComponent } from './attributes.component';
// import { ListNavComponent } from './listNav.component';
import { ModifyListComponent } from './modifyList.component';
import { CategoryComponent } from './category.component';
import { SalesCreditSidenavComponent } from './salesCreditSidenav.component';
import { RulePageComponent } from './rule-page.component';
import { RuleReportComponent } from './rule-report.component';
import { SalesCockpitComponent } from './cockpit.component';
import { TemplateComponent } from './template.component';
import { LoginComponent } from './login.component';
import { QueryTestingComponent } from './query-testing.component';
// import { ModifyNavComponent} from './modifyNav.component';
const appRoutes:Routes=[
    // {   path:'listNav',component:ListNavComponent},
    // {  path:'modifyNav',component:ModifyNavComponent},
    {   path:'list',component:ListComponent},
    {   path:'attribute',component:AttributesComponent},
    {   path:'modifyList',component:ModifyListComponent},
    {   path:'category',component:CategoryComponent},
    {   path:'salesCreditSidenav',component:SalesCreditSidenavComponent},
    {   path:'rule',component:RulePageComponent},
    {   path:'rule-report',component:RuleReportComponent},
    {   path:'cockpit',component:SalesCockpitComponent},
    {   path:'template',component:TemplateComponent},
    {   path:'login',component:LoginComponent},
    { path: 'testing', component: QueryTestingComponent },
	{   path: '',redirectTo: 'attribute',pathMatch: 'full'}
]

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes)],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}