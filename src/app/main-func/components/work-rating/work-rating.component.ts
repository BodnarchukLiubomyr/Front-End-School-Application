import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-work-rating',
  templateUrl: './work-rating.component.html',
  styleUrl: './work-rating.component.scss'
})
export class WorkRatingComponent implements OnInit,OnDestroy{

  @Input() tasks: any[] = [];
  exerciseId: string | undefined;
  fileName: string | undefined;

  fileWorks: any;
  errorMessage = '';
  isWorkRatingFailed = false;
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.exerciseId = params['exerciseId'];
      this.fileName = params['fileName'];
      if (this.exerciseId) {
        this.getFileWork(this.exerciseId);
      }
      if (this.fileName) {
        this.downloadFile(this.fileName);
      }
    });
  }

  closeErrorAlert(){
    this.isWorkRatingFailed = false;
  }

  getFileWork(exerciseId: string): void{
    this.subscription = this.mainFuncService.getFileWork(exerciseId)
    .subscribe({
      next: data => {
        console.log(data);
        this.fileWorks = data;
        this.isWorkRatingFailed = false;
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isWorkRatingFailed = true;
        }
      }
    });
  }

  downloadFile(fileName: string){
    console.log('Requesting file download for fileName:',fileName);
    if(fileName == null){
      console.error('File name is null or undefined');
    }
    else{
      this.mainFuncService.downloadFile(fileName)
    }
  }

  goBack(event: MouseEvent) {
    event.preventDefault();
    window.history.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
