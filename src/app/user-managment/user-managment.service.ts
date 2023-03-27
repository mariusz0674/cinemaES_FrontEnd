import { Injectable } from '@angular/core';
import {UserModel} from "./user-model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserManagmentService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Array<UserModel>> {
    return this.http.get<Array<UserModel>>('http://localhost:8081/api/v1/usersmenager/all');
  }

  deleteUser(id: string): Observable<Boolean>{
    return this.http.delete<Boolean>('http://localhost:8081/api/v1/usersmenager/delete?userId='+id);

  }

  updateUser(user: UserModel): Observable<any> {
    return this.http.put<Boolean>('http://localhost:8081/api/v1/usersmenager/update', user);
  }
}
