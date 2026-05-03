import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';
import { IMessage } from '@stomp/stompjs';
import { NotificationService } from '../../../shared/services/notification.service';
import { DeleteMessageComponent } from '../delete-message/delete-message.component';
import { UpdateMessageComponent } from '../update-message/update-message.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateGroupMessageComponent } from '../update-group-message/update-group-message.component';
import { DeleteGroupMessageComponent } from '../delete-group-message/delete-group-message.component';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrl: './group-chat.component.scss'
})
export class GroupChatComponent implements OnInit, OnDestroy{
  @Input() tasks: any[] = [];
  groupId = '';
  chatHistory: { id: string;userName: string, message: string, timestamp: string }[] = [];
  userId = '';
  newMessageContent: string = '';
  message: string | undefined;
  errorMessage = '';
  groupUsers: any;

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private mainFuncService: MainFuncService,
    private notificationService: NotificationService,
    private storageService: StorageService,
    private location:Location,
    private dialog: MatDialog)
    {
      this.subscription = new Subscription();
    }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.groupId = params['groupId'];
      this.userId = this.storageService.getUser().id;
      this.getChatHistory();
      this.getUsersOfGroup();
      this.subscribeToIncomingMessages();
    });
  }

  onMessageInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.newMessageContent = target.value || '';
  }

  getChatHistory(): void {
    this.subscription = this.mainFuncService.getGroupChatHistory(this.groupId)
      .subscribe({
        next: (data: {id: string;sender: string;content: string;timestamp: string; }[]) => {
          console.log('Received data:', data);
          const newMessages = data.map((message) => ({
            id: message.id,
            userName: message.sender ?? 'Unknown User',
            message: message.content,
            timestamp: message.timestamp
          }));

          this.mainFuncService.clearUnread(this.groupId, this.userId).subscribe(() => {
              this.notificationService.notificationSubject.next({
                chatId: Number(this.groupId),
                cleared: true,
                senderId: Number(this.userId)
              });
            });
            localStorage.removeItem(`chat-unread-${this.groupId}`);
          
          if (newMessages.length > this.chatHistory.length) {
            this.chatHistory = newMessages;
          }
          setTimeout(() => {
            const container = document.querySelector('.chat-history');
            if (container) container.scrollTop = container.scrollHeight;
          });
        },
        error: err => {
          if (err.status == 500) {
            this.errorMessage = err.error.message;
          }
        }
      });
  }

  subscribeToIncomingMessages(): void {
      this.subscription = this.mainFuncService.subscribeToGroupMessages(this.groupId)
        .subscribe((message: IMessage) => {
          const body = JSON.parse(message.body);
          const newMessage = {
            id: body.id,
            userName: body.user?.firstname && body.user?.lastname
              ? `${body.user.firstname} ${body.user.lastname}`
              : body.sender || 'Unknown User',
            message: body.content,
            timestamp: body.timestamp
          };
          this.chatHistory.push(newMessage);
        });
    }

  sendMessage(): void {
  if (!this.newMessageContent.trim()) 
    return; const messageContent = this.newMessageContent; 
    this.newMessageContent = '';

  this.mainFuncService.sendGroupMessage(this.groupId, this.userId, messageContent).subscribe({
      next: () => {
        
      },
      error: err => {
        console.error(err);
      }
    });;
}

  getUsersOfGroup(){
    this.subscription = this.mainFuncService.getGroupUsers(this.groupId)
    .subscribe({
      next: data => {
        this.groupUsers = data;
        console.log('Group:', this.groupUsers);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
        }
      }
    })
  }

  calculateMessageHeight(message: string): string {
      const lineHeight = 20;
      const lines = message.split('\n').length;
      const minHeight = 40;
  
      const calculatedHeight = Math.max(lines * lineHeight, minHeight);
      return `${calculatedHeight}px`;
    }
    
    onEditMessage(message: { id: string; message: string }) {
    const dialogRef = this.dialog.open(UpdateGroupMessageComponent, {
      width: '400px',
      data: {
        messageId: message.id,
        content: message.message
      }
    });
  
    dialogRef.afterClosed().subscribe((updatedContent?: string) => {
      if (updatedContent) {
        const msg = this.chatHistory.find(m => m.id === message.id);
        if (msg) {
          msg.message = updatedContent;
        }
      }
    });
  }
  
  
    onDeleteMessage(messageId: string,content: string) {
    this.dialog.open(DeleteGroupMessageComponent, {
          data: {
            messageId: messageId,
            content: content
        },
        });
  }

  goBack(event: MouseEvent) {
    event.preventDefault();
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}