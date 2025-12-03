import { Component, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-exercise',
  templateUrl: './update-exercise.component.html',
  styleUrl: './update-exercise.component.scss'
})
export class UpdateExerciseComponent {
  form = this.fb.group({
      name: ['',{
      validators: [
        Validators.required,
        Validators.pattern(/^[A-Z].{0,59}$/),
        Validators.maxLength(60)
      ]
    }],
    description: ['',{
      validators: [
        Validators.required,
        Validators.pattern(/^[A-Z].{0,299}$/),
        Validators.maxLength(300)
      ]
    }],
    date: ['',{
      validators: [
      Validators.required
      ]
    }],
  });
  
      @Input()
      exerciseId = '';
      subjectId = '';
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
        this.exerciseId = params['exerciseId'];
      });
    }
    
      closeErrorAlert() {
        this.isUpdateLessonFailed = false;
      }
    
      onSubmit(): void {
        const {name,description, date} = this.form.value;
    
        this.subscription = this.mainFuncService.updateExercise(this.exerciseId,name!,description!, date!).subscribe({
          next: data => {
            console.log(data);
            this.subjectId = this.storageService.getSubject().id;
            this.router.navigate(["subject-view/"+this.subjectId]);
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
