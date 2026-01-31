import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-get-class-marks',
  templateUrl: './get-class-marks.component.html',
  styleUrl: './get-class-marks.component.scss'
})
export class GetClassMarksComponent implements OnInit,OnDestroy{
  @Input()
    subjectId='';
    private subscription: Subscription;
    errorMessage = '';
    isGetClassMarksFailed = false;
    info: any;
  
    constructor(
        private mainFuncService: MainFuncService,
        private router: Router,
        private route: ActivatedRoute,
        private storageService: StorageService,
    ){
      this.subscription = new Subscription();
    }
    
    ngOnInit(): void {
      this.route.params.subscribe((params) => {
      this.subjectId = params['subjectId'];
      if (this.subjectId) {
        this.getClassMarks(this.subjectId);
      }
      });
    }
  
    closeErrorAlert() {
      this.isGetClassMarksFailed = false;
    }
  
    getClassMarks(subjectId: string): void{
      this.subscription = this.mainFuncService.getClassMarks(subjectId)
      .subscribe({
        next: data => {
          console.log(data);
          this.info= data;
        },
        error: err => {
          if (err.status == 500) {
            this.errorMessage = err.error.message;
            this.isGetClassMarksFailed = true;
          }
        }
      });
    }

    getMark(userIndex: number, exerciseIndex: number): string {
      if (!this.info) return '-';
      const userId = this.info.userIds[userIndex];
      const exerciseId = this.info.exerciseIds[exerciseIndex];
      return this.info.marks?.[userId]?.[exerciseId] ?? '-';
    }


    getTestMark(userIndex: number, testIndex: number): string {
      if (!this.info) return '-';
      const userId = this.info.userIds[userIndex];
      const testId = this.info.testIds[testIndex];
      return this.info.testsMarks?.[userId]?.[testId] ?? '-';
    }
  
    ngOnDestroy(): void {
          this.subscription?.unsubscribe();
        }
}
