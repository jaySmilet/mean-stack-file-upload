import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './fileUpload/create-user/create-user.component';
import { HeaderComponent } from './fileUpload/header/header.component';
import { UsersListComponent } from './fileUpload/users-list/users-list.component';

const routes: Routes = [

  {
    path: "file-upload", component: HeaderComponent, children: [
      { path: "add-user", component: CreateUserComponent },
      { path: "users-list", component: UsersListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
