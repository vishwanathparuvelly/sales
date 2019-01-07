import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyProfileComponent } from './modify-profile.component';

const routes: Routes = [
  { path: '', component: ModifyProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyProfileRoutingModule { }
