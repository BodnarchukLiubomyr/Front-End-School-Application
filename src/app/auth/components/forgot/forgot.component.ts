import { Component, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent implements OnDestroy{
  forgotForm = this.fb.group({
    email: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/)
      ]
    }],
  }
  );

  private subscription: Subscription;

  isLoggedIn = false;
  isForgotPasswordFailed = false;
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

  closeErrorAlert() {
    this.isForgotPasswordFailed = false;
  }

  onSubmit(): void {
    const { email } = this.forgotForm.value;
    console.log(email);

    this.subscription = this.authService.forgotPassword(email!).subscribe({
      next: data => {
        this.isForgotPasswordFailed = false;

        this.router.navigate(['password/forgot/check-mail/', email]);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isForgotPasswordFailed = true;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
