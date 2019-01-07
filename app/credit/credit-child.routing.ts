import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

const CREDIT_CHILD_ROUTES: Routes = [
  {
    path: "create_profile",
    loadChildren: "./profile/profile.module#ProfileModule"
  },
  {
    path: "modify_profile",
    loadChildren: "./modify-profile/modify-profile.module#ModifyProfileModule"
  },
  { path: "", redirectTo: "create_profile", pathMatch: "prefix" }
];
@NgModule({
  imports: [RouterModule.forChild(CREDIT_CHILD_ROUTES)],
  exports: [RouterModule]
})
export class CreditChildRouting { }
