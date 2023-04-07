import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MovieModel} from "../dto/movie-model";
import {SimpleSeanceModel} from "../dto/simple-seance-model";
import {Observable, tap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import * as repl from "repl";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient,
              private toastr: ToastrService
  ){}


  saveMovie(movie: MovieModel):Observable<any> {
    return this.httpClient.post<boolean>('http://localhost:8081/api/v1/movie/add', movie)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.toastr.error('Juz taki film jest');
          }
          return throwError(error.error);
        }),
        tap(() => {
          this.toastr.success('Film dodany');
        })
      );

  }
  getAll(): Observable<Array<MovieModel>> {
    return this.httpClient.get<Array<MovieModel>>('http://localhost:8081/api/v1/movie/getAll');
  }

}
