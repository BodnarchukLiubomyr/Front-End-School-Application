import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AddUserToClassComponent,
  CreateClassComponent,
  CreateExerciseComponent,
  CreateSubjectComponent,
  DeleteExerciseComponent,
  FileMarksComponent,
  FileSendingComponent,
  FindClassComponent,
  GetClassComponent,
  GetClassStudentsComponent,
  GetMarkComponent,
  GetStudentFileComponent,
  GetTeacherFileComponent,
  MainPartComponent,
  SubjectViewComponent,
  SubjectsComponent,
  WorkRatingComponent,
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
  { path: 'work-rating/:exerciseId',component: WorkRatingComponent},
  { path: 'file-sending/:userId/:exerciseId', component: FileSendingComponent},
  { path: 'file-marks/:fileName',component: FileMarksComponent},
  { path: 'teacher-file/:exerciseId',component: GetTeacherFileComponent},
  { path: 'get-mark/:userId/:exerciseId',component: GetMarkComponent},
  { path: 'student-file/:userId/:exerciseId',component: GetStudentFileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainFuncRoutingModule { }
