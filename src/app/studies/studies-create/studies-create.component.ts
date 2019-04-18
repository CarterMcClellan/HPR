import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { StudiesService } from "../studies.service";
import { UsersService } from "../../user/user.service";

@Component({
  selector: 'app-studies-create',
  templateUrl: './studies-create.component.html',
  styleUrls: ['./studies-create.component.css']
})

export class StudiesCreateComponent {
  enteredTitle = "";
  enteredContent = "";
  enteredDescription = "";
  enteredTime = "";
  email: string;
  status: string;

  constructor(public studiesService: StudiesService, public userService: UsersService) {}

  ngOnInit() {
    try {
      this.email = this.userService.getEmail();
      this.status = this.userService.getStatus();
    } catch (err){
      console.log(err);
    }

  }

  onAddStudies(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // title: string, study: string, description: string, time: string
    this.studiesService.addStudies(form.value.title, form.value.study, form.value.description, form.value.time, form.value.username);
    form.resetForm();
  }
}
