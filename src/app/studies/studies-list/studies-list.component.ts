import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Studies } from "../studies.model";
import { StudiesService } from "../studies.service";
import { UsersService } from "../../user/user.service";

import { Router } from '@angular/router';


@Component({
  selector: 'app-studies-list',
  templateUrl: './studies-list.component.html',
  styleUrls: ['./studies-list.component.css']
})

export class StudiesListComponent implements OnInit {
  studies: Studies[] = [];
  private postsSub: Subscription;
  private userStatusSub: Subscription;
  userStatus = "";
  email = "";
  start_time: string;
  end_time: string;

  constructor(public studiesService: StudiesService, public userService: UsersService, private router: Router) {}

  ngOnInit() {
    this.userStatus = this.userService.getStatus();
    this.studiesService.getStudies();
    this.postsSub = this.studiesService.getStudiesUpdateListener()
      .subscribe((studies: Studies[]) => {
        this.studies = studies;
        this.studies = this.formatStudies(this.studies);
      });
  }

  checkView(studyTitle) {
    this.userStatus = this.userService.getStatus();
    if (this.userStatus === 'participant'){
      this.email = this.userService.getEmail();
      this.router.navigate(['/schedule'], {queryParams: {study: studyTitle}});
    } else {
      this.router.navigate(['/login']);
    }
  }

  formatStudies(studies){
    for (const study of studies) {
      study.start_time = this.toString(study.start_time);
      study.end_time = this.toString(study.end_time);
    }
    return studies;
  }

  toString(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const day = new Date(date);
    return days[day.getDay()] + ", " + mS[day.getMonth()] + " " + day.getDate();
  }
}
