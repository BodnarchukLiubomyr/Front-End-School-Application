import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';
import { IMessage } from '@stomp/stompjs';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrl: './group-chat.component.scss'
})
export class GroupChatComponent implements OnInit, OnDestroy{
  @Input() tasks: any[] = [];
  groupId = '';
  chatHistory: { userName: string, message: string, timestamp: string }[] = [];
  userId = '';
  newMessageContent: any = '';
  message: string | undefined;
  errorMessage = '';
  groupUsers: any;

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private location:Location)
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
        next: (data: { user: { firstname: string, lastname: string }, content: string,timestamp: string }[]) => {
          console.log('Received data:', data);
          const newMessages = data.map((message) => ({
            userName: (message.user && `${message.user.firstname} ${message.user.lastname}`) || 'Unknown User',
            message: message.content,
            timestamp: message.timestamp
          }));

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
            userName: body.user?.firstname && body.user?.lastname
              ? `${body.user.firstname} ${body.user.lastname}`
              : body.sender || 'Unknown User',
            message: body.content,
            timestamp: body.timestamp
          };
          this.chatHistory.push(newMessage);
        });
    }

  sendMessage() {
    if (!this.newMessageContent.trim()) return;

    const messageContent = this.newMessageContent;
    this.newMessageContent = '';

    this.mainFuncService.sendGroupChatMessage(this.groupId, this.userId, messageContent);
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

  goBack(event: MouseEvent) {
    event.preventDefault();
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}