import { Component, Inject, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-message',
  templateUrl: './update-message.component.html',
  styleUrl: './update-message.component.scss'
})
export class UpdateMessageComponent {
  form = this.fb.group({
    content: ['', [
      Validators.required,
      Validators.maxLength(400)
    ]]
  });

  constructor(
    private fb: FormBuilder,
    private mainFuncService: MainFuncService,
    private dialogRef: MatDialogRef<UpdateMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      messageId: string;
      content: string;
    }
  ) {
    this.form.patchValue({ content: data.content });
  }

  save(): void {
    const content = this.form.value.content!;
    this.mainFuncService.updateMessage(this.data.messageId, content)
      .subscribe(() => {
        this.dialogRef.close(content);
      });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
