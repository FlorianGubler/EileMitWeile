import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-winner-page',
  templateUrl: './winner-page.component.html',
  styleUrls: ['./winner-page.component.scss']
})
export class WinnerPageComponent implements OnInit {

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<WinnerPageComponent>) { }

  ngOnInit(): void {
  }
  
  close(){
    this.dialogRef.close();
  }
}
