import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../shared';
import { saveAs } from 'file-saver';

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

  getClass(className: string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-application/get-class/'+ className,
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
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }),
        responseType: 'json'
      }
    );
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
}
