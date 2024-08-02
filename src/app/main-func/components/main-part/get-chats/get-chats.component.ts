import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../../shared';
import { MainFuncService } from '../../../services/main-func.service';

@Component({
  selector: 'app-get-chats',
  templateUrl: './get-chats.component.html',
  styleUrl: './get-chats.component.scss'
})
export class GetChatsComponent implements OnInit,OnDestroy{

  @Input()
  userId = '';
  userChats: any[] = [];

  errorMessage = '';
  isGetChatsFailed = true;
  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.userId = this.storageService.getUser().id;
    this.loadChats();
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
