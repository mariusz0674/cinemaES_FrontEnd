import {Component, OnInit} from '@angular/core';
import {UserManagmentService} from "../user-managment.service";
import {UserModel} from "../user-model";

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {
  users: UserModel[];
  selectedUser: UserModel;
  showRoleForUSer: Number = null;
  // showList = false;
  constructor(private userService: UserManagmentService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => this.users = users,
      error => console.log(error)
    );
  }

  deleteUser(user: UserModel) {
    this.userService.deleteUser(user.id).subscribe(
      response => {
        console.log(response);
      },
      error => console.log(error)
    );
  }

  changeRole(user: UserModel) {

    // implementacja zmiany roli
  }
  changeShowRoleForUSer(userToChange: string): void{
    // userToChangea = userToChange.
    // this.showRoleForUSer = userToChange;
  }
  changePassword(user: UserModel) {
    // implementacja zmiany hasła
  }
  editUser(user:UserModel):void{
    this.selectedUser = user;
  }
  saveUser(user: UserModel){
    return;
  }
  cancelEdit(user: UserModel){
    return;
  }
  updateRole(user: UserModel, newRole: string) {
    user.role = newRole;
 //   this.userService.updateUser(user).subscribe();
    this.selectedUser = null;
  }
}
