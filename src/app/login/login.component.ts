import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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
  
  // Przeprowadź proces logowania i przekieruj użytkownika na stronę główną
  this.router.navigate(['/']);
}



}
