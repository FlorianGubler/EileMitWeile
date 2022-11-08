import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { StartDialogComponent } from '../start-dialog/start-dialog.component';
import { ApiService } from '../apiservice.service';
import { User } from '../user';
import {Router} from "@angular/router";

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent implements OnInit {
  rnd1: number = 1;
  nextPlayer: Player = new Player('', '');
  players: Player[] = [];
  fieldId: number | undefined;

  constructor(private dialog: MatDialog, public apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    if(!this.apiService.isAuthenticated){
      this.router.navigateByUrl("/");
      //TODO Close Dialog
    }
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

    dialogRef
      .afterClosed()
      .subscribe(
        (data) => (
          (this.players = [
            new Player(data['player1'], 'red'),
            new Player(data['player2'], 'blue'),
            new Player(data['player3'], 'yellow'),
            new Player(data['player4'], 'green'),
          ]),
          (this.nextPlayer.name = this.players[0].name),
          (this.nextPlayer.color = 'red')
        )
      );
  }

  get player() {
    return this.nextPlayer;
  }

  getFieldId(i: number) {
    this.fieldId = i;
    this.move(i, this.nextPlayer, this.rnd1);
  }

  move(field: number, player: Player, diceNmbr: number) {
    console.log(field);
    console.log(player);
    console.log(diceNmbr);
    console.log(this.players);

    var clickedDot = this.dots.find((d) => d.fieldId == field);

    if (clickedDot != undefined) {
      clickedDot.content = '';
    }

    if (diceNmbr == 6 && field.toString().length == 3) {
      this.leaveHome(field);
      return;
    }

    if (field > 0 && field <= 40) {
    }
  }

  private leaveHome(field: number) {
    var redStartDot = this.dots.find((d) => d.fieldId == 1);
    var blueStartDot = this.dots.find((d) => d.fieldId == 11);
    var greenStartDot = this.dots.find((d) => d.fieldId == 21);
    var yellowStartDot = this.dots.find((d) => d.fieldId == 31);

    switch (field.toString().at(0)) {
      case '2':
        if (redStartDot != undefined) {
          redStartDot.content = '♟';
          redStartDot.figureColor = 'red';
        }
        break;
      case '3':
        if (blueStartDot != undefined) {
          blueStartDot.content = '♟';
          blueStartDot.figureColor = 'blue';
        }
        break;
      case '4':
        if (yellowStartDot != undefined) {
          yellowStartDot.content = '♟';
          yellowStartDot.figureColor = 'yellow';
        }
        break;
      case '5':
        if (greenStartDot != undefined) {
          greenStartDot.content = '♟';
          greenStartDot.figureColor = 'green';
        }
        break;
    }
  }

  dots: Dot[] = [
    //row1
    {
      color: 'red',
      bordercolor: '',
      figureColor: '',
      fieldId: 201,
      content: '♟',
    },
    {
      color: 'red',
      bordercolor: '',
      figureColor: '',
      fieldId: 202,
      content: '♟',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 9,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 10,
      content: '',
    },
    {
      color: '',
      bordercolor: 'blue',
      figureColor: 'transparent',
      fieldId: 11,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: 'blue',
      bordercolor: '',
      figureColor: '',
      fieldId: 301,
      content: '♟',
    },
    {
      color: 'blue',
      bordercolor: '',
      figureColor: '',
      fieldId: 302,
      content: '♟',
    },
    //row2
    {
      color: 'red',
      bordercolor: '',
      figureColor: '',
      fieldId: 203,
      content: '♟',
    },
    {
      color: 'red',
      bordercolor: '',
      figureColor: '',
      fieldId: 204,
      content: '♟',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 8,
      content: '',
    },
    {
      color: '',
      bordercolor: 'blue',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 12,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: 'blue',
      bordercolor: '',
      figureColor: '',
      fieldId: 303,
      content: '♟',
    },
    {
      color: 'blue',
      bordercolor: '',
      figureColor: '',
      fieldId: 304,
      content: '♟',
    },
    //row3
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 7,
      content: '',
    },
    {
      color: '',
      bordercolor: 'blue',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 13,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    //row4
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 6,
      content: '',
    },
    {
      color: '',
      bordercolor: 'blue',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 14,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    //row5
    {
      color: '',
      bordercolor: 'red',
      figureColor: 'transparent',
      fieldId: 1,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 2,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 3,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 4,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 5,
      content: '',
    },
    {
      color: '',
      bordercolor: 'blue',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 15,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 16,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 17,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 18,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 19,
      content: '',
    },
    //row6
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 40,
      content: '',
    },
    {
      color: '',
      bordercolor: 'red',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'red',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'red',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'red',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'green',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'green',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'green',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'green',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 20,
      content: '',
    },
    //row7
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 39,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 38,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 37,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 36,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 35,
      content: '',
    },
    {
      color: '',
      bordercolor: 'yellow',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 25,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 24,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 23,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 22,
      content: '',
    },
    {
      color: '',
      bordercolor: 'green',
      figureColor: 'transparent',
      fieldId: 21,
      content: '',
    },
    //row8
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 34,
      content: '',
    },
    {
      color: '',
      bordercolor: 'yellow',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 26,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    //row9
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 33,
      content: '',
    },
    {
      color: '',
      bordercolor: 'yellow',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 27,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    //row10
    {
      color: 'yellow',
      bordercolor: '',
      figureColor: '',
      fieldId: 401,
      content: '♟',
    },
    {
      color: 'yellow',
      bordercolor: '',
      figureColor: '',
      fieldId: 402,
      content: '♟',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 32,
      content: '',
    },
    {
      color: '',
      bordercolor: 'yellow',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 28,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: 'green',
      bordercolor: '',
      figureColor: '',
      fieldId: 501,
      content: '♟',
    },
    {
      color: 'green',
      bordercolor: '',
      figureColor: '',
      fieldId: 502,
      content: '♟',
    },
    //row11
    {
      color: 'yellow',
      bordercolor: '',
      figureColor: '',
      fieldId: 403,
      content: '♟',
    },
    {
      color: 'yellow',
      bordercolor: '',
      figureColor: '',
      fieldId: 404,
      content: '♟',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'yellow',
      figureColor: 'transparent',
      fieldId: 31,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 30,
      content: '',
    },
    {
      color: '',
      bordercolor: '',
      figureColor: 'transparent',
      fieldId: 29,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: '',
      bordercolor: 'transparent',
      figureColor: 'transparent',
      fieldId: 0,
      content: '',
    },
    {
      color: 'green',
      bordercolor: '',
      figureColor: '',
      fieldId: 503,
      content: '♟',
    },
    {
      color: 'green',
      bordercolor: '',
      figureColor: '',
      fieldId: 504,
      content: '♟',
    },
  ];
}

export class Dot {
  color: string = '';
  bordercolor: string = '';
  figureColor: string = '';
  fieldId: number = 0;
  content: string = '';
}

export class Player {
  constructor(name: string, color: string) {
    this.color = color;
    this.name = name;
  }
  name: string = '';
  color: string = '';
}
