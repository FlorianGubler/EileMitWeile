import {Component, OnInit} from '@angular/core';
import {ApiService} from "../apiservice.service";
import {Router} from "@angular/router";
import {Game} from "../game";
import {GameRank} from "../game-rank";
import {DatePipe} from '@angular/common';
import {Rank} from "../rank";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [DatePipe]
})
export class NavComponent implements OnInit {
  get gameHistory(): Game[] {
    return this._gameHistory;
  }
  private _gameHistory: Game[] = [];
  public failedToLoadGameHistory: boolean = false;

  constructor(public apiService: ApiService, private router: Router, public datePipe: DatePipe) { }

  ngOnInit(): void {
    if(this.apiService.isAuthenticated){
      this.apiService.gameHistory().subscribe({
        next: res => {
          this.failedToLoadGameHistory = false;
          this._gameHistory = res;
        },
        error: err => {
          this.failedToLoadGameHistory = true;
        }
      });
    }
  }

  signOut(): void {
    this.apiService.logout();
    this.router.navigateByUrl("/");
  }

  delAccount(userid: String): void {
    if(this.apiService.isAuthenticated){
      // @ts-ignore
      this.apiService.deleteUser(userid);
      this.router.navigateByUrl("/");
    }
  }
}
