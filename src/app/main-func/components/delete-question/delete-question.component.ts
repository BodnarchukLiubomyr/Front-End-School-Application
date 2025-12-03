import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrl: './delete-question.component.scss'
})
export class DeleteQuestionComponent {
  description = '';

  constructor(
    private mainFuncService: MainFuncService,

    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<DeleteQuestionComponent>)
  {}

  ngOnInit(): void {
    this.description = this.data.description;
  }

  deleteQuestion() : void{
    this.mainFuncService.deleteQuestion(this.description).subscribe({
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
