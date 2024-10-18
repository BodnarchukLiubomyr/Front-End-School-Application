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
  UpdateSubjectComponent,
  DeleteSubjectComponent,
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
  ChatComponent,
  CreateChatComponent,
  GetChatsComponent,
  GetSubjectsComponent,
  DeleteUserComponent,
  TranslateComponent
} from "./index"
import { TranslateModule } from '@ngx-translate/core';


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
    GetSubjectsComponent,
    UpdateSubjectComponent,
    DeleteSubjectComponent,
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
    CreateChatComponent,
    ChatComponent,
    GetChatsComponent,
    TranslateComponent,
    DeleteUserComponent
  ],
  exports: [
    TranslateComponent, // Export it so other modules can use it
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainFuncRoutingModule,
    MaterialModule,
    TranslateModule,
  ]
})
export class MainFuncModule { }
