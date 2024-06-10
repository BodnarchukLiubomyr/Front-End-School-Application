import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../../shared';
import { MainFuncService } from '../../../services/main-func.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent implements OnInit, OnDestroy{

  @Input() tasks: any[] = [];
  userId = '';
  token = '';

  subjects: any;
  errorMessage = '';
  isSubjectFailed = false;
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.userId = this.storageService.getUser().id;
    this.token = this.storageService.getUser().token;
    if(this.userId){
      this.getSubjects(this.userId,this.token);
    }
  }

  closeErrorAlert(){
    this.isSubjectFailed = false;
  }

  getSubjects(userId: string,token: string): void {
    this.subscription = this.mainFuncService.getSubjects(userId,token)
    .subscribe({
      next: data => {
        console.log(data);
        this.subjects = data;
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isSubjectFailed = true;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
