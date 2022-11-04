import {Component, OnInit} from '@angular/core';
import {ApiService} from "../apiservice.service";
import {Game} from "../game";
import {GameRank} from "../game-rank";
import {appendHtmlElementToHead} from "@angular/cdk/schematics";

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  title = 'Eile mit Weile';

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    if(this.apiService.isAuthenticated){
      this.apiService.storeGame(new Game(null, new Map<String, GameRank>([["username1", GameRank.FIRST], ["username2", GameRank.SECOND]]), new Date(), new Date)).subscribe({
        next: _ => {
          this.apiService.gameHistory().subscribe({
            next: res => {
              console.log(res);
            }
          });
        }
      })
    }
  }

}
