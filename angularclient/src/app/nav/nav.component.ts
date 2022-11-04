import { Component, OnInit } from '@angular/core';
import {ApiService} from "../apiservice.service";
import {User} from "../user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  constructor(public apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  signOut(): void {
    this.apiService.logout();
    this.router.navigateByUrl("/");
  }
}
