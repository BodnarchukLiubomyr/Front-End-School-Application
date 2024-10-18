import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowPasswordDirective } from './directives/show-password.directive';

import {
  LogInComponent,
  ConfirmAccountComponent,
  SignUpComponent,
  SignUpTeacherComponent,
  ChangePasswordComponent,
  CheckMailComponent,
  ForgotComponent
 } from './index';
import { TranslateModule } from '@ngx-translate/core';
import { MainFuncModule } from '../main-func/main-func.module';

@NgModule({
  declarations: [
    SignUpComponent,
    LogInComponent,
    ConfirmAccountComponent,
    ShowPasswordDirective,
    SignUpTeacherComponent,
    ChangePasswordComponent,
    CheckMailComponent,
    ForgotComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    MainFuncModule
  ]
})
export class AuthModule { }
