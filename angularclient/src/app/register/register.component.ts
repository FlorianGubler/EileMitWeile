import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../apiservice.service';
import { take } from 'rxjs';
import {User} from "../user";

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerSuccess: any = null;
  public email = '';
  public firstname = '';
  public lastname = '';
  public password = '';

  private readonly returnRoute: string = "/gameboard";

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
          this._router.navigateByUrl(this.returnRoute);
        },
        error: err => {
          this.registerSuccess = false;
          console.error(err);
        }
      }
    );
  }
}
