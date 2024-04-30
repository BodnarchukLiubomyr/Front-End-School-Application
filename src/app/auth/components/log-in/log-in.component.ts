import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { StorageService } from '../../../shared';
import { regexValidator } from '../../directives/validation/field.match.directives';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit, OnDestroy{
  loginForm = this.fb.group({
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
      regexValidator(/^\S+/, { 'nospaces': ' ' })
      ]
    }]
  }
  );

  private subscription: Subscription;

  isLoggedIn = false;
  isLogInFailed = false;
  isEmailAvailable = false;
  errorMessage = '';
  roles: string[] = [];

  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private storageService: StorageService,
  ) {
    this.subscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }

    this.loginForm.get('email')?.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(email => {
        if (this.loginForm.get('email')?.valid) {
          this.checkEmailAvailability(email!);
        }
      });
  }

  checkEmailAvailability(email: string): void {
    this.authService.checkEmailAvailability(email).subscribe({
      next: response => {
        console.log(response);
        if (!response) {
          this.loginForm.get('email')?.setErrors({ unavailable: true });
          this.isEmailAvailable = false;
        } else {
          this.isEmailAvailable = true;
          this.isLogInFailed = false;
        }
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isLogInFailed = true;
        }
        console.error(err);
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  closeErrorAlert() {
    this.isLogInFailed = false;
  }

  onSubmit(): void {
    const { email, password} = this.loginForm.value;

    this.subscription = this.authService.logIn(email!, password!).subscribe({
      next: data => {
        console.log(data);
        this.storageService.saveUser(data);

        this.isLogInFailed = false;
        this.isLoggedIn = true;

        this.roles = this.storageService.getUser().roles;
        this.router.navigate(['main-part']);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isLogInFailed = true;
        }
      }
    })
  }

  reloadPage(): void {
    window.location.reload();
  }
}
