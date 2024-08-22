import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainFuncService } from '../../services/main-func.service';
import { DeleteExerciseComponent } from '../delete-exercise/delete-exercise.component';

@Component({
  selector: 'app-delete-subject',
  templateUrl: './delete-subject.component.html',
  styleUrl: './delete-subject.component.scss'
})
export class DeleteSubjectComponent {
  subjectName = '';

  constructor(
    private mainFuncService:MainFuncService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteExerciseComponent>)
    {}

  ngOnInit(): void {
    this.subjectName = this.data.subjectName;
  }

  deleteSubject() : void{
    this.mainFuncService.deleteSubject(this.subjectName).subscribe({
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
