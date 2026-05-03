import { Component, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrl: './update-test.component.scss'
})
export class UpdateTestComponent {
  form = this.fb.group({
      name: ['',{
            validators: [
              Validators.required,
              Validators.pattern(/^[A-Z].{0,59}$/),
              Validators.maxLength(60)
            ]
          }],
          startTime: ['',{
            validators: [
              Validators.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
            ]
          }],
          endTime: ['',{
            validators: [
              Validators.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
            ]
          }],
          duration: ['',{
            validators: [
            Validators.required, 
            Validators.pattern(/^PT(\d+H)?(\d+M)?(\d+S)?$/)
            ]
          }],
      });
  
      @Input()
      testId = '';
      subjectId = '';
      isUpdateTestFailed = false;
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
        this.testId = params['testId'];
        this.subjectId = this.storageService.getSubject().id;
      });
    }
    
      closeErrorAlert() {
        this.isUpdateTestFailed = false;
      }
    
      onSubmit(): void {
        const {name,startTime,endTime,duration} = this.form.value;
    
        this.subscription = this.mainFuncService.updateTest(this.testId,name!,new Date(startTime!).toISOString().slice(0, 16), 
        new Date(endTime!).toISOString().slice(0, 16),duration!).subscribe({
          next: data => {
            console.log(data);
            this.router.navigate(["subject-view",this.subjectId]);
          },
          error: err => {
            if (err.status == 500) {
              this.errorMessage = err.error.message;
              this.isUpdateTestFailed = true;
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
