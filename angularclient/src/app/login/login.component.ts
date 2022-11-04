import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {User} from "../user";
import {take} from "rxjs";
import {ApiService} from "../apiservice.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginError: any = null;
  public loginInvalid: any = null;
  public email = '';
  public password = '';

  private readonly returnRoute: string = "/";

  constructor(private _router: Router, private _apiService: ApiService) { }

  ngOnInit(): void {
    if(this._apiService.isAuthenticated){
      this._router.navigateByUrl(this.returnRoute);
    }
  }

  onSubmit(){
    this._apiService.login(this.email, this.password).pipe(take(1))
      .subscribe({
          next: _ => {
            this.loginError = false;
            this._router.navigateByUrl(this.returnRoute);
          },
          error: (err: HttpErrorResponse) => {
            if(err.status == 401){
              this.loginInvalid = true
            } else{
              this.loginError = true;
              this.loginInvalid = false;
            }
          }
        }
      );
  }

}
