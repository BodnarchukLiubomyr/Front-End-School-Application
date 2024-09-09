import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../../shared';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.scss'
})
export class TranslateComponent implements OnInit{
  lang:string ='';

  constructor(
    private storageService: StorageService,
    private router: Router,
    private translateService:TranslateService)
  {}

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
  }

  ChangeLang(lang:any){
    const selectedLanguage = lang.target.value;

    localStorage.setItem('lang',selectedLanguage);

    this.translateService.use(selectedLanguage);
  }
}
