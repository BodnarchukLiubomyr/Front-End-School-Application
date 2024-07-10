import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
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

  subjects: any[] = [];
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
        this.loadClassNames();
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isSubjectFailed = true;
        }
      }
    });
  }

  loadClassNames(): void {
    const classNameRequests = this.subjects.map(subject => 
      this.mainFuncService.getClassName(subject.id).toPromise().then(className => {
        subject.className = className;
      })
    );

    forkJoin(classNameRequests).subscribe(() => {
      console.log(this.subjects);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
