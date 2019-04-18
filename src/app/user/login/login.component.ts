import { Component, OnInit } from "@angular/core";
import {UsersService} from "../user.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  constructor(public usersService: UsersService) {}

  onLogin(form: NgForm){
    console.log(form);
    if (form.invalid) {
      return;
    }
    console.log(form);
    // title: string, study: string, description: string, time: string
    this.usersService.login(form.value.email, form.value.password, "no-authentication");
    form.resetForm();
  }
}
