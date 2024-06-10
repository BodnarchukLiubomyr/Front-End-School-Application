import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainFuncRoutingModule } from './main-func-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AddUserToClassComponent,
  CreateClassComponent,
  CreateExerciseComponent,
  CreateSubjectComponent,
  DeleteExerciseComponent,
  FindClassComponent,
  GetClassComponent,
  GetClassStudentsComponent,
  MainPartComponent,
  SubjectViewComponent,
  SubjectsComponent,
  NavbarComponent
} from "./index"

@NgModule({
  declarations: [
    AddUserToClassComponent,
    CreateClassComponent,
    CreateExerciseComponent,
    CreateSubjectComponent,
    DeleteExerciseComponent,
    FindClassComponent,
    GetClassComponent,
    GetClassStudentsComponent,
    MainPartComponent,
    SubjectViewComponent,
    SubjectsComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainFuncRoutingModule
  ]
})
export class MainFuncModule { }
