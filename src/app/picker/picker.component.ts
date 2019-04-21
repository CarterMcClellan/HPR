import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user/user.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PickerService } from './picker.service';

import { Scheduler } from '../scheduler/scheduler.model';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css']
})
export class PickerComponent implements OnInit {
  email: string;
  studyTitle: string;
  routeSub: Subscription;

  schedules: Scheduler[];

  constructor(public userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private pickerService: PickerService) {}

  ngOnInit() {
    this.email = this.userService.getEmail();
    // recieve the title of the selected study
    this.routeSub = this.route.queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.studyTitle = params['study'] || "";
    });
    this.pickerService.getSchedulesFromDB(this.studyTitle)
      .subscribe(schedule => {
        console.log(schedule);
        // this.schedules = schedule.schedules;
        // console.log(this.schedules);
      });
  }

}
