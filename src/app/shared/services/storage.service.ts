import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const CLASS_NAME_KEY = 'className';
const EXERCISE_KEY = "exercise";
const SUBJECT_KEY = 'subject';
const FILE_KEY = 'file'
const EDUCATIONAL_TEST_KEY = "test";
const QUESTION_KEY = "question";
const USER_TEST_KEY = "userTest";
const TEST_SESSION_KEY = 'userTestSession';
const STUDENT_DAY_KEY = 'studentDay';

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

  public saveSubject(subject: any): void {
    window.localStorage.removeItem(SUBJECT_KEY);
    window.localStorage.setItem(SUBJECT_KEY, JSON.stringify(subject));
  }

  public getSubject(): any {
    const subject = window.localStorage.getItem(SUBJECT_KEY);
    if (subject) {
      return JSON.parse(subject);
    }
    return {};
  }

  public saveFile(file: any): void {
    window.localStorage.removeItem(FILE_KEY);
    window.localStorage.setItem(FILE_KEY, JSON.stringify(file));
  }

  public getFile(): any {
    const file = window.localStorage.getItem(FILE_KEY);
    if (file) {
      return JSON.parse(file);
    }
    return {};
  }

  public saveEducationalTest(test: any): void {
    window.localStorage.removeItem(EDUCATIONAL_TEST_KEY);
    window.localStorage.setItem(EDUCATIONAL_TEST_KEY, JSON.stringify(test));
  }

  public getEducationalTest(): any {
    const test = window.localStorage.getItem(EDUCATIONAL_TEST_KEY);
    if (test) {
      return JSON.parse(test);
    }
    return {};
  }

  public saveQuestion(question: any): void {
    window.localStorage.removeItem(QUESTION_KEY);
    window.localStorage.setItem(QUESTION_KEY, JSON.stringify(question));
  }

  public getQuestion(): any {
    const question = window.localStorage.getItem(QUESTION_KEY);
    if (question) {
      return JSON.parse(question);
    }

    return {};
  }

  public saveUserTest(userTest: any): void {
    window.localStorage.removeItem(USER_TEST_KEY);
    window.localStorage.setItem(USER_TEST_KEY, JSON.stringify(userTest));
  }

  public getUserTest(): any {
    const userTest = window.localStorage.getItem(USER_TEST_KEY);
    if (userTest) {
      return JSON.parse(userTest);
    }
    return {};
  }

  public saveTestSession(sessionData: any): void {
    window.localStorage.removeItem(TEST_SESSION_KEY);
    window.localStorage.setItem(TEST_SESSION_KEY, JSON.stringify(sessionData));
  }
  
  public getTestSession(): any {
    const session = window.localStorage.getItem(TEST_SESSION_KEY);
    if (session) {
      return JSON.parse(session);
    }
    return null;
  }
  
  public clearTestSession(): void {
    window.localStorage.removeItem(TEST_SESSION_KEY);
  }

  public saveStudentDay(studentDay: any): void {
    window.localStorage.removeItem(STUDENT_DAY_KEY);
    window.localStorage.setItem(STUDENT_DAY_KEY, JSON.stringify(studentDay));
  }

  public getStudentDay(): any {
    const studentDay = window.localStorage.getItem(STUDENT_DAY_KEY);
    if (studentDay) {
      return JSON.parse(studentDay);
    }
    return {};
  }
  
}
