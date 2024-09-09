import { Component, HostListener, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnDestroy{
  showMenu: Boolean = false;
  email: string = this.storageService.getUser().email;
  userId: string = this.storageService.getUser().id;
  firstname: string = this.storageService.getUser().firstname;
  lastname: string = this.storageService.getUser().lastname;
  errorMessage = '';
  private subscription: Subscription;

  constructor(
    private storageService: StorageService,
    private router: Router)
    {
      this.subscription = new Subscription();
    }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }

  isTeacher(): boolean {
    const userRole = this.storageService.getUser().role;
    console.log("Role:",userRole);
    return userRole === 'TEACHER';
  }

  isAdmin(): boolean {
    const userRole = this.storageService.getUser().role;
    console.log("Role:",userRole);
    return userRole === 'ADMIN';
  }

  isStudent(): boolean {
    const userRole = this.storageService.getUser().role;
    console.log("Role:",userRole);
    return userRole === 'STUDENT';
  }

  getChats(){
    this.router.navigate(['/get-chats',this.userId]);
  }

  onSignOut() {
    this.storageService.clean();
    this.router.navigate(['/log-in']);
    console.log("onSignOut method, clear localStorage");
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const menuElement = document.querySelector('.dropdown');

    if (menuElement && !menuElement.contains(targetElement)) {
      this.showMenu = false;
    }
  }
}
