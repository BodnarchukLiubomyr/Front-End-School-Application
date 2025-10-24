import { Component, Input, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-day',
  templateUrl: './update-day.component.html',
  styleUrl: './update-day.component.scss'
})
export class UpdateDayComponent implements OnDestroy{
  form = this.fb.group({
    lessonsCount: ['',{
            validators: [
            Validators.required
            ]
          }],
    day: ['',{
            validators: [
            Validators.required
            ]
          }],
    });

    @Input()
    studentDayId = '';
    userId = '';
    isUpdateStudentDayFailed = false;
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
    this.route.params.subscribe((params) => {
      this.studentDayId = params['studentDayId'];
    });
    this.userId = this.storageService.getUser().id;
  }
  
    closeErrorAlert() {
      this.isUpdateStudentDayFailed = false;
    }
  
    onSubmit(): void {
      const {lessonsCount,day} = this.form.value;
  
      this.subscription = this.mainFuncService.updateStudentDay(this.studentDayId,lessonsCount!,day!).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(["get-lessons",this.userId]);
        },
        error: err => {
          if (err.status == 500) {
            this.errorMessage = err.error.message;
            this.isUpdateStudentDayFailed = true;
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
