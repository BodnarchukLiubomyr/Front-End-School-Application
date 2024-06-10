import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';

@Component({
  selector: 'app-main-part',
  templateUrl: './main-part.component.html',
  styleUrl: './main-part.component.scss'
})
export class MainPartComponent implements OnInit{

  userId = '';
  userRole: string | undefined;
  roles: string[] = [];
  errorMessage = '';
  private subscription: Subscription;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private mainFuncService: MainFuncService,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.userId = this.storageService.getUser().id;
  }

  isAdmin(): boolean {
    const userRole = this.storageService.getUser().role;
    console.log("Role:",userRole);
    return userRole === 'ADMIN';
  }

  isTeacher(): boolean {
    const userRole = this.storageService.getUser().role;
    console.log("Role:",userRole);
    return userRole === 'TEACHER';
  }

  isStudent(): boolean {
    const userRole = this.storageService.getUser().role;
    console.log("Role:",userRole);
    return userRole === 'STUDENT';
  }

  navigateToSignUpUser():void{
    this.router.navigate(['sign-up'])
  }

  navigateToSignUpTeacher():void{
    this.router.navigate(['sign-up-teacher'])
  }

  navigateToCreateClass(){
    this.router.navigate(['create-class'])
  }

  navigateToAddUserToClass(){
    this.router.navigate(['add-user-to-class'])
  }

  navigateToFindClass(){
    this.router.navigate(['find-class'])
  }

  navigateToCreateSubject(): void {
    this.router.navigate(['create-subject']);
  }

  transferUsers(): void {
      this.subscription = this.mainFuncService.transferUsersToNextClass()
      .subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['main-part'])
        },
        error: err => {
          if (err.status == 500) {
            this.errorMessage = err.error.message;
          }
        }
      });
  }
}
