import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrl: './delete-group.component.scss'
})
export class DeleteGroupComponent implements OnInit{
  groupName = '';

  constructor(
    private mainFuncService:MainFuncService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteGroupComponent>)
    {}

  ngOnInit(): void {
    this.groupName = this.data.groupName;
  }

  deleteGroup() : void{
    this.mainFuncService.deleteGroup(this.groupName).subscribe({
      next: (data) => {
        console.log(data);
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  closeDialog(): void{
    this.dialogRef.close(false);
  }
}
