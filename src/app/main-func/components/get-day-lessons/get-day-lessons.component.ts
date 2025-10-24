import { Component, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-get-day-lessons',
  templateUrl: './get-day-lessons.component.html',
  styleUrl: './get-day-lessons.component.scss'
})
export class GetDayLessonsComponent implements OnDestroy{
  @Input()
      userId='';
      className='';
  
      private subscription: Subscription;
    
      isGetLessonsFailed = false;
      errorMessage = '';
    
      lessons: any;
      studentDay:any;
      timeSlots: string[] = [];
    
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
          this.userId = this.storageService.getUser().id;
          if (this.userId && this.isStudent()) {
            this.getTodayLessons(this.userId);
          }
        });
      }
    
      closeErrorAlert() {
        this.isGetLessonsFailed = false;
      }
    
      getTodayLessons(userId: string): void {
        this.subscription = this.mainFuncService.getTodayLessons(userId)
        .subscribe({
          next: data => {
            this.studentDay = data;
            this.storageService.saveStudentDay(this.studentDay);
            this.lessons = this.studentDay.lessons;
            console.log('Lessons:', this.studentDay.lessons);
  
            const slotSet = new Set<string>();
            
              for (let lesson of this.lessons) {
                const slot = `${lesson.startTime} - ${lesson.endTime}`;
                slotSet.add(slot);
              }
  
            this.timeSlots = Array.from(slotSet).sort();
            console.log('Schedule slots:', this.timeSlots);
          },
          error: err => {
            if (err.status == 500) {
              this.errorMessage = err.error.message;
              this.isGetLessonsFailed = true;
            }
          }
        })
      }

      isStudent(): boolean {
        const userRole = this.storageService.getUser().role;
        console.log("Role:",userRole);
        return userRole === 'STUDENT';
      }
    
      ngOnDestroy(): void {
        this.subscription?.unsubscribe();
      }
}
