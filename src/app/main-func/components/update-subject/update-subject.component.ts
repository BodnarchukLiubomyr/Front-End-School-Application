import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrl: './update-subject.component.scss'
})
export class UpdateSubjectComponent {
  form = this.fb.group({
    name: ['', {
      validators: [
        Validators.pattern(/^(?:[^A-Z]*[A-Z]?[^A-Z]*)?(?=.*[a-z])(?!\\d)(?!\\s).{1,}$/)
      ]
    }],
    teacherLastname: ['', {
      validators: [
        Validators.pattern(/^(?:[^A-Z]*[A-Z]?[^A-Z]*)?(?=.*[a-z])(?!\\d)(?!\\s).{1,}$/)
      ]
    }],
    teacherFirstname: ['', {
      validators: [
        Validators.pattern(/^(?:[^A-Z]*[A-Z]?[^A-Z]*)?(?=.*[a-z])(?!\\d)(?!\\s).{1,}$/)
      ]
    }],
  }
  );
  
  subjectId = '';
  isUpdateSubjectFailed = false;
  errorMessage = '';
  private subscription: Subscription | undefined;

  constructor(
    private mainFuncService: MainFuncService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location
  ) { }

  closeErrorAlert() {
    this.isUpdateSubjectFailed = false;
  }

  onSubmit(subjectId:string): void {
    const {name,teacherLastname,teacherFirstname} = this.form.value;

    this.subscription = this.mainFuncService.updateSubject(subjectId,name!,teacherLastname!,teacherFirstname!).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(["main-part"]);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isUpdateSubjectFailed = true;
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
