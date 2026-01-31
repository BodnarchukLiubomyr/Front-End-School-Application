import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-relation',
  templateUrl: './create-relation.component.html',
  styleUrl: './create-relation.component.scss'
})
export class CreateRelationComponent {
  form = this.fb.group({
      parentsEmail: ['', {
        validators: [
          Validators.required,
          Validators.pattern(/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/)
        ]
      }],
      studentEmail: ['', {
        validators: [
          Validators.required,
          Validators.pattern(/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/)
        ]
      }],
    }
    );
    private subscription: Subscription | undefined;
    isCreateRelationFailed = false;
    errorMessage = '';
  
    showPassword = false;
    showPasswordConfirm = false;
  
    constructor(
      private mainFuncService: MainFuncService,
      private router: Router,
      private location: Location,
      private fb: FormBuilder
    ) { }
  
    closeErrorAlert() {
      this.isCreateRelationFailed = false;
    }
  
    onSubmit(): void {
      const {parentsEmail, studentEmail } = this.form.value;
  
      this.subscription = this.mainFuncService.createRelation(parentsEmail!, studentEmail!)
        .subscribe({
          next: data => {
            this.router.navigate(['get-student-marks/', data.parentsEmail]);
          },
          error: err => {
            if (err.status == 500) {
              this.errorMessage = err.error.message;
              this.isCreateRelationFailed = true;
            }
          }
        });
    }
  
    goBack(event: MouseEvent) {
      event.preventDefault();
      this.location.back();
    }
  
    ngOnDestroy(): void {
      this.subscription?.unsubscribe();
    }
}
