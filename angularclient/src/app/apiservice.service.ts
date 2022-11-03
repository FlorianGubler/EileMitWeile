import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {JWTTokenResponse} from "./jwttoken-response";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _isAuthenticated: boolean;
  private baseURL: String = "/api";
  private _jwtToken: JWTTokenResponse | undefined;
  private _sessionUser: User | undefined;

  constructor(private http: HttpClient) {
    this._isAuthenticated = false;
    //Load JwtToken from localStorage
    var jwttoken = localStorage.getItem("jwt");
    if(jwttoken != null){
      this._jwtToken = JSON.parse(jwttoken);
      this._isAuthenticated = true;
    }
    //Load User from localStorage
    var user = localStorage.getItem("user");
    if(user != null){
      this._sessionUser = JSON.parse(user);
    }
  }

  set jwtToken(jwt: JWTTokenResponse | undefined) {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    this._jwtToken = jwt;
  }

  set sessionUser(user: User | undefined) {
    localStorage.setItem("user", JSON.stringify(user));
    this._sessionUser = user;
  }

  get isAuthenticated(): boolean{
    return this._isAuthenticated;
  }

  get sessionUser(): User | undefined {
    return this._sessionUser;
  }

  login(email: String, password: String): Observable<void>{
    let subject = new Subject<void>();
    this.http.post<JWTTokenResponse>(this.baseURL + "/auth/login/", {"email": email, "password": password}).subscribe({
      next: res => {
        this.jwtToken = res;
        //TODO Get User
        this._isAuthenticated = true;
        subject.complete();
      },
      error: err => {
        subject.error(err);
        subject.complete();
      }
    });
    return subject;
  }

  logout(){
    this.jwtToken = undefined;
    this._isAuthenticated = false;
    this._sessionUser = undefined;
  }

  register(user: User): Observable<User>{
    let subject = new Subject<User>();
    this.http.post<JWTTokenResponse>(this.baseURL + "/auth/register/", user).subscribe({
      next: res => {
        this.jwtToken = res;
        this.sessionUser = user;
        this._isAuthenticated = true;
        subject.next(user);
        subject.complete();
      },
      error: err => {
        subject.error(err);
        subject.complete();
      }
    });
    return subject;
  }

  storeGame(){

  }
}
