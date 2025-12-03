import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MainFuncService } from './main-func/services/main-func.service';
import { StorageService } from './shared';
import { NotificationService } from './shared/services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'front-end-school-application';

  private subscription = new Subscription();

  constructor(
    private notificationService: NotificationService,
    private storageService: StorageService,
    private mainFuncService: MainFuncService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    const lang = localStorage.getItem('lang') || 'en';
    translate.use(lang);
  }

  ngOnInit(): void {
    const user = this.storageService.getUser();

    this.mainFuncService.getUserGroups(user.id).subscribe(groups => {
      const groupIds = groups.map((g: any) => g.id);
      this.notificationService.connect(user.id, groupIds);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.notificationService.disconnect();
  }
}
