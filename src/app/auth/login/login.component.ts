import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginRequestPayload} from "../payload/login.request.payload";
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  loginRequestPayload: LoginRequestPayload;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
    this.loginRequestPayload = {
      username: '',
      password: ''
    }

  }

  ngOnInit(): void {

  }

// Getter do łatwiejszego dostępu do pól formularza
get f() { return this.loginForm.controls; }

onSubmit() {
  this.submitted = true;

  // Przerwij, jeśli formularz jest nieprawidłowy
  if (this.loginForm.invalid) {
    return;
  }
  if (this.loginForm.valid) {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;
    this.authService.login(this.loginRequestPayload).subscribe(() => {
      this.router.navigate(['/home']);

    }, () => {
      console.log("error()");
      //this.toastr.error('Registration Failed! Please try again');
    });


  }
  return;

}



}
