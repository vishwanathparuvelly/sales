import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreditRoutingModule } from './credit-routing.module';
import { CreditComponent } from './credit.component';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    CreditRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CreditComponent]
})
export class CreditModule { }
