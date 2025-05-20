import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-get-test-result',
  templateUrl: './get-test-result.component.html',
  styleUrl: './get-test-result.component.scss'
})
export class GetTestResultComponent implements OnInit,OnDestroy{
  @Input()
  testId: string = '';

  @Input()
  userId = '';
  subjectId = '';

  userTest: any;
  errorMessage = '';
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = this.storageService.getUser().id;
      this.subjectId = this.storageService.getSubject().id;
      this.getTestResult();
    });
  }

  getTestResult(): void{
    this.subscription = this.mainFuncService.getTestResult(this.userId,this.testId)
    .subscribe({
      next: data => {
        console.log(data);
        this.userTest = data;
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
