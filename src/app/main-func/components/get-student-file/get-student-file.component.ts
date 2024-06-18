import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-get-student-file',
  templateUrl: './get-student-file.component.html',
  styleUrl: './get-student-file.component.scss'
})
export class GetStudentFileComponent implements OnInit,OnDestroy{
  @Input()
  exerciseId: string = '';
  userId = '';

  fileWork: any;
  errorMessage = '';
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.userId = this.storageService.getUser().id;
    this.getTeacherFileWorks();
  }

  getTeacherFileWorks(): void{
    this.subscription = this.mainFuncService.getStudentFileWork(this.userId,this.exerciseId)
    .subscribe({
      next: data => {
        console.log(data);
        this.fileWork = data;
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
