import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateUserComponent } from './fileUpload/create-user/create-user.component';
import { UsersListComponent } from './fileUpload/users-list/users-list.component';
import { HeaderComponent } from './fileUpload/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    UsersListComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
