import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainFuncRoutingModule } from './main-func-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

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
  NavbarComponent,
  FileMarksComponent,
  FileSendingComponent,
  GetMarkComponent,
  GetStudentFileComponent,
  GetTeacherFileComponent,
  WorkRatingComponent,
  CreateGroupComponent,
  AddUserToGroupComponent,
  GetGroupComponent,
  GroupChatComponent,
  DeleteGroupComponent,
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
    NavbarComponent,
    FileMarksComponent,
    FileSendingComponent,
    GetMarkComponent,
    GetStudentFileComponent,
    GetTeacherFileComponent,
    WorkRatingComponent,
    CreateGroupComponent,
    AddUserToGroupComponent,
    GetGroupComponent,
    GroupChatComponent,
    DeleteGroupComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainFuncRoutingModule,
    MaterialModule
  ]
})
export class MainFuncModule { }
