import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-check-mail',
  templateUrl: './check-mail.component.html',
  styleUrl: './check-mail.component.scss'
})
export class CheckMailComponent implements OnDestroy{
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
      this.checkToken(this.token);
    }
  }

  checkToken(token: string): void {
    var subscription = this.authService.checkToken(token)
      .subscribe({
        next: data => {
            timer(1500)
              .subscribe(i => {
                this.router.navigate(['password/change/',token]);
              })
        },
        error: err => {
          if (err.status == 500) {
            this.errorMessage = err.error.message
              .slice(0, 100)
              .concat(' ...');
          }
        }
      });
      this.subscription.add(subscription);
  }

  closeSuccessAlert() {
    this.isEmailConfirmed = false;
  }

  closeErrorAlert() {
    this.isEmailSent = true;
  }

  sendChangePasswordMail(): void {
    var subscription = this.authService.forgotPassword(this.email!)
      .subscribe({
        next: req => {
          console.log("sended email to ", this.email);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
