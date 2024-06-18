import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-delete-exercise',
  templateUrl: './delete-exercise.component.html',
  styleUrl: './delete-exercise.component.scss'
})
export class DeleteExerciseComponent {
  exerciseName = '';

  constructor(
    private mainFuncService:MainFuncService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteExerciseComponent>)
    {}

  ngOnInit(): void {
    this.exerciseName = this.data.exerciseName;
  }

  deleteExercise() : void{
    this.mainFuncService.deleteExercise(this.exerciseName).subscribe({
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
