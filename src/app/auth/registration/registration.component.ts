import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {RegisterRequestPayload} from "../payload/registration.request.payload";
import {SyncStorage} from "ngx-webstorage";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  registrationForm: FormGroup;
  submitted = false;

  registerRequestPayload: RegisterRequestPayload;
  ngOnInit(): void {
  }
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService
              ) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required]

    });
    this.registerRequestPayload = {
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: ''
    }
  }

  onSubmit() {
    this.submitted = true;

    // Przerwij, jeśli formularz jest nieprawidłowy
    if (this.registrationForm.invalid) {
      return;
    }
    if (this.registrationForm.valid) {
      //const formData = this.registrationForm.value;
      this.registerRequestPayload.username = this.registrationForm.get('username').value;
      this.registerRequestPayload.password =  this.registrationForm.get('password').value;
      this.registerRequestPayload.email =  this.registrationForm.get('email').value;
      this.registerRequestPayload.firstname =  this.registrationForm.get('firstname').value;
      this.registerRequestPayload.lastname =  this.registrationForm.get('lastname').value;
      this.authService.register(this.registerRequestPayload).subscribe(() => {
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      }, () => {
        console.log("error()");
        //this.toastr.error('Registration Failed! Please try again');
      });

    }

    // Przeprowadź proces logowania i przekieruj użytkownika na stronę główną
    this.router.navigate(['/']);
  }

  get f() { return this.registrationForm.controls; }



}
