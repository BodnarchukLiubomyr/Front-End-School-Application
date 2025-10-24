import { Component, Input, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';
import { StorageService } from '../../../shared';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrl: './create-lesson.component.scss'
})
export class CreateLessonComponent implements OnDestroy{
  form = this.fb.group({
    lessonsOrder: ['',{
            validators: [
            Validators.required
            ]
          }],
    startTime: ['',{
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
      subjectName: ['',{
            validators: [
            Validators.required,
            Validators.pattern(/^(?:[^A-Z]*[A-Z]?[^A-Z]*)?(?=.*[a-z])(?!\\d)(?!\\s).{1,}$/)
            ]
          }],
    });

    @Input()
    studentDayId = '';
    userId = '';
    isCreateLessonFailed = false;
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
      this.isCreateLessonFailed = false;
    }
  
    onSubmit(): void {
      const {lessonsOrder,startTime,className,subjectName} = this.form.value;
  
      this.subscription = this.mainFuncService.createLesson(this.studentDayId,lessonsOrder!,startTime!,className!,subjectName!).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/get-day-lessons-for-admin'], { queryParams: { className } });
        },
        error: err => {
          if (err.status == 500) {
            this.errorMessage = err.error.message;
            this.isCreateLessonFailed = true;
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
