import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import SockJS from 'sockjs-client';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private client!: Client;
  notificationSubject = new Subject<any>();
  notification$ = this.notificationSubject.asObservable();

  constructor(private toastr: ToastrService) {}

  connect(userId: number, groupIds: number[] = []): void {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
    });

    this.client.onConnect = () => {
      console.log('Connected to notification WebSocket');

      this.client.subscribe(`/topic/user/${userId}`, (message) => {
        if (message.body) this.handleIncomingNotification(message.body);
      });

      groupIds.forEach(groupId => {
        this.client.subscribe(`/topic/group/${groupId}`, (message) => {
          if (message.body) this.handleIncomingNotification(message.body);
        });
      });
    };

    this.client.activate();
  }

  private handleIncomingNotification(body: string): void {
    const notification = JSON.parse(body);
    this.notificationSubject.next(notification);
    this.toastr.info(notification.content, notification.title || 'Notification');
  }

  disconnect(): void {
    if (this.client) this.client.deactivate();
  }
}


