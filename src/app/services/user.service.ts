import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { User } from '../model/user.model'
import { Router } from '@angular/router';
import { catchError, tap, map } from 'rxjs/operators';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {


  // Url:String = 'https://shehaly-studio.herokuapp.com/'
  localhost: String = environment.UrlAPI
  constructor(private http: HttpClient, private router: Router) { }

  private _user = new BehaviorSubject<User>({} as User)
  public $user = this._user.asObservable()


  get user (): User{
    return this._user.getValue();
  }
  
  
  set user(v : User) {
    this._user.next(v)
  }
  

  login(input) {

    return this.http.post<User>(this.localhost + 'users/login', {
      email: input.email,
      password: input.password
    }).pipe(
      catchError(this.handleError),
      tap(resData => {
        // console.log(resData)
        this.handleAuthentication(
          resData.user,
          resData.token,
          resData.avatar
        )
      })
    )
    // return this.http.get('http://localhost:3000/users')
  }

  signUp(Cred) {
    return this.http.post<User>(this.localhost + 'users', {
      email: Cred.email,
      password: Cred.password,
      name: Cred.name
    }).pipe(
      catchError(this.handleError),
      tap(resData => {
        // console.log(resData)
        this.handleAuthentication(
          resData.user,
          resData.token,
          resData.avatar
        )
      })
    )
  }

  logout(){
    return this.http.post(this.localhost+ 'users/logout', null)
    
  }

  logout_All(){
    return this.http.post(this.localhost+ 'users/logoutAll', null)
  }

  handleAuthentication(
    user,
    token,
    avatar
  ) {

    const newUser = new User(user, token, avatar)
    // console.log(newUser)
    localStorage.setItem('user',JSON.stringify(newUser))
    localStorage.setItem('token',JSON.stringify(newUser.token))
    this.user = newUser
  }

  autoLogin() {
    var user = JSON.parse(localStorage.getItem('user'))
    if(!user){
      return
    }
    this.router.navigate(['user-profile']);
    this.user = user
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

  getAvatar(){
    return this.http.get(this.localhost+'users/avatar',{ responseType: 'blob' })
  }

}
