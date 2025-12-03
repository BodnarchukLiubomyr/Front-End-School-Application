import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { StorageService } from '../../../../shared';
import { MainFuncService } from '../../../services/main-func.service';
import { Location } from '@angular/common';
import { IMessage } from '@stomp/stompjs';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit,OnDestroy{
  @Input() tasks: any[] = [];
  chatId = '';
  chatHistory: { userName: string, message: string, timestamp: string }[] = [];
  newMessageContent: string = '';
  errorMessage = '';
  userId = '';
  message: string | undefined;
  isCreateChatFailed = false;

  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private location:Location)
    {
      this.subscription = new Subscription();
    }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.chatId = params['chatId'];
      this.userId = this.storageService.getUser().id;
      this.fetchChatHistory()
      this.subscribeToIncomingMessages();
    })
  }

  onMessageInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.newMessageContent = target.value || '';
  }

  fetchChatHistory() {
    this.subscription = this.mainFuncService.getChatHistory(this.chatId)
      .subscribe({
        next: (data: { user: { firstname: string, lastname: string }, content: string,timestamp: string }[]) => {
          console.log('Received data:', data);
          const newMessages = data.map((message) => ({
            userName: (message.user && `${message.user.firstname} ${message.user.lastname}`) || 'Unknown User',
            message: message.content,
            timestamp: message.timestamp
          }));
          
            this.mainFuncService.clearUnread(this.chatId, this.userId).subscribe(() => {
              this.notificationService.notificationSubject.next({
                chatId: Number(this.chatId),
                cleared: true,
                senderId: Number(this.userId)
              });
            });
            localStorage.removeItem(`chat-unread-${this.chatId}`);
          
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
    this.subscription = this.mainFuncService.subscribeToChatMessages(this.chatId)
      .subscribe((message: IMessage) => {
        const body = JSON.parse(message.body);
        const newMessage = {
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
    if (!this.newMessageContent.trim()) return;

    const messageContent = this.newMessageContent;
    this.newMessageContent = '';

    this.mainFuncService.sendPrivateChatMessage(this.chatId, this.userId, messageContent);
  }

  calculateMessageHeight(message: string): string {
    const lineHeight = 20;
    const lines = message.split('\n').length;
    const minHeight = 40;

    const calculatedHeight = Math.max(lines * lineHeight, minHeight);
    return `${calculatedHeight}px`;
  }

  goBack(event: MouseEvent) {
    event.preventDefault();
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
