import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.scss'
})
export class DeleteCategoryComponent implements OnInit{
  categoryName = '';

  constructor(
    private mainFuncService: MainFuncService,

    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<DeleteCategoryComponent>)
  {}

  ngOnInit(): void {
    this.categoryName = this.data.categoryName;
  }

  deleteCategory() : void{
    this.mainFuncService.deleteCategory(this.categoryName).subscribe({
      next: (data) => {
        console.log(data);
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onClose(){
    this.dialogRef.close(false);
  }
}
