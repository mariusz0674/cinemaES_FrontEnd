import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn$ = false;
  myRole$;

  constructor(private authService: AuthService,
              private router: Router) {
    this.myRole$ = authService.getRole();
  }


  logout(): void {
    this.authService.logout();
    location.reload()
    this.router.navigate(['/']);
  }


  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.myRole$ = this.authService.getRole();
    //location.reload()
  }
  ngOnChanges(){
    location.reload()
  }
  isLogIn(): boolean{
    this.isLoggedIn$ = this.authService.isLoggedIn();
    return this.isLoggedIn$;
  }

  checkMyPermissions(actionToVerify: string) {
    switch (actionToVerify){
      case "seances-simple-list":{
        return true;
      }
      case "create-movie":{
        const setAuth = new Set(["ADMIN", "ADMINISTRATION"]);
        return setAuth.has(this.myRole$);
      }
      case "create-seance":{
        const setAuth = new Set(["ADMIN", "ADMINISTRATION"]);
        return setAuth.has(this.myRole$);
      }
      case "user-managment":{
        const setAuth = new Set(["ADMIN"]);
        return setAuth.has(this.myRole$);
      }
      case "movie-list":{
        const setAuth = new Set(["ADMIN", "CASHIER", "ATTENDANT", "ADMINISTRATION", "DEFAULT"]);
        return setAuth.has(this.myRole$);
      }
      default:
        return false;
    }
    return false;

  }
}
