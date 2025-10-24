import { Component, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-get-lessons',
  templateUrl: './get-lessons.component.html',
  styleUrl: './get-lessons.component.scss'
})
export class GetLessonsComponent implements OnDestroy{
    @Input()
    userId='';
    className='';

    private subscription: Subscription;
  
    isGetLessonsFailed = false;
    errorMessage = '';
  
    lessonsByDay: { [key: string]: any[] } = {};
    weekDays: string[] = [];
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
        if (this.userId) {
          this.getLessons(this.userId);
        }
      });
    }
  
    closeErrorAlert() {
      this.isGetLessonsFailed = false;
    }
  
    getLessons(userId: string): void {
      this.subscription = this.mainFuncService.getStudentDayLessons(userId)
      .subscribe({
        next: data => {
          this.lessonsByDay = data;
          console.log('Lessons:', this.lessonsByDay);
          this.weekDays = Object.keys(this.lessonsByDay);

          const slotSet = new Set<string>();
          for (let day of this.weekDays) {
            for (let lesson of this.lessonsByDay[day]) {
              const slot = `${lesson.startTime} - ${lesson.endTime}`;
              slotSet.add(slot);
            }
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

    isAdmin(): boolean {
      const userRole = this.storageService.getUser().role;
      console.log("Role:",userRole);
      return userRole === 'ADMIN';
    }
  
    ngOnDestroy(): void {
      this.subscription?.unsubscribe();
    }
}
