import { Component, OnInit } from "@angular/core";
import {UsersService} from "../user.service";
import { NgForm } from "@angular/forms";

import {Subscription} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  constructor(public usersService: UsersService, private router: Router) {}
  private userStatus:string
  private userStatusSub: Subscription;

  onLogin(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.usersService.login(form.value.email, form.value.password, "no-authentication");
    form.resetForm();
  }


  onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.userStatus = this.usersService.getStatus();
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
        if (this.userStatus === 'admin') {
          this.router.navigate(['/studies']);
          this.router.navigate(['/login']);
        } else if (this.userStatus === 'participant' || this.userStatus === 'researcher') {
          this.router.navigate(['/studies']);
        }
      })
  }
}
