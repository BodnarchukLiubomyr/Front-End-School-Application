import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-get-student-subjects',
  templateUrl: './get-student-subjects.component.html',
  styleUrl: './get-student-subjects.component.scss'
})
export class GetStudentSubjectsComponent {
    @Input() 
    userId='';
    private subscription: Subscription;
  
    isGetClassSubjectsFailed = false;
    errorMessage = '';
  
    subjectNames: any;
    parentsEmail='';
  
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
        this.userId = this.storageService.getUser().id;
        if (this.userId) {
          this.getStudentSubjects(this.userId);
        }
      });
    }
  
    closeErrorAlert() {
      this.isGetClassSubjectsFailed = false;
    }
  
    getStudentSubjects(userId: string): void {
      this.subscription = this.mainFuncService.getStudentSubjects(userId)
      .subscribe({
        next: data => {
          this.subjectNames = data;
          console.log('Subjects:', this.subjectNames);
          this.parentsEmail = this.storageService.getUser().email;
          this.sortedSchoolClassUsers();
        },
        error: err => {
          if (err.status == 500) {
            this.errorMessage = err.error.message;
            this.isGetClassSubjectsFailed = true;
          }
        }
      })
    }
  
    sortedSchoolClassUsers() {
      if (this.subjectNames && this.subjectNames.length > 0) {
        return this.subjectNames[0].sort((a: { subjectName: string }, b: { subjectName: string }) => a.subjectName.localeCompare(b.subjectName));
      } else {
        return [];
      }
    }
  
    ngOnDestroy(): void {
      this.subscription?.unsubscribe();
    }
}
