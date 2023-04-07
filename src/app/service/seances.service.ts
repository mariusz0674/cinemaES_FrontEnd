import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, tap, throwError} from "rxjs";
import {SimpleSeanceModel} from "../dto/simple-seance-model";
import {UserModel} from "../user-managment/user-model";
import {HallModel} from "../dto/hall-model";
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class SeancesService {

  constructor(private httpClient: HttpClient,
              private toastr: ToastrService){}


  getAll(): Observable<Array<SimpleSeanceModel>> {
      return this.httpClient.get<Array<SimpleSeanceModel>>('http://localhost:8081/api/v1/seance/getSimpleAll');
  }

  createSeance(simpleSeance :SimpleSeanceModel): Observable<any>{
    console.log("Tu post");
    return this.httpClient.post("http://localhost:8081/api/v1/seance/add", simpleSeance )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.toastr.error(error.error)
          }
          return throwError(error.error);
        }), tap(()=>{
          this.toastr.success('Seansik dodany');
        })
      );



  }

  HallModel


  getHalls():Observable<Array<HallModel>> {

    return this.httpClient.get<Array<HallModel>>('http://localhost:8081/api/v1/hall/getAll');
  }
}
