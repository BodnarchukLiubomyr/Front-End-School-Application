import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  LogInComponent,
  ConfirmAccountComponent,
  SignUpComponent,
  SignUpTeacherComponent,
  ChangePasswordComponent,
  CheckMailComponent,
  ForgotComponent
 } from './index';

const routes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-up-teacher', component: SignUpTeacherComponent},
  { path: 'confirm/account/:email', component: ConfirmAccountComponent },
  { path: 'password/forgot/check-mail/:email', component: CheckMailComponent },
  { path: 'password/forgot', component: ForgotComponent },
  { path: 'password/change/:token', component: ChangePasswordComponent },
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
