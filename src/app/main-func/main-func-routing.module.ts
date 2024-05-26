import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AddUserToClassComponent,
  CreateClassComponent,
  FindClassComponent,
  GetClassComponent,
  GetClassStudentsComponent,
  MainPartComponent,
} from "./index"

const routes: Routes = [
  { path: 'main-part', component: MainPartComponent },
  { path: 'create-class', component: CreateClassComponent},
  { path: 'add-user-to-class', component: AddUserToClassComponent},
  { path: 'get-users-class/:className', component: GetClassStudentsComponent},
  { path: 'find-class',component: FindClassComponent},
  { path: 'get-class/:className',component: GetClassComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainFuncRoutingModule { }
