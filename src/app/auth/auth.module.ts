import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpTeacherComponent } from './components/sign-up-teacher/sign-up-teacher.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ShowPasswordDirective } from './directives/show-password.directive';



@NgModule({
  declarations: [
    SignUpComponent,
    LogInComponent,
    ConfirmAccountComponent,
    ShowPasswordDirective,
    SignUpTeacherComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
