import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-file-sending',
  templateUrl: './file-sending.component.html',
  styleUrl: './file-sending.component.scss'
})
export class FileSendingComponent implements OnInit,OnDestroy{
  @Input()
  exerciseId: string = '';
  userId = '';
  token = '';

  @Output() UploadFileEvent = new EventEmitter<string>();
  fileName = '';
  errorMessage: string = '';
  processing = false;
  isFileUploaded = false;
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private location:Location
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.userId = this.storageService.getUser().id;
    this.token = this.storageService.getUser().token;
  }

  closeSuccessAlert() {
    this.isFileUploaded = false;
  }

  onDragOver(event: any) {
    event.preventDefault();
    this.processing = true;
  }

  onDropSuccess(event: any) {
    event.preventDefault();
    this.onFileDropped(event);
    this.processing = false;
  }

  onDragLeave(event: any) {
    event.preventDefault();
    this.processing = false;
  }

  onFileDropped(event: any): void {
    const files = event.dataTransfer.files;
    if (files.length === 1 && this.isFileTypeAllowed(files[0])) {
      this.uploadFile(files[0]);
    } else {
      this.showError('Please upload a valid file.');
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && this.isFileTypeAllowed(file)) {
      this.uploadFile(file);
    } else {
      this.showError('Please upload a valid file.');
    }
  }

  uploadFile(file: File): void {
    console.log(this.exerciseId)
    this.processing = true;
    if (file) {
      this.fileName = file.name;
      this.subscription = this.mainFuncService.uploadFile(this.userId,this.exerciseId,this.token,file)
        .subscribe({
          next: data => {
            this.processing = false;
            if (data.status === 'success') {
              console.log('The project has been successfully uploaded.');
              this.UploadFileEvent.emit(data.file);
              this.isFileUploaded = true;
              this.goBack();
            }
          },
          error: err => {
            this.processing = false;
            console.error('Error occurred during file upload:', err);
            this.showError('An unexpected error occurred during file upload.');
          }
        });
    }
  }

  private isFileTypeAllowed(file: File): boolean {
    const allowedTypes = ['.pdf', '.doc', '.docx', '.ppt', '.pptx'];
    const fileType = `.${file.name.split('.').pop()}`;
    return allowedTypes.includes(fileType.toLowerCase());
  }

  private showError(message: string): void {
    this.errorMessage = 'Error:' + message;
    // if (this.errorMessage) {
    //   this.errorMessage = 'Error:' + message;
    // }
  }

  goBack(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}