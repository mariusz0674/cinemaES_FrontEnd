import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn = false;

  constructor(private authService: AuthService,
              private router: Router) {}


  logout(): void {
    this.authService.logout();
    location.reload()
    this.router.navigate(['/']);
  }


  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    //location.reload()
  }
  ngOnChanges(){
    location.reload()
  }
  isLogIn(): boolean{
    this.isLoggedIn = this.authService.isLoggedIn();
    return this.isLoggedIn;
  }

}
