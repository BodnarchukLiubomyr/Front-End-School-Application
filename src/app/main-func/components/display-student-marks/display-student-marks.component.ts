import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-display-student-marks',
  templateUrl: './display-student-marks.component.html',
  styleUrl: './display-student-marks.component.scss'
})
export class DisplayStudentMarksComponent implements OnInit,OnDestroy{
  @Input()
  parentsEmail='';
  subjectName='';
  private subscription: Subscription;
  errorMessage = '';
  isDisplayStudentMarksFailed = false;
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
    this.parentsEmail = params['parentsEmail'];
    this.subjectName = params['subjectName'];
    if (this.parentsEmail) {
      this.displayStudentMarks(this.parentsEmail);
    }
    });
  }

  closeErrorAlert() {
    this.isDisplayStudentMarksFailed = false;
  }

  displayStudentMarks(parentsEmail: string): void{
    this.subscription = this.mainFuncService.displayStudentMarks(parentsEmail,this.subjectName)
    .subscribe({
      next: data => {
        console.log(data);
        this.info= data;
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isDisplayStudentMarksFailed = true;
        }
      }
    });
  }

  ngOnDestroy(): void {
        this.subscription?.unsubscribe();
      }
}
