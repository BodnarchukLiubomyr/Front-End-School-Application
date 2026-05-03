import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-delete-subgroups',
  templateUrl: './delete-subgroups.component.html',
  styleUrl: './delete-subgroups.component.scss'
})
export class DeleteSubgroupsComponent {
  subjectId = '';
      
  constructor(
    private mainFuncService: MainFuncService,
      
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<DeleteSubgroupsComponent>)
  {}
      
  ngOnInit(): void {
    this.subjectId = this.data.subjectId;
  }    
    
      deleteSubgroups() : void{
        this.mainFuncService.deleteSubgroups(this.subjectId).subscribe({
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
