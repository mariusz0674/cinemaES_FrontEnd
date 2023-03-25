import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {UserModel} from "../user-managment/user-model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isLoggedIn = false;
  selectedUser: UserModel;
  constructor(private authService: AuthService,
              private router: Router) {
  //  this.selectedUser = UserModel();
  }
  ngOnInit(): void {
    //location.reload()
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.router.url === '/login') {
      location.reload();
    }
  }


}
