import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {RegisterRequestPayload} from "./payload/registration.request.payload";
import {map, Observable, tap} from "rxjs";
import {LoginRequestPayload} from "./payload/login.request.payload";
import {AuthResponse} from "./payload/auth.response";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLogged$ = false;

  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) {

  }
  isLoggedIn(): boolean {

    if(this.localStorage.retrieve('jwttoken') != null){
      this.isLogged$ = true;
      return true;
    }
    this.isLogged$ = false;
    return false;
  }
  register( registerRequestPayload: RegisterRequestPayload ): Observable<any>{
    return this.httpClient.post('http://localhost:8081/api/v1/auth/register', registerRequestPayload, { responseType: 'text' });
  }
  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<AuthResponse>('http://localhost:8081/api/v1/auth/login', loginRequestPayload)
      .pipe(map(data => {
        this.localStorage.store('jwtToken', data.jwttoken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('role', data.role);
        console.log(data.username);

        return true;
      }));

  }

  getJwtToken() {
    return this.localStorage.retrieve('jwtToken');
  }



  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    }
    return this.httpClient.post<AuthResponse>('http://localhost:8081/api/auth/refreshToken', refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.store('authenticationToken', response.jwttoken);
      //  this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }
  //


  //
  getRefreshToken() {
    return this.localStorage.retrieve('refreshtoken');
  }
  //
  getUserName() {
    return this.localStorage.retrieve('username');
  }
//
  //

  logout() {
    this.localStorage.clear('jwttoken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshtoken');
    this.localStorage.clear('role');
  }

  getRole() {
    return this.localStorage.retrieve('role');
  }

}
