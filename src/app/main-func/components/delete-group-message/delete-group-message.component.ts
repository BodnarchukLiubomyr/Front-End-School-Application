import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-delete-group-message',
  templateUrl: './delete-group-message.component.html',
  styleUrl: './delete-group-message.component.scss'
})
export class DeleteGroupMessageComponent {
  messageId = '';
      content= '';
      
        constructor(
          private mainFuncService: MainFuncService,
      
          @Inject(MAT_DIALOG_DATA) public data:any,
          public dialogRef: MatDialogRef<DeleteGroupMessageComponent>)
        {}
      
        ngOnInit(): void {
        this.messageId = this.data.messageId;
        this.content = this.data.content;
      }    
    
      deleteMessage() : void{
        this.mainFuncService.deleteGroupMessage(this.messageId,this.content).subscribe({
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
