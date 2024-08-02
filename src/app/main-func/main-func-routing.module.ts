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
  CreateGroupComponent,
  AddUserToGroupComponent,
  GetGroupComponent,
  GroupChatComponent,
  DeleteGroupComponent,
  ChatComponent,
  CreateChatComponent,
  GetChatsComponent,
  DeleteUserComponent,
} from "./index"

const routes: Routes = [
  { path: 'main-part', component: MainPartComponent },
  { path: 'create-class', component: CreateClassComponent},
  { path: 'add-user-to-class', component: AddUserToClassComponent},
  { path: 'get-users-class/:className', component: GetClassStudentsComponent},
  { path: 'delete-user/:lastname/:firstname', component: DeleteUserComponent},
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
  { path: 'student-file/:userId/:exerciseId',component: GetStudentFileComponent},
  { path: 'create-group', component: CreateGroupComponent},
  { path: 'add-user-to-group', component: AddUserToGroupComponent},
  { path: 'get-group/:subjectId/:userId', component: GetGroupComponent},
  { path: 'group-chat/:groupId', component: GroupChatComponent},
  { path: 'delete-group/:groupName',component:DeleteGroupComponent},
  { path: 'create-chat/:userId', component: CreateChatComponent},
  { path: 'chat/:chatId', component: ChatComponent},
  { path: 'get-chats/:userId', component: GetChatsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainFuncRoutingModule { }
