import { Component, Input, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-day',
  templateUrl: './create-day.component.html',
  styleUrl: './create-day.component.scss'
})
export class CreateDayComponent implements OnDestroy{
    form = this.fb.group({
    lessonsCount: ['',{
            validators: [
            Validators.required,
            Validators.pattern(/^(0?[1-8])$/)
            ]
          }],
    day: ['',{
            validators: [
            Validators.required
            ]
          }],
    className: ['',{
            validators: [
            Validators.required,
            Validators.pattern(/^(0?[1-9]|1[0-1])-[A-D]$/)
            ]
          }],
    });

    @Input()
    userId = '';
    isCreateStudentDayFailed = false;
    errorMessage = '';
    private subscription: Subscription | undefined
  
    constructor(
      private mainFuncService: MainFuncService,
      private storageService: StorageService,
      private router: Router,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private location: Location
    ) { }

    ngOnInit(): void {
      this.userId = this.storageService.getUser().id;
    }
  
    closeErrorAlert() {
      this.isCreateStudentDayFailed = false;
    }
  
    onSubmit(): void {
      const {lessonsCount,day,className} = this.form.value;
  
      this.subscription = this.mainFuncService.createStudentDay(lessonsCount!,day!,className!).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(["/get-day-lessons-for-admin"],{ queryParams: { className }});
        },
        error: err => {
          if (err.status == 500) {
            this.errorMessage = err.error.message;
            this.isCreateStudentDayFailed = true;
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
