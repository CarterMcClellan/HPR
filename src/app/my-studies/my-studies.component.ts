import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MyStudies } from "./my-studies.model";
import { PartStudies } from "../picker/part-studies.model"
import { MyStudiesService } from "./my-studies.service";

import { UsersService } from "../user/user.service";

import { Router } from '@angular/router';

@Component({
  selector: 'app-my-studies',
  templateUrl: './my-studies.component.html',
  styleUrls: ['./my-studies.component.css']
})

export class MyStudiesComponent implements OnInit {
  curr_studies: MyStudies[] = [];
  past_studies: MyStudies[] = [];
  my_studies: MyStudies[] = [];

  curr_part_studies: PartStudies[] = [];

  email: string;
  userStatus: string;

  private userStatusSub: Subscription;
  private currStudiesSub: Subscription;
  private pastStudiesSub: Subscription;
  private currPartStudiesSub: Subscription;


  constructor(public myStudiesService: MyStudiesService, public userService: UsersService, private router: Router) {}

  ngOnInit() {
    this.email = this.userService.getEmail();
    this.userStatus = this.userService.getStatus();
    this.userStatusSub = this.userService.getUserStatus()
      .subscribe(response => {
        this.email = this.userService.getEmail();
        this.userStatus = this.userService.getStatus();
      });

    if(this.userStatus === 'researcher'){
      this.myStudiesService.getPastStudies();
      this.pastStudiesSub = this.myStudiesService.getPastStudiesUpdateListener()
        .subscribe((past_study : MyStudies[]) => {
          this.past_studies = past_study;
          console.log(this.past_studies);
        });

      this.myStudiesService.getCurrStudies();
      this.currStudiesSub = this.myStudiesService.getCurrStudiesUpdateListener()
        .subscribe((curr_study : MyStudies[]) => {
          this.curr_studies = curr_study;
        });
    } else {
      console.log("participant");
      this.myStudiesService.getPartStudies();
      this.currPartStudiesSub = this.myStudiesService.getCurrPartStudiesUpdateListener()
        .subscribe((curr_part_study : PartStudies[]) => {
          this.curr_part_studies = curr_part_study;
        })
    }

  }

  checkView(studyTitle) {
    this.userStatus = this.userService.getStatus();
    this.router.navigate(['/picker'], {queryParams: {study: studyTitle}});
  }
}
