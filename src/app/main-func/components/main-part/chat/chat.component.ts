import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../../shared';
import { MainFuncService } from '../../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit,OnDestroy{
  @Input() tasks: any[] = [];
  chatId = '';
  chatHistory: { userName: string, message: string }[] = [];
  newMessageContent: any = '';
  errorMessage = '';
  userId = '';
  message: string | undefined;
  isCreateChatFailed = false;

  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private location:Location)
    {
      this.subscription = new Subscription();
    }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.chatId = params['chatId'];
      this.userId = this.storageService.getUser().id;
      this.loadChatHistory();
    })
  }

  onMessageInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.newMessageContent = target.value || '';
  }

  loadChatHistory() {

    this.fetchChatHistory();
    setInterval(() => {
      this.fetchChatHistory();
    }, 2000);
  }

  fetchChatHistory() {
    this.subscription = this.mainFuncService.getChatHistory(this.chatId)
      .subscribe({
        next: (data: { user: { firstname: string, lastname: string }, content: string }[]) => {
          console.log('Received data:', data);
          const newMessages = data.map((message) => ({
            userName: (message.user && `${message.user.firstname} ${message.user.lastname}`) || 'Unknown User',
            message: message.content
          }));

          if (newMessages.length > this.chatHistory.length) {
            this.chatHistory = newMessages;
          }
        },
        error: err => {
          if (err.status == 500) {
            this.errorMessage = err.error.message;
          }
        }
      });
  }

  sendMessage() {

    const messageContent = this.newMessageContent;
    this.newMessageContent = '';

    this.subscription = this.mainFuncService.sendMessage(this.chatId, this.userId, messageContent)
    .subscribe({
        next: data => {
          const newMessage = {
            userName: (data.user && `${data.user.firstname} ${data.user.lastname}`) || 'Unknown User',
            message: data.content
          };
          console.log(newMessage)
          console.log('Message sent:', data);

          this.chatHistory.unshift(newMessage);
        },
        error: err => {
          if (err.status == 500) {
            this.errorMessage = err.error.message;
          }
        }
      }
    );
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
