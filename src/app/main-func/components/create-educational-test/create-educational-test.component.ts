import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-create-educational-test',
  templateUrl: './create-educational-test.component.html',
  styleUrl: './create-educational-test.component.scss'
})
export class CreateEducationalTestComponent implements OnInit, OnDestroy{
  form = this.fb.group({
    name: ['',{
      validators: [
        Validators.required,
        Validators.pattern(/^[A-Z].{0,59}$/),
        Validators.maxLength(60)
      ]
    }],
    startTime: ['',{
      validators: [
        Validators.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
      ]
    }],
    endTime: ['',{
      validators: [
        Validators.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
      ]
    }],
    duration: ['',{
      validators: [
      Validators.required, 
      Validators.pattern(/^PT(\d+H)?(\d+M)?(\d+S)?$/)
      ]
    }],
  });

  @Input()
  subjectId = '';
  isCreateTestFailed = false;
  errorMessage = '';
  private subscription: Subscription | undefined;

  constructor(
    private mainFuncService: MainFuncService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private location: Location
  ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.subjectId = params['subjectId'];
    });
  }

  closeErrorAlert() {
    this.isCreateTestFailed = false;
  }

  onSubmit(subjectId:string): void {
    const {name,startTime,endTime,duration} = this.form.value;
    this.subscription = this.mainFuncService.createEducationalTest(subjectId,name!,new Date(startTime!).toISOString().slice(0, 16), 
    new Date(endTime!).toISOString().slice(0, 16),duration!).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(["subject-view/"+subjectId]);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isCreateTestFailed = true;
        }
      }
    })
  }

  onDelete(categoryName: string): void{
    this.dialog.open(DeleteCategoryComponent, {
      data: {
        categoryName: categoryName
    },
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
