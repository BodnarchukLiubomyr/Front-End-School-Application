import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { DeleteExerciseComponent } from '../..';

@Component({
  selector: 'app-subject-view',
  templateUrl: './subject-view.component.html',
  styleUrl: './subject-view.component.scss'
})
export class SubjectViewComponent implements OnInit,OnDestroy{

  @Input() tasks: any[] = [];
  subjectId: string | undefined;
  userId = '';
  token = '';

  exercises: any;
  errorMessage = '';
  issubjectViewFailed = false;
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
      this.subjectId = params['subjectId'];
      this.userId = this.storageService.getUser().id;
      this.token = this.storageService.getUser().token;

      if (this.subjectId) {
        this.getExercises(this.subjectId);
        // this.loadExercises();
      }
    });
  }

  closeErrorAlert(){
    this.issubjectViewFailed = false;
  }

  // loadExercises() {
  //   setInterval(() => {
  //     if (this.subjectId) {
  //       this.getExercises(this.subjectId);
  //     }
  //   }, 2000);
  // }

  getExercises(subjectId: string): void {
    this.subscription = this.mainFuncService.getExercises(subjectId)
    .subscribe({
      next: data => {
        console.log(data);
        this.exercises = data;
        this.storageService.saveExercise(data);
      },
      error: err => {
        if (err.status === 400) {
          this.showError('Bad Request: Please check your file.');
        }
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.issubjectViewFailed = true;
        }
      }
    });
  }

  onDelete(exerciseName: string): void {
    this.dialog.open(DeleteExerciseComponent, {
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

  showError(message: string): void {
    console.error('Error:', message);
    this.errorMessage = 'Error: ' + message;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
