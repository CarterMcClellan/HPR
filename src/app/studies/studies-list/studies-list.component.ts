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

  constructor(public studiesService: StudiesService, public userService: UsersService, private router: Router) {}

  ngOnInit() {
    this.userStatus = this.userService.getStatus();
    this.studiesService.getStudies();
    this.postsSub = this.studiesService.getStudiesUpdateListener()
      .subscribe((studies: Studies[]) => {
        this.studies = studies;
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
}
