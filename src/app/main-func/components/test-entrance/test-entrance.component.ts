import { Component, Input } from '@angular/core';
import { DeleteQuestionComponent } from '../delete-question/delete-question.component';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-test-entrance',
  templateUrl: './test-entrance.component.html',
  styleUrl: './test-entrance.component.scss'
})
export class TestEntranceComponent {
  @Input()
  testId = '';
  questions: any;

  errorMessage = '';
  istestEntranceFailed = false;
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
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

  closeErrorAlert(){
    this.istestEntranceFailed = false;
  }

  getQuestions(testId: string): void {
    this.subscription = this.mainFuncService.getTestQuestions(testId)
    .subscribe({
      next: data => {
        console.log(data);
        this.questions = data;
        this.storageService.saveQuestion(data);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.istestEntranceFailed = true;
        }
      }
    });
  }

  onDelete(exerciseName: string): void {
    this.dialog.open(DeleteQuestionComponent, {
      data: {
        exerciseName:exerciseName }
    });
  }

  isTeacher(): boolean {
    const userRole = this.storageService.getUser().role;
    console.log("Role:",userRole);
    return userRole === 'TEACHER';
  }

  isStudent(): boolean {
    const userRole = this.storageService.getUser().role;
    console.log("Role:",userRole);
    return userRole === 'STUDENT';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
