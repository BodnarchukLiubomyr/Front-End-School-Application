import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private appConfig!: any;

  constructor(private injector: Injector) { }

  loadAppConfig() {
    let http = this.injector.get(HttpClient);

    return firstValueFrom(http.get('/assets/env.json'))
      .then(value => {
        this.appConfig = value;
      })
  }

  get config() {
    return this.appConfig;
  }
}
