import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../apiservice.service';
import { take } from 'rxjs';

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

  private readonly returnUrl: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _apiService: ApiService
  ) {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/game';
  }

  public ngOnInit(): void {
    if(this._apiService.isAuthenticated()){
      this._router.navigateByUrl(this.returnUrl);
    }
  }

  public onSubmit(): void {
    this._apiService.register(this.email, this.firstname, this.lastname, this.password).pipe(
      take(1)
    ).subscribe({
      next: _ => {
        this.registerSuccess = true;
        this._router.navigateByUrl('/gameboard');
      },
      error: _ => this.registerSuccess = false
    });
  }
}
