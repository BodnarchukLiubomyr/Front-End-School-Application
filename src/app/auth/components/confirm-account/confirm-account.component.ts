import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrl: './confirm-account.component.scss'
})
export class ConfirmAccountComponent implements OnInit,OnDestroy{
  private subscription: Subscription;
  email = this.route.snapshot.paramMap.get('email');
  token = this.route.snapshot.queryParamMap.get('token');
  isEmailSent = true;
  isEmailConfirmed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    if (this.token) {
      this.confirmAccount(this.token);
    }
  }

  closeSuccessAlert() {
    this.isEmailConfirmed = false;
  }

  closeErrorAlert() {
    this.isEmailSent = true;
  }

  sendConfirmEmail(): void {
    var subscription = this.authService.sendConfirmEmail(this.email!)
      .subscribe({
        next: req => {
          console.log(req.status);
        },
        error: err => {
          if (err.status == 500) {
            this.errorMessage = err.error.message;
            this.isEmailSent = false;
          }
        }
      });
    this.subscription.add(subscription);
  };

  confirmAccount(token: string): void {
    var subscription = this.authService.confirmAccount(token)
      .subscribe({
        next: data => {
          if (data.emailConfirmed) {
            this.isEmailConfirmed = true;
            timer(1500)
              .subscribe(i => {
                this.router.navigate(['log-in']);
              })
          }
        },
        error: err => {
          if (err.status == 500) {
            this.errorMessage = err.error.message
              .slice(0, 100)
              .concat(' ...');
            this.isEmailSent = false;
          }
        }
      });
      this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
