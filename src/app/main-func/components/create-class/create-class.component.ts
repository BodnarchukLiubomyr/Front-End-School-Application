import { Component, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrl: './create-class.component.scss'
})
export class CreateClassComponent implements OnDestroy{
  form = this.fb.group({
    classNumber: ['',{
      validators: [
        Validators.required,
        Validators.pattern(/^(0?[1-9]|1[0-1])$/)
      ]
    }],
    classLetter: ['',{
      validators: [
        Validators.required,
        Validators.pattern(/^[A-D]$/)
      ]
    }],
  });

  isCreateClassFailed = false;
  errorMessage = '';
  private subscription: Subscription | undefined

  constructor(
    private mainFuncService: MainFuncService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location
  ) { }

  closeErrorAlert() {
    this.isCreateClassFailed = false;
  }

  onSubmit(): void {
    const {classNumber,classLetter} = this.form.value;

    this.subscription = this.mainFuncService.createClass(classNumber!,classLetter!).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(["main-part"]);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isCreateClassFailed = true;
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
