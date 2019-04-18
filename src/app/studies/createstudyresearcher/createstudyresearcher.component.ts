import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs';
import { Studies } from "../studies.model";
import { StudiesService } from "../studies.service";

@Component({
  selector: 'createstudyresearcher',
  templateUrl: './createstudyresearcher.component.html',
  styleUrls: ['./createstudyresearcher.component.css']
})

export class CreateStudyResearcherComponent implements OnInit {
      studies: Studies[] = [];
  private postsSub: Subscription;
  enteredTitle = "";
  enteredContent = "";
  enteredDescription = "";
  enteredTime = "";

  constructor(public studiesService: StudiesService) {}

  ngOnInit() {
    this.studiesService.getStudies();
    this.postsSub = this.studiesService.getStudiesUpdateListener()
      .subscribe((studies: Studies[]) => {
        this.studies = studies;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onAddStudies(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // title: string, study: string, description: string, time: string
    this.studiesService.addStudies(form.value.title, form.value.study, form.value.description, form.value.time);
    form.resetForm();
  }
}

