import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameboardComponent } from './gameboard/gameboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StartpageComponent } from './startpage/startpage.component';

const routes: Routes = [
  { path: 'startpage', component: StartpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'gameboard', component: GameboardComponent},
  {path: '**', redirectTo: 'startpage', pathMatch: 'full',}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
