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
  private status:string

  onLogin(form: NgForm){
    if (form.invalid) {
      return;
    }
    // title: string, study: string, description: string, time: string
    this.usersService.login(form.value.email, form.value.password, "no-authentication");
    this.status = this.usersService.getStatus();
    form.resetForm();
  }
}
