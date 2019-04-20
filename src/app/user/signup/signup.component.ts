import { Component, OnInit, OnDestroy } from "@angular/core";
import {UsersService} from '../user.service';
import { NgForm } from "@angular/forms";

import {Subscription} from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  constructor(public userService: UsersService) {}
  private userStatusSub: Subscription;
  userStatus = "";

  onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.userStatus = this.userService.getStatus();
    console.log(this.userStatus);
    if (this.userStatus === 'admin') {
      this.userService.addUsers(form.value.email, form.value.password, "researcher");
    } else {
      this.userService.addUsers(form.value.email, form.value.password, "participant");
    }

    form.resetForm();
  }
}
