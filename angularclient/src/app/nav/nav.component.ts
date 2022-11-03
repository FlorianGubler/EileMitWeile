import { Component, OnInit } from '@angular/core';
import {ApiService} from "../apiservice.service";
import {User} from "../user";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public user: User | undefined = this.apiService.sessionUser;

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
  }

}
