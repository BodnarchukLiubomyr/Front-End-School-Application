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
export class AuthService {

  backendApi: string;

  constructor(
    private http: HttpClient,
    env: ConfigService)
  {
    this.backendApi = env.config.backendApi;
  }

  signUp(firstname: string,lastname: string,email: string, password: string, passwordConfirm: string): Observable<any> {
    return this.http.post(
      this.backendApi + '/api/v1/school-application/sign-up-student',
      {
        firstname,
        lastname,
        email,
        password,
        passwordConfirm
      },
      httpOptions
    );
  };

  signUpTeacher(firstname: string,lastname: string,email: string, password: string, passwordConfirm: string): Observable<any> {
    return this.http.post(
      this.backendApi + '/api/v1/school-application/sign-up-teacher',
      {
        firstname,
        lastname,
        email,
        password,
        passwordConfirm
      },
      httpOptions
    );
  };

  sendConfirmEmail(email: string): Observable<any> {
    return this.http.get(this.backendApi + '/api/v1/school-application/account/confirm/send-email/' + email,
    { observe: 'response' }
    );
  };

  confirmAccount(token: string): Observable<any> {
    return this.http.put(this.backendApi + '/api/v1/school-application/account/confirm/' + token,
    { responseType: 'json' });
  }

  logIn(email: string, password: string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-application/log-in',
      {
        email,
        password
      },
      httpOptions
    );
  }

  checkEmailAvailability(email: string): Observable<any>{
    const params = new HttpParams().set('email', email);
    return this.http.post(
      this.backendApi + '/api/v1/school-application/check-email',
      null,
      { params }
    );
  }

  forgotPassword(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.post(
      this.backendApi + '/api/v1/school-application/password/forgot',
      params,
      { observe: 'response' }
    );
  }

  checkToken(token:string): Observable<any> {
    const params = new HttpParams().set('token', token);
    return this.http.post(
      this.backendApi + '/api/v1/school-application/password/check-token',
      params,
      { responseType: 'json' }
    );
  }

  changePassword(newPassword: string, newPasswordConfirm: string, token: string): Observable<any> {
    const Options = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token}),
      params: new HttpParams().set('token', token),
      responseType: 'json' as 'json'
    };
    return this.http.post(
      this.backendApi + '/api/v1/school-application/password/change',
      {
        newPassword,
        newPasswordConfirm,
      },
      Options
    );
  }
}
