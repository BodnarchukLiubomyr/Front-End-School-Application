import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../../shared';
import { MainFuncService } from '../../../services/main-func.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-get-chats',
  templateUrl: './get-chats.component.html',
  styleUrl: './get-chats.component.scss'
})
export class GetChatsComponent implements OnInit,OnDestroy{
  @Input()
  userId = '';
  userChats: any[] = [];
  unreadMap: { [chatId: number]: boolean } = {};
  currentUserId = 0;

  errorMessage = '';
  isGetChatsFailed = true;
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private notificationService: NotificationService
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.userId = this.storageService.getUser().id;
    const user = this.storageService.getUser();
    this.currentUserId = user.id;
    this.loadChats();
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
  }

  closeErrorAlert(){
    this.isGetChatsFailed = false;
  }

  loadChats(): void {
    this.subscription = this.mainFuncService.getAllUserChats(this.userId)
    .subscribe({
      next: data => {
        console.log(data);
        this.userChats = data;
        this.mainFuncService.getUnreadChats(this.userId).subscribe((list: any[]) => {
          list.forEach(entry => {
            this.unreadMap[entry.chatId] = true;});
        });
        this.userChats.forEach(chat => {
          if (localStorage.getItem(`chat-unread-${chat.id}`)) {
            console.log('Received notification in local Storage');
            this.unreadMap[chat.id] = true;
          }
        });
        this.isGetChatsFailed = false;
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isGetChatsFailed=true;
        }
      }
      }
    );
  }

  getOtherUser(chat: any) {
    return chat.users.find((u: any) => u.id !== this.currentUserId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
