import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-delete-educational-test',
  templateUrl: './delete-educational-test.component.html',
  styleUrl: './delete-educational-test.component.scss'
})
export class DeleteEducationalTestComponent implements OnInit{
  testName = '';
  testId = '';

  constructor(
    private mainFuncService: MainFuncService,

    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<DeleteEducationalTestComponent>)
  {}

  ngOnInit(): void {
    this.testId = this.data.testId;
    this.testName = this.data.testName;
  }

  deleteTest() : void{
    this.mainFuncService.deleteTest(this.testId,this.testName).subscribe({
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
