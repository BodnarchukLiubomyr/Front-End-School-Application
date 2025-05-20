import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-get-categories',
  templateUrl: './get-categories.component.html',
  styleUrl: './get-categories.component.scss'
})
export class GetCategoriesComponent {
  @Input()
  testId = '';

  @Output()
  categorySelected = new EventEmitter<string>(); 
  private subscription: Subscription;

  isGetCategoriesFailed = false;
  errorMessage = '';

  categories: any;

  constructor(
    private mainFuncService: MainFuncService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private dialog: MatDialog
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.testId = params['testId'];
      if (this.testId) {
        this.getCategories(this.testId);
      }
    });
  }

  closeErrorAlert() {
    this.isGetCategoriesFailed = false;
  }

  getCategories(testId: string): void {
    this.subscription = this.mainFuncService.getTestCategories(testId)
    .subscribe({
      next: data => {
        this.categories = data;
        console.log('Categories:', this.categories);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isGetCategoriesFailed = true;
        }
      }
    })
  }

  onCategoryChange(event: Event): void {
    const categoryName = (event.target as HTMLSelectElement).value;
    console.log('Selected category:', categoryName);
    this.categorySelected.emit(categoryName);
  }

  onDelete(categoryName: string): void{
    this.dialog.open(DeleteCategoryComponent, {
      data: {
        categoryName: categoryName
    },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
