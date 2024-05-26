import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainFuncRoutingModule } from './main-func-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AddUserToClassComponent,
  CreateClassComponent,
  FindClassComponent,
  GetClassComponent,
  GetClassStudentsComponent,
  MainPartComponent,
  NavbarComponent
} from "./index"

@NgModule({
  declarations: [
    AddUserToClassComponent,
    CreateClassComponent,
    FindClassComponent,
    GetClassComponent,
    GetClassStudentsComponent,
    MainPartComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainFuncRoutingModule
  ]
})
export class MainFuncModule { }
