import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { DeleteUserComponent } from '../..';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-get-class-students',
  templateUrl: './get-class-students.component.html',
  styleUrl: './get-class-students.component.scss'
})
export class GetClassStudentsComponent implements OnInit,OnDestroy{

  @Input() tasks: any[] = [];
  className: string | undefined;
  private subscription: Subscription;

  isGetClassUsersFailed = false;
  errorMessage = '';

  schoolClass: any;

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
        this.getClassUsers(this.className);
      }
    });
  }

  closeErrorAlert() {
    this.isGetClassUsersFailed = false;
  }

  getClassUsers(className: string): void {
    this.subscription = this.mainFuncService.getClassUsers(className)
    .subscribe({
      next: data => {
        this.schoolClass = data;
        console.log('School Class:', this.schoolClass);
        this.className = this.storageService.getClassName();
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isGetClassUsersFailed = true;
        }
      }
    })
  }

  sortedSchoolClassUsers() {
    if (this.schoolClass && this.schoolClass.length > 0) {
      return this.schoolClass[0].users.sort((a: { lastname: string }, b: { lastname: string }) => a.lastname.localeCompare(b.lastname));
    } else {
      return [];
    }
  }

  onDelete(lastname: string,firstname: string): void{
    this.dialog.open(DeleteUserComponent, {
      data: {
        lastname: lastname,
        firstname: firstname
    },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
