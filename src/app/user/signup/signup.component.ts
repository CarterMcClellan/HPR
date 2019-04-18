import { Component, OnInit } from "@angular/core";
import {UsersService} from '../user.service';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent{
  constructor(public usersService: UsersService) {}

  onRegister(form: NgForm){
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    // title: string, study: string, description: string, time: string
    this.usersService.addUsers(form.value.email, form.value.password, "no-authentication");
    form.resetForm();
  }
}
