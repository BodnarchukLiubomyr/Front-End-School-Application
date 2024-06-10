import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
} from "./index"

const routes: Routes = [
  { path: 'main-part', component: MainPartComponent },
  { path: 'create-class', component: CreateClassComponent},
  { path: 'add-user-to-class', component: AddUserToClassComponent},
  { path: 'get-users-class/:className', component: GetClassStudentsComponent},
  { path: 'find-class',component: FindClassComponent},
  { path: 'get-class/:className',component: GetClassComponent},
  { path: 'create-subject',component: CreateSubjectComponent},
  { path: 'get-subjects', component: SubjectsComponent},
  { path: 'subject-view/:subjectId', component: SubjectViewComponent},
  { path: 'create-exercise', component: CreateExerciseComponent},
  { path: 'delete-exercise/:exerciseName',component:DeleteExerciseComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainFuncRoutingModule { }
