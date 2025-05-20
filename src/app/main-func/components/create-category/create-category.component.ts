import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent implements OnInit{
  form = this.fb.group({
    name: ['',{
      validators: [
        Validators.required,
        Validators.pattern(/^[A-Z].{0,59}$/),
        Validators.maxLength(60)
      ]
    }],
    mark: ['',{
      validators: [
        Validators.required
      ]
  }],
    count: ['',{
    validators: [
      Validators.required
    ]
}]
});

@Input()
testId = '';
isCreateCategoryFailed = false;
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
    this.testId = params['testId'];
  });
}

closeErrorAlert() {
  this.isCreateCategoryFailed= false;
}

onSubmit(testId:string): void {
    const {name,mark,count} = this.form.value;

    this.subscription = this.mainFuncService.createCategory(testId,name!,mark!,count!).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(["create-question/"+testId]);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isCreateCategoryFailed = true;
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
