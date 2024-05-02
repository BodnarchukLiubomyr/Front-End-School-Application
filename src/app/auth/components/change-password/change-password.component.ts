import { Component, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { regexValidator } from '../../directives/validation/field.match.directives';
import { fieldsMatch } from '../../directives/validation/multi-pattern.directive';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnDestroy{
  form = this.fb.group({
    newPassword: ['', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        regexValidator(/[A-Z]+/, { 'uppercase': ' ' }),
        regexValidator(/[a-z]+/, { 'lowercase': ' ' }),
        regexValidator(/[0-9]+/, { 'number': ' ' }),
        regexValidator(/^\S+$/, { 'nospaces': ' ' })
      ]
    }],

    newPasswordConfirm: ['', {
      validators: [
        Validators.required
      ]
    }],
  },
    {
      validators: [fieldsMatch('newPassword', 'newPasswordConfirm')]
    }
  );

  private subscription: Subscription;
  token = this.route.snapshot.paramMap.get('token');
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.subscription = new Subscription();
  }

  showNewPassword = false;
  showNewPasswordConfirm = false;
  isChangePasswordFailed = false;

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleNewPasswordConfirm() {
    this.showNewPasswordConfirm = !this.showNewPasswordConfirm;
  }

  closeErrorAlert() {
    this.isChangePasswordFailed = false;
  }

  onSubmit(): void {
    const {newPassword, newPasswordConfirm } = this.form.value;

    this.subscription = this.authService.changePassword(newPassword!, newPasswordConfirm!,this.token!)
      .subscribe({
        next: data => {
          this.router.navigate(['log-in']);
        },
        error: err => {
          console.log(err)
          if (err.status == 500) {
            this.errorMessage = err.error.message;
            this.isChangePasswordFailed = true;
            console.log('end ',this.errorMessage, err.error.message)
          }
        }
      });
  }

  goBack(event: MouseEvent) {
    event.preventDefault();
    this.location.back();
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
