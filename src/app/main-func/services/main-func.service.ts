import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../shared';

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
}
