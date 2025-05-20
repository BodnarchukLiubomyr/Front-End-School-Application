import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-get-user-test',
  templateUrl: './get-user-test.component.html',
  styleUrl: './get-user-test.component.scss'
})
export class GetUserTestComponent implements OnInit,OnDestroy{
  @Input()
  testId = '';
  userId = '';

  currentQuestionIndex = 0;
  userQuestions: any[] = [];
  selectedAnswers: { id: string, answer: string | string[] }[] = [];
  userTest: any;
  errorMessage = '';
  totalScores = 0;
  circumference = 2 * Math.PI * 45;
  dataLoaded = false;

  duration:string = '';
  test: any;
  remainingTime!: number;
  timerSubscription!: Subscription;
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
      this.testId = params['testId'];
      this.userId = this.storageService.getUser().id;
    });
    this.route.queryParams.subscribe((queryParams) => {
      const isContinuing = queryParams['continue'] === 'true';

      if (isContinuing) {
        this.getUserTest(this.testId, this.userId);
      } else {
        this.assignTest(this.testId, this.userId);
      }
    });
  }

  startTimer(duration: string): void {
    this.saveProgressToServer();
    const timeInSeconds = this.formatTime(duration);
    this.remainingTime = timeInSeconds;
    if (this.timerSubscription && !this.timerSubscription.closed) {
      this.timerSubscription.unsubscribe();
    }    
    this.timerSubscription = interval(1000).subscribe(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        this.timerSubscription.unsubscribe();
        this.handleSubmit();
      }
    });
  }

  startRestoredTimer(duration: string): void {
    this.saveProgressToServer();
    const timeInSeconds = this.formatTime(duration);
    this.remainingTime = timeInSeconds;
    if (this.timerSubscription && !this.timerSubscription.closed) {
      this.timerSubscription.unsubscribe();
    }
  
    this.timerSubscription = interval(1000).subscribe(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        this.timerSubscription.unsubscribe();
        this.handleSubmit();
      }
    });
  }
  

  formatTime(duration: string): number {
    if (!duration) return 0;
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/);
    if (!match) return 0;
  
    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseFloat(match[3] || '0');
  
    return Math.round(hours * 3600 + minutes * 60 + seconds);
  }  

  formatRemainingTime(): string {
    if (!this.remainingTime || isNaN(this.remainingTime)) return '00:00';
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }
  
  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
  
  saveProgressToServer(): void {
    const answersObject: Record<string, string> = {};
    this.selectedAnswers.forEach(answer => {
      const formattedAnswer = Array.isArray(answer.answer) ? answer.answer.join(',') : answer.answer;
      answersObject[answer.id] = formattedAnswer;
    });
    this.mainFuncService.saveTestProgress(this.userId,this.testId,this.remainingTime,answersObject).subscribe({
      next: () => console.log('Progress saved to server with answers.',answersObject),
      error: err => console.error('Failed to save progress', err)
    });
  }

  assignTest(testId: string, userId: string): void {
    this.subscription = this.mainFuncService.assignTestToUser(testId, userId)
      .subscribe({
        next: data => {
          console.log("User Test Data:", data);
          this.userTest = data;
          this.storageService.saveUserTest(this.userTest);
          this.getUserQuestions(testId,userId);
          const testDuration = this.storageService.getEducationalTest().duration;
          this.startTimer(testDuration);
          this.mainFuncService.autoSubmitTest(testId, userId);
        },
        error: err => {
          if (err.status === 500) {
            this.errorMessage = err.error.message;
          }
        }
      });
  }

  getUserQuestions(testId: string,userId: string): void{
    this.subscription = this.mainFuncService.getUserQuestions(testId,userId)
    .subscribe({
      next: data => {
        console.log(data);
        this.userQuestions = data;
        if (this.userTest?.answers) {
          this.selectedAnswers = Object.entries(this.userTest.answers).map(([id, answer]: [string, any]) => {
            const answerArray = (typeof answer === 'string' && answer.includes(',')) ? answer.split(',') : answer;
            return {
              id,
              answer: Array.isArray(answerArray) ? answerArray : String(answerArray)
            };
          });
        }
        this.dataLoaded = true;
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
        }
      }
    });
  }

  getUserTest(testId: string,userId: string): void{
    this.subscription = this.mainFuncService.getUserTest(testId,userId)
    .subscribe({
      next: data => {
        console.log(data);
        this.userTest = data;
        this.storageService.saveUserTest(this.userTest);
        this.mainFuncService.getUserQuestions(testId, userId).subscribe({
          next: questions => {
            this.userQuestions = questions;
            if (this.userTest.answers) {
              this.selectedAnswers = Object.entries(this.userTest.answers).map(([id, answer]: [string, any]) => {
                const answerArray = (typeof answer === 'string' && answer.includes(',')) ? answer.split(',') : answer;
                return {
                  id,
                  answer: Array.isArray(answerArray) ? answerArray : String(answerArray)
                };
              });
            }
            this.dataLoaded = true;
          },
          error: err => {
            if (err.status === 500) {
              this.errorMessage = err.error.message;
            }
          }
        });
        this.mainFuncService.getTime(testId, userId).subscribe({
          next: (remainingDuration: string) => {
            console.log(remainingDuration);
            this.startRestoredTimer(remainingDuration);
          },
          error: err => {
            console.error('Failed to fetch time:', err);
          }
        });
        this.mainFuncService.autoSubmitTest(testId, userId);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
        }
      }
    });
  }

  onQuestionIndexChange(index: number) {
    this.currentQuestionIndex = index;
  }

  handleAnswerChange(questionId: string, answer: string | string[]): void {
    questionId = String(questionId);
    const existingAnswer = this.selectedAnswers.find(ans => ans.id === questionId);
    if (existingAnswer) {
      existingAnswer.answer = answer;
    } else 
    {
      this.selectedAnswers.push({ id: questionId, answer });
    }
  }

  isChecked(questionId: string, choice: string): boolean {
    questionId = String(questionId);
    const selectedAnswer = this.selectedAnswers.find(answer => answer.id === questionId);
    return Array.isArray(selectedAnswer?.answer)
      ? selectedAnswer.answer.includes(choice)
      : selectedAnswer?.answer === choice;
  }

  handleCheckboxChange(questionId: string, choice: string): void {
    questionId = String(questionId);
    let existingAnswer = this.selectedAnswers.find(answer => answer.id === questionId);
    if (existingAnswer) {
      if (Array.isArray(existingAnswer.answer)) {
        existingAnswer.answer = existingAnswer.answer.includes(choice)
        ? existingAnswer.answer.filter(ans => ans !== choice)
        : [...existingAnswer.answer, choice];
      }
    } else {
      this.selectedAnswers.push({ id: questionId, answer: [choice] });
    }
  }

  handleNextQuestion(): void {
    if (this.currentQuestionIndex < this.userQuestions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.handleSubmit();
    }
  }

  handlePreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  handleSubmit(): void {
    const answersObject: Record<string, string> = {};
    this.selectedAnswers.forEach(answer => {
      const formattedAnswer = Array.isArray(answer.answer) ? answer.answer.join(',') : answer.answer;
      answersObject[answer.id] = formattedAnswer;
    });
    console.log(`Your score is: ${this.totalScores}`);
    this.subscription = this.mainFuncService.submitTest(this.storageService.getUserTest().id,answersObject)
    .subscribe({
      next: data => {
        console.log(data);
        this.userTest = data;
        this.storageService.clearTestSession();
        this.router.navigate(['main-part'])
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
        }
      }
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: Event) {
    this.saveProgressToServer();
  }


  ngOnDestroy(): void {
    this.saveProgressToServer();
    this.subscription.unsubscribe();
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
