import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartpageComponent } from './startpage/startpage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StartDialogComponent } from './start-dialog/start-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from "@angular/material/button";
import { NavComponent } from './nav/nav.component';
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    StartpageComponent,
    LoginComponent,
    RegisterComponent,
    GameboardComponent,
    StartDialogComponent,
    NavComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatExpansionModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
