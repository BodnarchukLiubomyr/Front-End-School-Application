import { Component, Input, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-lesson',
  templateUrl: './update-lesson.component.html',
  styleUrl: './update-lesson.component.scss'
})
export class UpdateLessonComponent implements OnDestroy{
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
    });

    @Input()
    lessonId = '';
    userId = '';
    isUpdateLessonFailed = false;
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
      this.lessonId = params['lessonId'];
    });
    this.userId = this.storageService.getUser().id;
  }
  
    closeErrorAlert() {
      this.isUpdateLessonFailed = false;
    }
  
    onSubmit(): void {
      const {lessonsOrder,startTime} = this.form.value;
  
      this.subscription = this.mainFuncService.updateLesson(this.lessonId,lessonsOrder!,startTime!).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(["get-lessons",this.userId]);
        },
        error: err => {
          if (err.status == 500) {
            this.errorMessage = err.error.message;
            this.isUpdateLessonFailed = true;
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
