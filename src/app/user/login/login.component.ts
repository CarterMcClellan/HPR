import { Component, OnInit } from "@angular/core";
import {UsersService} from "../user.service";
import { NgForm } from "@angular/forms";

import {Subscription} from 'rxjs';
import { Router } from '@angular/router';

export const enum PasswordCheckStrength {
  Short,
  Common,
  Weak,
  Ok,
  Strong,
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  constructor(public usersService: UsersService, private router: Router) {}
  userStatus: string;
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
    // checkPasswordStrength
    form.resetForm();
  }

  // credit: https://gist.github.com/leewinder/a1f6bc5100fc2573b47bb2e0b7937f34
  checkPasswordStength(password) {
    // Build up the strenth of our password
    let numberOfElements = 0;
    numberOfElements = /.*[a-z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Lowercase letters
    numberOfElements = /.*[A-Z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Uppercase letters
    numberOfElements = /.*[0-9].*/.test(password) ? ++numberOfElements : numberOfElements;      // Numbers
    numberOfElements = /[^a-zA-Z0-9]/.test(password) ? ++numberOfElements : numberOfElements;   // Special characters (inc. space)
    const minLength = 5;

    // Assume we have a poor password already
    let currentPasswordStrength = PasswordCheckStrength.Short;

    // Check then strenth of this password using some simple rules
    if (password === null || password.length < 5) {
        currentPasswordStrength = PasswordCheckStrength.Short;
    } else if (this.isPasswordCommon(password) === true) {
        currentPasswordStrength = PasswordCheckStrength.Common;
    } else if (numberOfElements === 0 || numberOfElements === 1 || numberOfElements === 2) {
        currentPasswordStrength = PasswordCheckStrength.Weak;
    } else if (numberOfElements === 3) {
        currentPasswordStrength = PasswordCheckStrength.Ok;
    } else {
        currentPasswordStrength = PasswordCheckStrength.Strong;
    }

    // Return the strength of this password
    return currentPasswordStrength;
  }

  // Regex to check for a common password string - all based on 5+ length passwords
  private commonPasswordPatterns = /passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/;

  //
  // Checks if the given password matches a set of common password
  //
  public isPasswordCommon(password: string): boolean {
      return this.commonPasswordPatterns.test(password);
  }

  ngOnInit() {
      this.userStatusSub = this.usersService.getUserStatus()
      .subscribe( response => {
        this.userStatus = response.status;
        if (this.userStatus === 'admin') {
          this.router.navigate(['/login']);
        } else if (this.userStatus === 'participant' || this.userStatus === 'researcher') {
          this.router.navigate(['/studies']);
        }
      })
  }
}
