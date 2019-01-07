import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

import { ModifyProfileRoutingModule } from './modify-profile-routing.module';
import { ModifyProfileComponent } from './modify-profile.component';
import { MaterialModule } from '../../material.module';
import {GrowlModule} from 'primeng/growl';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    ModifyProfileRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    GrowlModule,
    NgxPaginationModule,
  ],
  declarations: [ModifyProfileComponent]
})
export class ModifyProfileModule { }
