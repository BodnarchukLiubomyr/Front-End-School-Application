import { Component, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-find-class',
  templateUrl: './find-class.component.html',
  styleUrl: './find-class.component.scss'
})
export class FindClassComponent implements OnDestroy{
  form = this.fb.group({
    className: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^(0?[1-9]|1[0-1])-[A-Z]$/)
      ]
    }],
  }
  );

  private subscription: Subscription;

  isFindClassFailed = false;
  errorMessage = '';
  roles: string[] = [];
  schoolClasses: any;
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
    this.isFindClassFailed = false;
  }

  onSubmit(): void {
    const { className } = this.form.value;
    console.log(className);
    this.router.navigate(['get-class', className]);
  }

  goBack(event: MouseEvent) {
    event.preventDefault();
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
