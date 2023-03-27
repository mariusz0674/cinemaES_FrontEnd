import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MovieModel} from "../dto/movie-model";
import {SimpleSeanceModel} from "../dto/simple-seance-model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient){}


  saveMovie(movie: MovieModel) {
    return this.httpClient.post<boolean>('http://localhost:8081/api/v1/movie/add', movie);
  }
  getAll(): Observable<Array<MovieModel>> {
    return this.httpClient.get<Array<MovieModel>>('http://localhost:8081/api/v1/movie/getAll');
  }

}
