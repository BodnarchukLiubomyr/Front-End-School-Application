import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-update-group-message',
  templateUrl: './update-group-message.component.html',
  styleUrl: './update-group-message.component.scss'
})
export class UpdateGroupMessageComponent {
  form = this.fb.group({
      content: ['', [
        Validators.required,
        Validators.maxLength(400)
      ]]
    });
  
    constructor(
      private fb: FormBuilder,
      private mainFuncService: MainFuncService,
      private dialogRef: MatDialogRef<UpdateGroupMessageComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {
        messageId: string;
        content: string;
      }
    ) {
      this.form.patchValue({ content: data.content });
    }
  
    save(): void {
      const content = this.form.value.content!;
      this.mainFuncService.updateGroupMessage(this.data.messageId, content)
        .subscribe(() => {
          this.dialogRef.close(content);
        });
    }
  
    cancel(): void {
      this.dialogRef.close();
    }
}
