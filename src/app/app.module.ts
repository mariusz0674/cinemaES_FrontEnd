import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Dodaj import
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import {NgxWebstorageModule} from "ngx-webstorage";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { DemoComponent } from './demo/demo.component';
import { HomeComponent } from './home/home.component';
import {TokenInterceptor} from "./auth/token-interceptor";
import { UserManagmentComponent } from './user-managment/user-managment/user-managment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegistrationComponent,
    DemoComponent,
    HomeComponent,
    UserManagmentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,  // Dodaj ReactiveFormsModule do imports
    FormsModule, // Dodaj FormsModule
    NgxWebstorageModule.forRoot(),
    HttpClientModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
