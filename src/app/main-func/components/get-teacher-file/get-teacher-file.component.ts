import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-get-teacher-file',
  templateUrl: './get-teacher-file.component.html',
  styleUrl: './get-teacher-file.component.scss'
})
export class GetTeacherFileComponent implements OnInit,OnDestroy{
  @Input() tasks: any[] = [];
  fileName: string | undefined;

  @Input()
  exerciseId: string = ''

  // @Input() tasks: any[] = [];
  // exerciseId: string | undefined;
  // fileName: string | undefined;

  fileWorks: any;
  errorMessage = '';
  isGetTeacherFileFailed = false;
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.subscription = new Subscription();
  }

  closeErrorAlert(){
    this.isGetTeacherFileFailed = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fileName = params['fileName'];
      console.log(this.exerciseId);
      if (this.fileName) {
        this.downloadFile(this.fileName);
      }
    });
    this.getTeacherFileWorks();
  }

  // this.exerciseId = params['exerciseId'];

  getTeacherFileWorks(): void{
    this.subscription = this.mainFuncService.getTeacherFileWork(this.exerciseId)
    .subscribe({
      next: data => {
        console.log(data);
        this.fileWorks = data;
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isGetTeacherFileFailed = true
        }
      }
    });
  }

  downloadFile(fileName: string){
    console.log('Requesting file download for fileName:',fileName);
    if(fileName == null){
      console.error('File name is null or undefined');
    }
    else{
      this.mainFuncService.downloadFile(fileName)
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
