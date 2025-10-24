import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-delete-day',
  templateUrl: './delete-day.component.html',
  styleUrl: './delete-day.component.scss'
})
export class DeleteDayComponent {
  studentDayId = '';
  day = '';
    
  constructor(
        private mainFuncService: MainFuncService,
    
        @Inject(MAT_DIALOG_DATA) public data:any,
        public dialogRef: MatDialogRef<DeleteDayComponent>)
      {}
    
      ngOnInit(): void {
      this.day = this.data.day;
  }
  
    deleteDay() : void{
      this.mainFuncService.deleteStudentDay(this.studentDayId,this.day).subscribe({
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
