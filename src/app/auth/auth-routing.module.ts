import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpTeacherComponent } from './components/sign-up-teacher/sign-up-teacher.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-up-teacher', component: SignUpTeacherComponent},
  { path: 'confirm/account/:email', component: ConfirmAccountComponent },
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
