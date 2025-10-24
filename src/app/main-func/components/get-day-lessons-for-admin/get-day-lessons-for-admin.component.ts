import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { DeleteDayComponent } from '../delete-day/delete-day.component';
import { DeleteLessonComponent } from '../delete-lesson/delete-lesson.component';

@Component({
  selector: 'app-get-day-lessons-for-admin',
  templateUrl: './get-day-lessons-for-admin.component.html',
  styleUrl: './get-day-lessons-for-admin.component.scss'
})
export class GetDayLessonsForAdminComponent implements OnDestroy{
      @Input()
      className='';
      userId='';
  
      private subscription: Subscription;
    
      isGetLessonsFailed = false;
      errorMessage = '';
    
      lessonsByDay: { [key: string]: any[] } = {};
      studentDays:any;
      lessons: any;
      weekDays: any;
      timeSlots: string[] = [];
    
      constructor(
        private mainFuncService: MainFuncService,
        private router: Router,
        private route: ActivatedRoute,
        private storageService: StorageService,
        private dialog: MatDialog
      ) {
        this.subscription = new Subscription();
      }
    
      ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
          if (params['className']) {
            this.getDayLessons(params['className']);
          }
          if (params['userId']) {
            this.getTeacherLessons(params['userId']);
          }
        });
      }

      closeErrorAlert() {
        this.isGetLessonsFailed = false;
      }
      
      getDayLessons(className: string): void {
        this.className = className;
        this.subscription = this.mainFuncService.getDayLessons(className)
        .subscribe({next: data => {
          this.studentDays = data;
          console.log('StudentDays:', this.studentDays);
          
          const slotSet = new Set<string>();
          for (let studentDay of this.studentDays) {
            for (let lesson of studentDay.lessons) {
            const slot = `${lesson.startTime} - ${lesson.endTime}`;
            slotSet.add(slot);
          }
        }
        this.timeSlots = Array.from(slotSet).sort();
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isGetLessonsFailed = true;
        }
      }
    });
  }

  getTeacherLessons(userId: string): void {
      this.subscription = this.mainFuncService.getTeacherLessons(userId)
      .subscribe({
        next: data => {
          this.studentDays = data;
          console.log('Lessons:', this.studentDays);

          const slotSet = new Set<string>();
          for (let studentDay of this.studentDays) {
            for (let lesson of studentDay.lessons) {
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

    getLesson(lessons: any[], order: number) {
      return lessons.find(l => l.lessonsOrder === order);
    }

    isAdmin(): boolean {
        const userRole = this.storageService.getUser().role;
        console.log("Role:",userRole);
        return userRole === 'ADMIN';
    }

    onDeleteLesson(lessonsOrder: string, studentDayId:string): void{
          this.dialog.open(DeleteLessonComponent, {
            data: {
              lessonsOrder: lessonsOrder,
              studentDayId: studentDayId
          },
          });
    }

    onDeleteDay(studentDayId: string, day:string): void{
          this.dialog.open(DeleteDayComponent, {
            data: {
              studentDayId: studentDayId,
              day: day
          },
      });
    }

    ngOnDestroy(): void {
      this.subscription?.unsubscribe();
    }
}
