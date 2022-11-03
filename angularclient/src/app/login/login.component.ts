import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {User} from "../user";
import {take} from "rxjs";
import {ApiService} from "../apiservice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginSuccess: any = null;
  public email = '';
  public password = '';

  private readonly returnRoute: string = "/gameboard";

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
            this.loginSuccess = true;
            this._router.navigateByUrl('/gameboard');
          },
          error: err => {
            this.loginSuccess = false;
            console.error(err);
          }
        }
      );
  }

}
