import { Component, OnInit } from "@angular/core";
import {UsersService} from "../user.service";
import { NgForm } from "@angular/forms";

import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  constructor(public usersService: UsersService) {}
  private status:string
  private userStatusSub: Subscription;
  userStatus = '';

  onLogin(form: NgForm){
    if (form.invalid) {
      return;
    }
    // title: string, study: string, description: string, time: string
    this.usersService.login(form.value.email, form.value.password, "no-authentication");
    this.status = this.usersService.getStatus();
    form.resetForm();
  }
    onRegister(form: NgForm) {
      if (form.invalid) {
        return;
      }
      this.userStatus = this.usersService.getStatus();
      console.log(this.userStatus);
      if (this.userStatus === 'admin') {
        this.usersService.addUsers(form.value.email, form.value.password, 'researcher');
      } else {
        this.usersService.addUsers(form.value.email, form.value.password, 'participant');
      }

      form.resetForm();
    }

    ngOnInit(){
      this.userStatusSub = this.usersService.getUserStatus()
      .subscribe( response => {
        this.userStatus = response.status;
      })
    }
}
