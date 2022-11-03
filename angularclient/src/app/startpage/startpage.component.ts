import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from "../user";
import {ApiService} from "../apiservice.service";

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  title = 'Eile mit Weile';

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
  }

}
