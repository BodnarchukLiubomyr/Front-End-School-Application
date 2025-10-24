import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-delete-lesson',
  templateUrl: './delete-lesson.component.html',
  styleUrl: './delete-lesson.component.scss'
})
export class DeleteLessonComponent {
  lessonsOrder = '';
  studentDayId = '';
  
    constructor(
      private mainFuncService: MainFuncService,
  
      @Inject(MAT_DIALOG_DATA) public data:any,
      public dialogRef: MatDialogRef<DeleteLessonComponent>)
    {}
  
    ngOnInit(): void {
    this.lessonsOrder = this.data.lessonsOrder;
    this.studentDayId = this.data.studentDayId;
  }

  deleteLesson() : void{
    this.mainFuncService.deleteLesson(this.lessonsOrder,this.studentDayId).subscribe({
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
