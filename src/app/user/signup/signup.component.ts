import { Component, OnInit, OnDestroy } from "@angular/core";
import {UsersService} from '../user.service';
import { NgForm } from "@angular/forms";

import {Subscription} from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy{
  constructor(public userService: UsersService) {}
  private userStatusSub: Subscription;
  userStatus = "";

  ngOnInit(){
    this.userStatusSub = this.userService.getUserStatus()
    .subscribe( response => {
      this.userStatus = response.status;
    })
  }

  ngOnDestroy(){
    this.userStatusSub.unsubscribe();
  }

  onRegister(form: NgForm){
    if (form.invalid) {
      return;
    }
    if (this.userStatus === '') {
      this.userService.addUsers(form.value.email, form.value.password, "participant");
    } else if(this.userStatus === 'admin'){
      this.userService.addUsers(form.value.email, form.value.password, "researcher");
    }

    form.resetForm();
  }
}
