import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import {RegistrationComponent} from "./auth/registration/registration.component";
import {HomeComponent} from "./home/home.component";
import {DemoComponent} from "./demo/demo.component";
import {CreateMovieComponent} from "./create-movie/create-movie.component";
import {CreateSeanceComponent} from "./create-seance/create-seance.component";
import {UserManagmentComponent} from "./user-managment/user-managment/user-managment.component";
import {MovieListComponent} from "./movie-list/movie-list.component";
import {SeancesSimpleListComponent} from "./seances-simple-list/seances-simple-list.component";
import {ReserveSeanceComponent} from "./reserve-seance/reserve-seance.component";

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'demo', component: DemoComponent },

  { path: 'seances-simple-list', component: SeancesSimpleListComponent },
  { path: 'movie-list', component: MovieListComponent },
  { path: 'user-managment', component: UserManagmentComponent },
  { path: 'create-seance', component: CreateSeanceComponent },
  { path: 'create-movie', component: CreateMovieComponent },
  { path: 'reserve-seance', component: ReserveSeanceComponent },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
