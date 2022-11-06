import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { StartDialogComponent } from '../start-dialog/start-dialog.component';
import { ApiService } from '../apiservice.service';
import { User } from '../user';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent implements OnInit {
  rnd1: number = 1;
  nextPlayer: string = '';
  players: any[] = [];

  constructor(private dialog: MatDialog, public apiService: ApiService) {}

  ngOnInit(): void {
    this.openDialog();
  }

  roll() {
    this.rnd1 = Math.round(Math.random() * (5 - 1 + 1) + 1);
    console.log(this.players);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      player1: 2,
    };

    const dialogRef = this.dialog.open(StartDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => (this.players = data));
  }

  get player() {
    return this.nextPlayer;
  }

  move(i:number) {
    console.log(i);
  }

  dots: Dot[] = [
    //row1
    { color: 'red', bordercolor: '', figureColor: ''},
    { color: 'red', bordercolor: '', figureColor: '' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'blue', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: 'blue', bordercolor: '', figureColor: '' },
    { color: 'blue', bordercolor: '', figureColor: '' },
    //row2
    { color: 'red', bordercolor: '', figureColor: '' },
    { color: 'red', bordercolor: '', figureColor: '' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'blue', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: 'blue', bordercolor: '', figureColor: '' },
    { color: 'blue', bordercolor: '', figureColor: '' },
    //row3
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'blue', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    //row4
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'blue', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    //row5
    { color: '', bordercolor: 'red', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'blue', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    //row6
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'red', figureColor: 'transparent' },
    { color: '', bordercolor: 'red', figureColor: 'transparent' },
    { color: '', bordercolor: 'red', figureColor: 'transparent' },
    { color: '', bordercolor: 'red', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'green', figureColor: 'transparent' },
    { color: '', bordercolor: 'green', figureColor: 'transparent' },
    { color: '', bordercolor: 'green', figureColor: 'transparent' },
    { color: '', bordercolor: 'green', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    //row7
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'yellow', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'green', figureColor: 'transparent' },
    //row8
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'yellow', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    //row9
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'yellow', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    //row10
    { color: 'yellow', bordercolor: '', figureColor: '' },
    { color: 'yellow', bordercolor: '', figureColor: '' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'yellow', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: 'green', bordercolor: '', figureColor: '' },
    { color: 'green', bordercolor: '', figureColor: '' },
    //row11
    { color: 'yellow', bordercolor: '', figureColor: '' },
    { color: 'yellow', bordercolor: '', figureColor: '' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'yellow', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: '', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: '', bordercolor: 'transparent', figureColor: 'transparent' },
    { color: 'green', bordercolor: '', figureColor: '' },
    { color: 'green', bordercolor: '', figureColor: '' },
  ];
}

export class Dot {
  color: string = '';
  bordercolor: string = '';
  figureColor: string = '';
}
