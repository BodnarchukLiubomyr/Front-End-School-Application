import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-delete-message',
  templateUrl: './delete-message.component.html',
  styleUrl: './delete-message.component.scss'
})
export class DeleteMessageComponent {
    messageId = '';
    content= '';
    
      constructor(
        private mainFuncService: MainFuncService,
    
        @Inject(MAT_DIALOG_DATA) public data:any,
        public dialogRef: MatDialogRef<DeleteMessageComponent>)
      {}
    
      ngOnInit(): void {
      this.messageId = this.data.messageId;
      this.content = this.data.content;
    }    
  
    deleteMessage() : void{
      this.mainFuncService.deleteMessage(this.messageId,this.content).subscribe({
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
