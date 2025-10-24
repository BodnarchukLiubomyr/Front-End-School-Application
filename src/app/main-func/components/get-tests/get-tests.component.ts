import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { DeleteEducationalTestComponent } from '../delete-educational-test/delete-educational-test.component';

@Component({
  selector: 'app-get-tests',
  templateUrl: './get-tests.component.html',
  styleUrl: './get-tests.component.scss'
})
export class GetTestsComponent implements OnInit,OnDestroy{ 
  @Input()
  subjectId = '';
  userId = '';
  private subscription: Subscription;

  isGetTestsFailed = false;
  errorMessage = '';

  tests: any;
  usertests: { [testId: string]: any } = {};

  constructor(
    private mainFuncService: MainFuncService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private dialog: MatDialog
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.subjectId = params['subjectId'];
      this.userId = this.storageService.getUser().id;
      if (this.subjectId) {
        this.getTests(this.subjectId);
      }
    });
  }

  closeErrorAlert() {
    this.isGetTestsFailed = false;
  }

  getTests(subjectId: string): void {
    this.subscription = this.mainFuncService.getTests(subjectId)
    .subscribe({
      next: async data => {
        this.tests = data;
        console.log('Tests:', this.tests);
        this.subjectId = this.storageService.getSubject().id;
        for (let test of this.tests) {
          this.storageService.saveEducationalTest(test);
          this.mainFuncService.getUserTest(test.id, this.userId)
            .subscribe({
              next: async data => {
                if(data == null){
                  this.usertests[test.id]=null;
                }
                else{
                  const isUnfinished = await this.checkIfTestExists(test.id, this.userId);
                  this.usertests[test.id] = {
                  ...data,
                  isUnfinished
                };
                }
                console.log('User test:', this.usertests[test.id]);
              },
            });
        }

      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isGetTestsFailed = true;
        }
      }
    })
  }

  async checkIfTestExists(testId: string, userId: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.mainFuncService.ifTestExist(testId, userId).subscribe({
        next: (response) => resolve(response),
        error: () => resolve(false),
      });
    });
  }

  continueTest(testId: string, userId: string): void {
    this.router.navigate(['/assign-test', testId, userId], { queryParams: { continue: true } });
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

  onDelete(testId: string,testName: string): void{
    this.dialog.open(DeleteEducationalTestComponent, {
      data: {
        testId: testId,
        testName: testName
    },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
