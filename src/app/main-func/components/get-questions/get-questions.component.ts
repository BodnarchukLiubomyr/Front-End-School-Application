import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { DeleteQuestionComponent } from '../delete-question/delete-question.component';

@Component({
  selector: 'app-get-questions',
  templateUrl: './get-questions.component.html',
  styleUrl: './get-questions.component.scss'
})
export class GetQuestionsComponent implements OnInit,OnDestroy{
  @Input()
  testId = '';
  private subscription: Subscription;

  isGetTestsFailed = false;
  errorMessage = '';

  questions: any;

  constructor(
    private mainFuncService: MainFuncService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private dialog: MatDialog
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.testId = params['testId'];
      if (this.testId) {
        this.getQuestions(this.testId);
      }
    });
  }

  closeErrorAlert() {
    this.isGetTestsFailed = false;
  }

  getQuestions(testId: string): void {
    this.subscription = this.mainFuncService.getTestQuestions(testId)
    .subscribe({
      next: data => {
        this.questions = data;
        console.log('Questions:', this.questions);
        this.questions = this.storageService.getEducationalTest().id;
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isGetTestsFailed = true;
        }
      }
    })
  }

  onDelete(questionName: string): void{
    this.dialog.open(DeleteQuestionComponent, {
      data: {
        questionName: questionName
    },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
