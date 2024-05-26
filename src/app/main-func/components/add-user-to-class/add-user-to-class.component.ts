import { Component, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-user-to-class',
  templateUrl: './add-user-to-class.component.html',
  styleUrl: './add-user-to-class.component.scss'
})
export class AddUserToClassComponent implements OnDestroy{
  form = this.fb.group({
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

  isAddUserToClassFailed = false;
  errorMessage = '';
  roles: string[] = [];
  schoolClasses: any;
  className: string | undefined;
  showPassword = false;

  constructor(
    private mainFuncService: MainFuncService,
    private router: Router,
    private fb: FormBuilder,
    private storageService: StorageService,
    private location: Location
  ) {
    this.subscription = new Subscription();
  }

  closeErrorAlert() {
    this.isAddUserToClassFailed = false;
  }

  onSubmit(): void {
    const { email,className } = this.form.value;
    console.log(email,className);

    this.subscription = this.mainFuncService.addUserToClass(email!,className!).subscribe({
      next: data => {
        console.log(data);
        this.schoolClasses = data;
        this.router.navigate(['get-users-class', className]);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isAddUserToClassFailed = true;
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
