import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../apiservice.service';
import { take } from 'rxjs';
import {User} from "../user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerSuccess: any = null;
  public userAlreadyExistsError: any = null;
  public email = '';
  public firstname = '';
  public lastname = '';
  public password = '';

  private readonly returnRoute: string = "/";

  constructor(private _router: Router, private _apiService: ApiService) {}

  public ngOnInit(): void {
    if(this._apiService.isAuthenticated){
      this._router.navigateByUrl(this.returnRoute);
    }
  }

  public onSubmit(): void {
    this._apiService.register(new User("", this.email, this.firstname, this.lastname, this.password)).pipe(take(1))
      .subscribe({
        next: _ => {
          this.registerSuccess = true;
          this.userAlreadyExistsError = false;
          this._router.navigateByUrl(this.returnRoute);
        },
        error: (err: HttpErrorResponse) => {
          if(err.status == 409){ //Conflict: Email already exists
            this.userAlreadyExistsError = true;
          } else{
            this.userAlreadyExistsError = false;
            this.registerSuccess = false;
          }
        }
      }
    );
  }
}
