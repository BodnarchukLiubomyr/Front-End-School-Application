import { Component, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { regexValidator } from '../../directives/validation/field.match.directives';
import { fieldsMatch } from '../../directives/validation/multi-pattern.directive';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-up-teacher',
  templateUrl: './sign-up-teacher.component.html',
  styleUrl: './sign-up-teacher.component.scss'
})
export class SignUpTeacherComponent implements OnDestroy{
  form = this.fb.group({
    firstname:['', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        regexValidator(/(?:[^A-Z]*[A-Z]?[^A-Z]*)?/, { 'uppercase': ' ' }),
        regexValidator(/[a-z]+/, { 'lowercase': ' ' }),
        regexValidator(/^\S+$/, { 'nospaces': ' ' })
      ]
    }],
    lastname:['', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        regexValidator(/(?:[^A-Z]*[A-Z]?[^A-Z]*)?/, { 'uppercase': ' ' }),
        regexValidator(/[a-z]+/, { 'lowercase': ' ' }),
        regexValidator(/^\S+$/, { 'nospaces': ' ' })
      ]
    }],
    email: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/)
      ]
    }],

    password: ['', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        regexValidator(/[A-Z]+/, { 'uppercase': ' ' }),
        regexValidator(/[a-z]+/, { 'lowercase': ' ' }),
        regexValidator(/[0-9]+/, { 'number': ' ' }),
        regexValidator(/^\S+$/, { 'nospaces': ' ' })
      ]
    }],
    passwordConfirm: ['', {
      validators: [
        Validators.required
      ]
    }]
  },
    {
      validators: [fieldsMatch('password', 'passwordConfirm')]
    }
  );
  private subscription: Subscription | undefined;
  isSignUpTeacherFailed = false;
  errorMessage = '';

  showPassword = false;
  showPasswordConfirm = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirm() {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }

  closeErrorAlert() {
    this.isSignUpTeacherFailed = false;
  }

  onSubmit(): void {
    const {firstname,lastname, email, password, passwordConfirm } = this.form.value;

    this.subscription = this.authService.signUpTeacher(firstname!,lastname!,email!, password!, passwordConfirm!)
      .subscribe({
        next: data => {
          this.router.navigate(['confirm/account/', data.email]);
        },
        error: err => {
          if (err.status == 500) {
            this.errorMessage = err.error.message;
            this.isSignUpTeacherFailed = true;
          }
        }
      });
  }

  goBack(event: MouseEvent) {
    event.preventDefault();
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
