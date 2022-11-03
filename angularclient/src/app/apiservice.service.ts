import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    if(jwttoken != null && jwttoken != "" && jwttoken != "undefined"){
      this._jwtToken = JSON.parse(jwttoken);
      this._isAuthenticated = true;
      this.getUserData()
    }
  }

  set jwtToken(jwt: JWTTokenResponse | undefined) {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    this._jwtToken = jwt;
  }

  set sessionUser(user: User | undefined) {
    this._sessionUser = user;
  }

  get isAuthenticated(): boolean{
    return this._isAuthenticated;
  }

  get sessionUser(): User | undefined {
    return this._sessionUser;
  }

  getUserData(): Observable<User> {
    if(this._jwtToken != undefined){
      var headers = new HttpHeaders({"Authorization": this._jwtToken.token_type + " " + this._jwtToken.access_token});
      var req = this.http.get<User>(this.baseURL + "/members/", {headers});
      req.subscribe({
        next: res_usr => {
          this.sessionUser = res_usr;
        }
      });
      return req;
    } else{
      throw new Error("Cannot get Member when not logged in");
    }
  }

  login(email: String, password: String): Observable<void>{
    let subject = new Subject<void>();
    this.http.post<JWTTokenResponse>(this.baseURL + "/auth/login/", {"email": email, "password": password}).subscribe({
      next: res_login => {
        this.jwtToken = res_login;
        this._isAuthenticated = true;
        this.getUserData();
        subject.next();
        subject.complete();
      },
      error: err_login => {
        subject.error(err_login);
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
