import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-get-class',
  templateUrl: './get-class.component.html',
  styleUrl: './get-class.component.scss'
})
export class GetClassComponent implements OnInit,OnDestroy{
  @Input()
  className='';
  private subscription: Subscription;

  isGetClassUsersFailed = false;
  errorMessage = '';

  schoolClass: any;

  constructor(
    private mainFuncService: MainFuncService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
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
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isGetClassUsersFailed = true;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
