import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field"

@Component({
  selector: 'app-start-dialog',
  templateUrl: './start-dialog.component.html',
  styleUrls: ['./start-dialog.component.scss']
})
export class StartDialogComponent implements OnInit {

  
  player1:string = "";
  player2:string = "";
  player3:string = "";
  player4:string = "";
  form: FormGroup = this.fb.group({
    player1: [this.player1, []],
    player2: [this.player2, []],
    player3: [this.player3, []],
    player4: [this.player4, []]
});
  
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<StartDialogComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      player1: [this.player1, []],
      player2: [this.player2, []],
      player3: [this.player3, []],
      player4: [this.player4, []]
  });
  }

  close(){
    this.dialogRef.close(this.form.value);
  }

}
