import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';
import { StorageService } from '../../../shared';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.scss'
})
export class CreateSubjectComponent {
  form = this.fb.group({
    subjectName: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^(?:[^A-Z]*[A-Z]?[^A-Z]*)?(?=.*[a-z])(?!\\d)(?!\\s).{1,}$/)
      ]
    }],
    email: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/)
      ]
    }],
    className: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^(0?[1-9]|1[0-1])-[A-D]$/)
      ]
    }],
    hasSubgroups: [false],
    groupAmount: [{ value: '', disabled: true }, [
    Validators.required,
    Validators.min(2)
  ]],
  }
  );

  isCreateSubjectFailed = false;
  errorMessage = '';
  private subscription: Subscription | undefined;

  constructor(
    private mainFuncService: MainFuncService,
    private router: Router,
    private fb: FormBuilder,
    private storageService: StorageService,
    private location: Location
  ) { }

  closeErrorAlert() {
    this.isCreateSubjectFailed = false;
  }

  ngOnInit(): void {

  this.form.get('hasSubgroups')?.valueChanges.subscribe(value => {

    const numberControl = this.form.get('groupAmount');

    if (value) {
      numberControl?.enable();
    } else {
      numberControl?.disable();
      numberControl?.setValue('');
    }

  });

}

  onSubmit(): void {
    const { subjectName, email, className, hasSubgroups, groupAmount } = this.form.getRawValue();
    this.subscription = this.mainFuncService.createSubject(subjectName!,email!,className!,hasSubgroups!,groupAmount!).subscribe({
      next: data => {
        console.log(data);
        if(data.hasSubgroups == true){
          console.log(data.id);
          this.storageService.saveSubject(data);
          this.router.navigate(["get-subgroups/"+data.id]);
        }
        else
          this.router.navigate(["main-part"]);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isCreateSubjectFailed = true;
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
