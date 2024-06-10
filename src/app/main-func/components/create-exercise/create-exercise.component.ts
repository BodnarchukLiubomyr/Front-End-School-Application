import { Component, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrl: './create-exercise.component.scss'
})
export class CreateExerciseComponent implements OnDestroy{
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

  isCreateExerciseFailed = false;
  errorMessage = '';
  private subscription: Subscription | undefined;

  constructor(
    private mainFuncService: MainFuncService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location
  ) { }

  closeErrorAlert() {
    this.isCreateExerciseFailed = false;
  }

  onSubmit(): void {
    const {name,description, date, className,subjectName} = this.form.value;

    this.subscription = this.mainFuncService.createExercise(name!,description!,date!,className!,subjectName!).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(["main-part"]);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isCreateExerciseFailed = true;
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
