import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-finish-subgroup',
  templateUrl: './finish-subgroup.component.html',
  styleUrl: './finish-subgroup.component.scss'
})
export class FinishSubgroupComponent implements OnInit,OnDestroy{
  form = this.fb.group({
      teacherLastname: ['', {
            validators: [
              Validators.pattern(/^(?:[^A-Z]*[A-Z]?[^A-Z]*)?(?=.*[a-z])(?!\\d)(?!\\s).{1,}$/)
            ]
          }],
          teacherFirstname: ['', {
            validators: [
              Validators.pattern(/^(?:[^A-Z]*[A-Z]?[^A-Z]*)?(?=.*[a-z])(?!\\d)(?!\\s).{1,}$/)
            ]
          }],
    
      });
  
      @Input() tasks: any[] = [];
      subgroupId = '';
      subjectId = '';
      isFinishSubgroupFailed = false;
      errorMessage = '';
      private subscription: Subscription | undefined
    
      constructor(
        private mainFuncService: MainFuncService,
        private storageService: StorageService,
        private router: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private location: Location
      ) { }
  
      ngOnInit(): void {
        this.route.params.subscribe((params) => {
          this.subgroupId = params['subgroupId'];
          this.subjectId = this.storageService.getSubject().id;
        }
    );
      }
    
      closeErrorAlert() {
        this.isFinishSubgroupFailed = false;
      }
    
      onSubmit(): void {
        const {teacherLastname,teacherFirstname} = this.form.value;
    
        this.subscription = this.mainFuncService.finishSubgroup(this.subgroupId,teacherLastname!,teacherFirstname!).subscribe({
          next: data => {
            console.log(data);
            this.router.navigate(["get-subgroups",this.subjectId]);
          },
          error: err => {
            if (err.status == 500) {
              this.errorMessage = err.error.message;
              this.isFinishSubgroupFailed = true;
            }
          }
        })
      }
    
      goBack(event: MouseEvent) {
        event.preventDefault();
        this.location.back();
      }
    
      ngOnDestroy(): void {
        this.subscription?.unsubscribe();
      }
}
