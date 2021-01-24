import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { User } from '../model/user.model'
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  // Url:String = 'https://shehaly-studio.herokuapp.com/'
  localhost: String = 'http://localhost:3000/'
  constructor(private http: HttpClient, private router: Router) { }

  private user = new BehaviorSubject<User>(null)
  public $user = this.user.asObservable()

  login(input) {

    return this.http.post<User>(this.localhost + 'users/login', {
      email: input.email,
      password: input.password
    }).pipe(
      catchError(this.handleError),
      tap(resData => {
        console.log(resData)
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
    return this.http.post(this.localhost + '/users', {
      email: Cred.email,
      password: Cred.password,
      name: Cred.name
    })
  }

  handleAuthentication(
    user,
    token,
    avatar
  ) {

    const newUser = new User(user, token, avatar)
    console.log(newUser)
    localStorage.setItem('user',JSON.stringify(newUser))
    localStorage.setItem('token',JSON.stringify(newUser.token))
    this.user.next(newUser)
  }

  autoLogin() {
    var user = JSON.parse(localStorage.getItem('user'))
    if(!user){
      return
    }
    this.router.navigate(['home']);
    this.user.next(user)
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
