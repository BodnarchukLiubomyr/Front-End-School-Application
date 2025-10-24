import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../shared';
import { saveAs } from 'file-saver';
import { RxStompService } from '@stomp/ng2-stompjs';
import { IMessage } from '@stomp/stompjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MainFuncService {

  backendApi: string;

  constructor(
    private http: HttpClient,
    private rxStompService: RxStompService,
    env: ConfigService)
  {
    this.backendApi = env.config.backendApi;
  }

  createClass(classNumber: string, classLetter: string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-application/create-class',
      {
        classNumber,
        classLetter
      },
      httpOptions
    );
  }

  addUserToClass(email: string,className: string):Observable<any>{
    const params = new HttpParams()
    .set('email', email)
    .set('className', className);
    return this.http.post(
      this.backendApi + '/api/v1/school-application/add-user-to-class',
      null,
      { params, observe: 'response' }
    );
  }

  getClassUsers(className: string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-class-users/'+ className,
      {responseType: 'json'}
    );
  }

  deleteUser(lastname:string,firstname: string):Observable<any>{
    return this.http.delete(
      this.backendApi + '/api/v1/school-application/delete-user/'+ lastname + '/'+ firstname,
      {responseType:'json'}
    )
  }

  getClassName(subjectId: string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-classname/'+ subjectId,
      {responseType: 'text'}
    );
  }

  getClasses():Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-all-classes',
      {responseType: 'json'}
    );
  }

  transferUsersToNextClass(): Observable<any>{
    return this.http.put(
      this.backendApi+'/api/v1/school-application/transfer-users',
      { observe: 'response' }
    );
  }

  createSubject(subjectName: string, email: string, className: string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-application/create-subject',
      {
        subjectName,
        email,
        className
      },
      httpOptions
    );
  }

  getSubjects(userId: string, token: string): Observable<any> {
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-subjects/'+userId,
      { responseType: 'json' }
    );
  }

  getClassSubjects(className: string): Observable<any> {
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-class-subjects/'+className,
      { responseType: 'json' }
    );
  }

  updateSubject(userId:string,name:string,teacherLastname:string,teacherFirstname:string): Observable<any> {
    return this.http.post(
      this.backendApi + '/api/v1/school-application/update-subject/'+userId,
      {
        name,
        teacherLastname,
        teacherFirstname
      },
      httpOptions
    );
  }

  deleteSubject(subjectName:string):Observable<any>{
    return this.http.delete(
      this.backendApi + '/api/v1/school-application/delete-subject/'+ subjectName,
      {responseType:'json'}
    )
  }

  createExercise(name:string,description: string, date: string, className: string, subjectName: string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-application/create-exercise',
      {
        name,
        description,
        date,
        className,
        subjectName
      },
      httpOptions
    );
  }

  getExercises(subjectId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-exercises/'+subjectId,
      { responseType: 'json' }
    )
  }

  deleteExercise(exerciseName:string):Observable<any>{
    return this.http.delete(
      this.backendApi + '/api/v1/school-application/delete-exercise/'+ exerciseName,
      {responseType:'json'}
    )
  }

  uploadFile(userId: string, exerciseId:string,token: string,file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(
      this.backendApi+ '/api/v1/school-application/files/upload/' + userId+'/'+ exerciseId,
      formData,
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }),
        observe: 'response'
      }
    );
  }

  downloadFile(fileName: string): void{
   this.http.get(
      this.backendApi + '/api/v1/school-application/files/download/' + fileName,
      { responseType: 'blob' })
      .subscribe((response: Blob) => {
        saveAs(response, fileName);
      });
  }

  getFileWork(exerciseId: string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-works/'+ exerciseId,
      {responseType: "json"}
    )
  }

  getTeacherFileWork(exerciseId: string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-teacher-works/'+ exerciseId,
      {responseType: "json"}
    )
  }

  getStudentFileWork(userId: string,exerciseId:string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-student-file/'+ + userId+'/'+ exerciseId,
      {responseType: "json"}
    )
  }

  fileMarks(fileName: string, mark: string):Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-application/rate-file/'+ fileName,
      {mark: +mark},
      httpOptions
    )
  }

  getMark(userId: string,exerciseId:string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-mark/'+ userId+'/'+ exerciseId,
      {responseType: "json"}
    )
  }

  createGroup(groupName: string,subjectName: string,className: string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-application/create-group',
      {
        groupName,
        subjectName,
        className
      },
      httpOptions
    );
  }

  addUserToGroup(groupName: string,email: string, className:string):Observable<any>{
    const params = new HttpParams()
    .set('groupName', groupName)
    .set('email', email)
    .set('className',className);
    return this.http.post(
      this.backendApi + '/api/v1/school-application/add-user-to-group',
      null,
      { params, observe: 'response' }
    );
  }

  getGroup(subjectId: string, userId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-group/'+subjectId+'/'+userId,
      { responseType: 'json'}
    )
  }

  getGroups(subjectId: string, userId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-groups/'+subjectId+'/'+userId,
      { responseType: 'json'}
    )
  }

  getTeacherGroups(subjectId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-teacher-groups/'+subjectId,
      { responseType: 'json'}
    )
  }

  deleteGroup(groupName:string):Observable<any>{
    return this.http.delete(
      this.backendApi + '/api/v1/school-application/delete-group/'+groupName,
      {responseType:'json'}
    )
  }

  getGroupChatHistory(groupId: string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/group-history/'+groupId,
      {
        responseType: "json"
      }
    );
  }

  sendGroupMessage(groupId: string, userId: string, content: string): Observable<any> {
    return this.http.post(this.backendApi+'/api/v1/school-application/group-send/'+ groupId +'/'+ userId,
    {
      content,
      observe: 'response'
    },
      httpOptions
    );
  }

  getGroupUsers(groupId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/group-users/'+groupId,
      {
        responseType: "json"
      }
    );
  }

  createChat(userId: string,lastname: string,firstname: string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-application/create-chat/' + userId,
      {
        lastname,
        firstname
      },
      httpOptions
    );
  }

  getAllUserChats(userId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-chats/'+ userId,
      { responseType: "json"}
    );
  }

  getChatHistory(chatId: string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/chat/'+chatId,
      {
        responseType: "json"
      }
    );
  }
  
  subscribeToChatMessages(chatId: string): Observable<IMessage> {
    return this.rxStompService.watch(`/topic/chat/${chatId}`);
  }
  
  subscribeToGroupMessages(groupId: string): Observable<IMessage> {
    return this.rxStompService.watch(`/topic/group/${groupId}`);
  }

  sendPrivateChatMessage(chatId: string, userId: string, content: string): void {
    const messagePayload = { chatId, userId, content };
    this.rxStompService.publish({
      destination: `/app/chat/send`,
      body: JSON.stringify(messagePayload)
    });
  }
  
  sendGroupChatMessage(groupId: string, userId: string, content: string): void {
    const messagePayload = { groupId, userId, content };
    this.rxStompService.publish({
      destination: `/app/group/group-send`,
      body: JSON.stringify(messagePayload)
    });
  }

  createQuestion(testId: string,description: string,choices: string[],answers: string[],categoryName: string,totalMark: string,): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-application/create-question/' + testId,
      {
        description,
        choices,
        answers,
        categoryName,
        totalMark,
      },
      httpOptions
    );
  }

  getTestQuestions(testId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-test-questions/'+testId,
      {
        responseType: "json"
      }
    );
  }

  deleteQuestion(id:string):Observable<any>{
    return this.http.delete(
      this.backendApi + '/api/v1/school-application/delete-question/'+ id,
      {responseType:'json'}
    )
  }

  createEducationalTest(subjectId: string,testName: string,startTime: string,endTime: string,duration:string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-application/create-test/'+subjectId,
      {
        testName,
        startTime,
        endTime,
        duration
      },
      httpOptions
    );
  }

  getTests(subjectId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-tests/'+subjectId,
      {
        responseType: "json"
      }
    );
  }

  deleteTest(testId: string,testName:string):Observable<any>{
    return this.http.delete(
      this.backendApi + '/api/v1/school-application/delete-test/'+ testId+'/'+ testName,
      {responseType:'json'}
    )
  }

  createCategory(testId: string,name: string,mark: string,count:string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-application/create-category/'+testId,
      {
        name,
        mark,
        count
      },
      httpOptions
    );
  }

  getTestCategories(testId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-categories/'+testId,
      {
        responseType: "json"
      }
    );
  }

  deleteCategory(categoryId:string):Observable<any>{
    return this.http.delete(
      this.backendApi + '/api/v1/school-application/delete-category/'+ categoryId,
      {responseType:'json'}
    )
  }

  assignTestToUser(testId: string,userId: string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-application/assign-user/'+testId+'/'+userId,
      httpOptions
    );
  }

  submitTest(userTestId: string, answers: Record<string, string>): Observable<any> {
    return this.http.put(
      this.backendApi + '/api/v1/school-application/submit-test/' + userTestId,
      answers,
      { observe: 'response' }
    );
}

  getUserQuestions(testId: string,userId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-user-questions/'+testId+'/'+userId,
      {responseType:'json'}
    );
  }

  getTestResult(testId: string,userId: string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-test-result/'+testId+'/'+userId,
      {responseType:'json'}
    )
  }

  ifTestExist(testId: string,userId: string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/check-test-exist/'+testId+'/'+userId,
      {responseType:'json'}
    )
  }

  saveTestProgress(userId: string,testId: string,remainingTime: number,answers: Record<number, string>
  ) {
    return this.http.post(
      this.backendApi + '/api/v1/school-application/save-progress',
      {
        userId,
        testId,
        remainingTime,
        answers
      },
      httpOptions
    );
  }

  getUserTest(testId: string,userId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-user-test/'+testId+'/'+userId,
      {
        responseType: "json"
      }
    );
  }

  getTime(testId: string,userId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-time/'+testId+'/'+userId,
      {
        responseType: 'text'
      }
    );
  }

  autoSubmitTest(testId: string,userId: string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-application/auto-submit/'+testId+'/'+userId,
      httpOptions
    );
  }
  
  createLesson(studentDayId: string,lessonsOrder: string,startTime: string,className:string,subjectName:string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-application/create-lesson/'+studentDayId,
      {
        lessonsOrder,
        startTime,
        className,
        subjectName
      },
      httpOptions
    );
  }

  updateLesson(lessonId:string,lessonsOrder:string,startTime:string): Observable<any> {
    return this.http.post(
      this.backendApi + '/api/v1/school-application/update-lesson/'+lessonId,
      {
        lessonsOrder,
        startTime,
      },
      httpOptions
    );
  }

  getStudentDayLessons(userId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-lessons/'+userId,
      {
        responseType: "json"
      }
    );
  }

  getDayLessons(className: string): Observable<any>{
    const params = new HttpParams()
    .set('className', className);
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-day-lessons',
      { params, responseType: "json" }
    );
  }

  getTeacherLessons(userId: string): Observable<any>{
    const params = new HttpParams()
    .set('userId', userId);
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-lessons-for-teacher',
      { params, responseType: "json" }
    );
  }

  deleteLesson(lessonsOrder: string, studentDayId:string):Observable<any>{
    return this.http.delete(
      this.backendApi + '/api/v1/school-application/delete-lesson/'+lessonsOrder+'/'+studentDayId,
      {responseType:'json'}
    )
  }

  createStudentDay(lessonsCount: string,day: string,className: string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-application/create-studentDay',
      {
        lessonsCount,
        day,
        className
      },
      httpOptions
    );
  }

  updateStudentDay(studentDayId:string,lessonsCount:string,day:string): Observable<any> {
    return this.http.post(
      this.backendApi + '/api/v1/school-application/update-studentDay/'+studentDayId,
      {
        lessonsCount,
        day
      },
      httpOptions
    );
  }

  getTodayLessons(userId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-studentDay/'+userId,
      {
        responseType: "json"
      }
    );
  }

  deleteStudentDay(studentDayId:string,day:string):Observable<any>{
    return this.http.delete(
      this.backendApi + '/api/v1/school-application/delete-studentDay/'+studentDayId+'/'+ day,
      {responseType:'json'}
    )
  }
}


