import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrl: './group-chat.component.scss'
})
export class GroupChatComponent implements OnInit, OnDestroy{
  @Input() tasks: any[] = [];
  groupId = '';
  chatHistory: { userName: string, message: string }[] = [];
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
    });
  }

  onMessageInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.newMessageContent = target.value || '';
  }

  loadChatHistory() {

    this.getChatHistory();
    setInterval(() => {
      this.getChatHistory();
    }, 2000);
  }

  getChatHistory(): void {
    this.subscription = this.mainFuncService.getGroupChatHistory(this.groupId)
      .subscribe({
        next: (data: { content: string, sender: string, timestamp: string }[]) => {
          console.log('Received data:', data);
          const newMessages = data.map((message) => ({
            userName: message.sender || 'Unknown User',
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

    this.subscription = this.mainFuncService.sendGroupMessage(this.groupId, this.userId, messageContent)
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