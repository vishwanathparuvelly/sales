import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditComponent } from './credit.component';
// import { ListNavComponent} from '../listNav.component';
const routes: Routes = [
  // { path:'listNav',component:ListNavComponent},
  {
    path: 'profile', component: CreditComponent, loadChildren: './credit-child.module#CreditChildModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditRoutingModule { }
