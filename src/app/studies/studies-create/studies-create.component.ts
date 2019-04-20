import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { StudiesService } from "../studies.service";
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


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

  constructor(public studiesService: StudiesService) {}

  onAddStudies(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    // title: string, study: string, description: string, time: string
    // this.studiesService.addStudies(form.value.title, form.value.study, form.value.description, form.value.time);
    form.resetForm();
  }
}
