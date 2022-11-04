import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {JWTTokenResponse} from "./jwttoken-response";
import {User} from "./user";
import {Game} from "./game";

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

  private getAuthHeader(): HttpHeaders{
    if(this._jwtToken != undefined){
      return new HttpHeaders({"Authorization": this._jwtToken.token_type + " " + this._jwtToken.access_token});
    } else{
      this.logout();
      throw new Error("Cannot get Member when not logged in");
    }
  }

  private handleUsualErrors(req: Observable<any>): Observable<any> {
    req.subscribe({
      error: (err: HttpErrorResponse) => {
        switch(err.status ){
          case 401: this.logout(); break;
          case 504 || 503: this.logout(); alert("Can't connect to Server (Timout)"); break;
        }
      }
    });
    return req;
  }

  getUserData(): Observable<User> {
    const headers = this.getAuthHeader();
    const req = this.handleUsualErrors(this.http.get<User>(this.baseURL + "/members/", {headers}));
    req.subscribe({
      next: res_usr => {
        this.sessionUser = res_usr;
      }
    });
    return req;
  }

  login(email: String, password: String): Observable<void>{
    let subject = new Subject<void>();
    this.handleUsualErrors(this.http.post<JWTTokenResponse>(this.baseURL + "/auth/login/", {"email": email, "password": password})).subscribe({
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
    this.handleUsualErrors(this.http.post<JWTTokenResponse>(this.baseURL + "/auth/register/", user)).subscribe({
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

  deleteUser(){

  }

  gameHistory(): Observable<Game[]>{
    const headers = this.getAuthHeader();
    return this.handleUsualErrors(this.http.get<Game[]>(this.baseURL + "/games/", {headers}));
  }

  storeGame(game: Game){
    const headers = this.getAuthHeader();
    return this.handleUsualErrors(this.http.post<void>(this.baseURL + "/games/", game, {headers}));
  }

  deleteGame(){

  }
}

