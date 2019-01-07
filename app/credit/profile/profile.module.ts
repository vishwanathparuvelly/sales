import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';
import { QueryBuilderModule } from "angular2-query-builder";
import {NgxPaginationModule} from 'ngx-pagination';
import {GrowlModule} from 'primeng/growl';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ListboxModule,
    QueryBuilderModule,
    GrowlModule,
    NgxPaginationModule,
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
