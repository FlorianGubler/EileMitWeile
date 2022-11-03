import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { StartDialogComponent } from '../start-dialog/start-dialog.component';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent implements OnInit {
  rnd1: number = 1;
  rnd2: number = 1;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.openDialog();
  }

  roll() {
    this.rnd1 = Math.round(Math.random() * (5 - 1 + 1) + 1);
    this.rnd2 = Math.round(Math.random() * (5 - 1 + 1) + 1);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      player1: 2
    };

    this.dialog.open(StartDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(StartDialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((data) => console.log('Dialog output:', data));
  }

  dots: Dot[] = [
    //row1
    { color: 'red', bordercolor: '' },
    { color: 'red', bordercolor: '' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'blue' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: 'blue', bordercolor: '' },
    { color: 'blue', bordercolor: '' },
    //row2
    { color: 'red', bordercolor: '' },
    { color: 'red', bordercolor: '' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'blue' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: 'blue', bordercolor: '' },
    { color: 'blue', bordercolor: '' },
    //row3
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'blue' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    //row4
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'blue' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    //row5
    { color: '', bordercolor: 'red' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'blue' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: '' },
    //row6
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'red' },
    { color: '', bordercolor: 'red' },
    { color: '', bordercolor: 'red' },
    { color: '', bordercolor: 'red' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'green' },
    { color: '', bordercolor: 'green' },
    { color: '', bordercolor: 'green' },
    { color: '', bordercolor: 'green' },
    { color: '', bordercolor: '' },
    //row7
    { color: '', bordercolor: '' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'yellow' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'green' },
    //row8
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'yellow' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    //row9
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'yellow' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    //row10
    { color: 'yellow', bordercolor: '' },
    { color: 'yellow', bordercolor: '' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'yellow' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: 'green', bordercolor: '' },
    { color: 'green', bordercolor: '' },
    //row11
    { color: 'yellow', bordercolor: '' },
    { color: 'yellow', bordercolor: '' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'yellow' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: '' },
    { color: '', bordercolor: 'transparent' },
    { color: '', bordercolor: 'transparent' },
    { color: 'green', bordercolor: '' },
    { color: 'green', bordercolor: '' },
  ];
}

export class Dot {
  color: string = '';
  bordercolor: string = '';
}
