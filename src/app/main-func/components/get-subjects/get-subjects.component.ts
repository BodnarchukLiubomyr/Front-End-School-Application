import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { DeleteSubjectComponent } from '../delete-subject/delete-subject.component';

@Component({
  selector: 'app-get-subjects',
  templateUrl: './get-subjects.component.html',
  styleUrl: './get-subjects.component.scss'
})
export class GetSubjectsComponent implements OnInit, OnDestroy{
  @Input() tasks: any[] = [];
  className: string | undefined;
  private subscription: Subscription;

  isGetClassSubjectsFailed = false;
  errorMessage = '';

  subjects: any;

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
      this.className = params['className'];
      if (this.className) {
        this.getClassSubjects(this.className);
      }
    });
  }

  closeErrorAlert() {
    this.isGetClassSubjectsFailed = false;
  }

  getClassSubjects(className: string): void {
    this.subscription = this.mainFuncService.getClassSubjects(className)
    .subscribe({
      next: data => {
        this.subjects = data;
        console.log('Subjects:', this.subjects);
        this.className = this.storageService.getClassName();
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
    if (this.subjects && this.subjects.length > 0) {
      return this.subjects[0].sort((a: { subjectName: string }, b: { subjectName: string }) => a.subjectName.localeCompare(b.subjectName));
    } else {
      return [];
    }
  }

  onDelete(subjectName: string): void{
    this.dialog.open(DeleteSubjectComponent, {
      data: {
        subjectName: subjectName
    },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
