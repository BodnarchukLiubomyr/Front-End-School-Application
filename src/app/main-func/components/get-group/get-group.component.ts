import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { DeleteGroupComponent } from '../delete-group/delete-group.component';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-get-group',
  templateUrl: './get-group.component.html',
  styleUrl: './get-group.component.scss'
})
export class GetGroupComponent implements OnInit,OnDestroy{
  @Input()
  subjectId = '';
  @Input()
  userId = '';
  unreadMap: { [chatId: number]: boolean } = {};
  currentUserId = 0;

  groups: any[] = [];
  errorMessage = '';
  isGetGroupFailed = false;
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.subjectId = params['subjectId'];
      this.userId = this.storageService.getUser().id;
      if(this.isStudent()){
        this.getGroup();
      }

      if(this.isTeacher()){
        this.getTeacherGroups();
      }
      this.subscription.add(
      this.notificationService.notification$.subscribe(n => {
        if (!n.chatId) return;
        if (n.senderId === this.currentUserId) return;
        if (n.cleared) {
          this.unreadMap[n.chatId] = false;
          localStorage.removeItem(`chat-unread-${n.chatId}`);
          return;
        }
        this.unreadMap[n.chatId] = true;
        localStorage.setItem(`chat-unread-${n.chatId}`, '1');
    }));
    });
  }

  claseErrorAlert(){
    this.isGetGroupFailed = false;
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

  getGroup(): void{
    this.subscription = this.mainFuncService.getGroups(this.subjectId,this.userId)
    .subscribe({
      next: data => {
        console.log(data);
        this.groups = data;
        this.mainFuncService.getUnreadChats(this.userId).subscribe((list: any[]) => {
          list.forEach(entry => {
            this.unreadMap[entry.chatId] = true;});
        });
        this.groups.forEach(group => {
          if (localStorage.getItem(`chat-unread-${group.id}`)) {
            console.log('Received notification in local Storage');
            this.unreadMap[group.id] = true;
          }
        });
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isGetGroupFailed = true;
        }
      }
    });
  }

  getTeacherGroups(): void{
    this.subscription = this.mainFuncService.getTeacherGroups(this.subjectId)
    .subscribe({
      next: data => {
        console.log(data);
        this.groups = data;
        this.mainFuncService.getUnreadChats(this.userId).subscribe((list: any[]) => {
          list.forEach(entry => {
            this.unreadMap[entry.chatId] = true;});
        });
        this.groups.forEach(group => {
          if (localStorage.getItem(`chat-unread-${group.id}`)) {
            console.log('Received notification in local Storage');
            this.unreadMap[group.id] = true;
          }
        });
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isGetGroupFailed = true;
        }
      }
    });
  }

  onDelete(groupName: string): void {
    const dialogRef = this.dialog.open(DeleteGroupComponent, {
      data: {
        groupName: groupName},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getGroup();
      }
    });
    // [routerLink]="['/delete-group', group.groupName]"
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
