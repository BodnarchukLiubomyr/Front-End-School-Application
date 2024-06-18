import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-file-marks',
  templateUrl: './file-marks.component.html',
  styleUrl: './file-marks.component.scss'
})
export class FileMarksComponent implements OnInit,OnDestroy{
  form = this.fb.group({
    mark: ['',{
      validators: [
        Validators.required,
        Validators.pattern(/^(0|[1-9]|1[0-2])$/)
      ]
  }]});

  @Input()
  fileName = '';

  fileWork: any;
  errorMessage = '';
  private subscription: Subscription;
  isRateFileFailed = false;

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
      this.fileName = params['fileName'];
    });
  }

  closeErrorAlert() {
    this.isRateFileFailed = false;
  }

  rateFile(fileName: string): void{
    const {mark} = this.form.value;
    if (this.fileWork) {
      this.fileWork.mark = mark;

    this.subscription = this.mainFuncService.fileMarks(fileName,mark!)
    .subscribe({
      next: data => {
        console.log(data);
        this.isRateFileFailed = false;
        this.fileWork = data;
        console.log('Navigating to main-part');
        this.router.navigate(['main-part'])
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isRateFileFailed = true;
        }
      }
    });
    } else {
      this.fileWork = { mark: mark };
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
