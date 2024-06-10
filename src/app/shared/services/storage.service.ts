import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const CLASS_NAME_KEY = 'className';
const EXERCISE_KEY = "exercise";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    window.localStorage.clear();
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  public saveClassName(className: any): void {
    window.localStorage.removeItem(CLASS_NAME_KEY);
    window.localStorage.setItem(CLASS_NAME_KEY, JSON.stringify(className));
  }

  public getClassName(): any {
    return window.localStorage.getItem(CLASS_NAME_KEY);
  }

  public saveExercise(exercise: any): void {
    window.localStorage.removeItem(EXERCISE_KEY);
    window.localStorage.setItem(EXERCISE_KEY, JSON.stringify(exercise));
  }

  public getExercise(): any {
    const exercise = window.localStorage.getItem(EXERCISE_KEY);
    if (exercise) {
      return JSON.parse(exercise);
    }

    return {};
  }
}
