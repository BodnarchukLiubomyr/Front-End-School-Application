import { Component, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-user-to-group',
  templateUrl: './add-user-to-group.component.html',
  styleUrl: './add-user-to-group.component.scss'
})
export class AddUserToGroupComponent implements OnDestroy{
  form = this.fb.group({
    groupName: ['',{
      validators: [
        Validators.required,
        Validators.pattern(/^(?:[^A-Z]*[A-Z]?[^A-Z]*)?(?=.*[a-z])(?!\\d)(?!\\s).{1,}$/),
        Validators.maxLength(60)
      ]
    }],
    email: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/)
      ]
    }],
    className: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^(0?[1-9]|1[0-1])-[A-Z]$/)
      ]
    }],
  }
  );

  private subscription: Subscription;

  isAddUserToGroupFailed = false;
  errorMessage = '';
  roles: string[] = [];

  showPassword = false;

  constructor(
    private mainFuncService: MainFuncService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.subscription = new Subscription();
  }

  closeErrorAlert() {
    this.isAddUserToGroupFailed = false;
  }

  onSubmit(): void {
    const { groupName,email,className } = this.form.value;
    console.log(groupName, email,className);

    this.subscription = this.mainFuncService.addUserToGroup(groupName!,email!,className!).subscribe({
      next: data => {
        this.router.navigate(['main-part']);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isAddUserToGroupFailed = true;
        }
      }
    })
  }

  goBack(event: MouseEvent) {
    event.preventDefault();
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
