import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SimpleSeanceModel} from "../dto/simple-seance-model";
import {UserModel} from "../user-managment/user-model";
import {HallModel} from "../dto/hall-model";

@Injectable({
  providedIn: 'root'
})
export class SeancesService {

  constructor(private httpClient: HttpClient){}


  getAll(): Observable<Array<SimpleSeanceModel>> {
      return this.httpClient.get<Array<SimpleSeanceModel>>('http://localhost:8081/api/v1/seance/getSimpleAll');
  }

  createSeance(simpleSeance :SimpleSeanceModel): Observable<any>{
    return this.httpClient.post("http://localhost:8081/api/v1/seance/add", simpleSeance );
  }

  HallModel


  getHalls():Observable<Array<HallModel>> {

    return this.httpClient.get<Array<HallModel>>('http://localhost:8081/api/v1/hall/getAll');
  }
}
