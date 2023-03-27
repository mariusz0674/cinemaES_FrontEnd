import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SimpleSeanceModel} from "../dto/simple-seance-model";
import {UserModel} from "../user-managment/user-model";

@Injectable({
  providedIn: 'root'
})
export class SeancesService {

  constructor(private httpClient: HttpClient){}


  getAll(): Observable<Array<SimpleSeanceModel>> {
      return this.httpClient.get<Array<SimpleSeanceModel>>('http://localhost:8081/api/v1/seance/getSimpleAll');
  }
}
