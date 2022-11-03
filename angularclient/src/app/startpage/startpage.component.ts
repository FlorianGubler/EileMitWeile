import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  title = 'Eile mit Weile'
  constructor(private router:Router)
  {}

  ngOnInit(): void {
  }

}
