import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MyStudies } from "./my-studies.model";
import { MyStudiesService } from "./my-studies.service";

import { UsersService } from "../user/user.service";

@Component({
  selector: 'app-my-studies',
  templateUrl: './my-studies.component.html',
  styleUrls: ['./my-studies.component.css']
})

export class MyStudiesComponent implements OnInit {
  curr_studies: MyStudies[] = [];
  past_studies: MyStudies[] = [];
  email: string;

  private currStudiesSub: Subscription;
  private pastStudiesSub: Subscription;
  private status: string;


  constructor(public myStudiesService: MyStudiesService, public userService: UsersService) {}

  ngOnInit() {
    this.myStudiesService.getPastStudies();
    this.pastStudiesSub = this.myStudiesService.getPastStudiesUpdateListener()
      .subscribe((past_studies : MyStudies[]) => {
        this.past_studies = past_studies;
      });

    this.myStudiesService.getCurrStudies();
    this.currStudiesSub = this.myStudiesService.getCurrStudiesUpdateListener()
      .subscribe((curr_studies : MyStudies[]) => {
        this.curr_studies = curr_studies;
      });

    try {
      this.email = this.userService.getEmail();
      this.status = this.userService.getStatus();
    } catch (err){
      console.log(err);
    }

  }
}
