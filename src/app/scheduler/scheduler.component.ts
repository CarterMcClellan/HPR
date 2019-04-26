import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SchedulerService } from './scheulder.service';
import { Studies } from '../studies/studies.model';
import { UsersService } from '../user/user.service';

export interface Tile {
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})

export class SchedulerComponent implements OnInit {
  oneStudy: Studies;
  timeSeries: Tile[];
  studyTitle : string;
  delta: number;
  email: string;

  start_number: number;
  end_number: number;

  routeSub : Subscription;
  interestFormGroup : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private schedulerService: SchedulerService,
    public userService: UsersService) { }

  ngOnInit() {
    this.email = this.userService.getEmail();
    // recieve the title of the selected study
    this.routeSub = this.route.queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.studyTitle = params['study'] || "";
    });
    this.schedulerService.getStudyFromDB(this.studyTitle)
      .subscribe(oneStudy => {
        this.oneStudy = oneStudy.studies;
        const start_date = this.oneStudy.start_time;
        const end_date = this.oneStudy.end_time;
        const delta = this.calcDelta(start_date, end_date);
        this.delta = delta;
        const interval = .5;
        this.timeSeries = this.generateTimeseries(start_date, end_date, delta, interval);
        this.interestFormGroup = this.formBuilder.group({
          interests: this.formBuilder.array([])
        });
      });
  }

  calcDelta(start_date, end_date) {
    const as_date_start = new Date(start_date);
    const as_date_end = new Date(end_date);

    const diffTime = Math.abs(as_date_end.getTime() - as_date_start.getTime());
    const delta = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (delta < 0){
      console.log("date overlap occurs at the end of the month #TODO");
    } else {
      return delta;
    }
  }

  generateTimeseries(start_date, end_date, delta, interval) {
    var tiles = [];
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    var startDay = new Date(start_date);
    var currentDay = new Date(start_date);
    var currentHour = new Date("Sat Apr 20 2019 09:00:00 GMT-0700"); // could be any day with hours, minutes = 0

    for ( var j=0; j < 10; j+=interval) {
      for ( var i=startDay.getDay(); i < delta + startDay.getDay(); i++) {
        tiles.push({cols: 1, rows: 1, text: days[i] + " , " + this.formatAMPM(currentHour) });
        currentDay.setDate(currentDay.getDay() + 1);
      }
      currentHour.setTime(currentHour.getTime() + (1/2*60*60*1000));
    }
    return tiles;
  }

  formatAMPM(date){
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  onChange(event) {
    const interests = <FormArray>this.interestFormGroup.get('interests') as FormArray;

    if(event.checked) {
      interests.push(new FormControl(event.source.value))
    } else {
      const i = interests.controls.findIndex(x => x.value === event.source.value);
      interests.removeAt(i);
    }
  }

  submit() {
    const all_days = [];
    if (this.interestFormGroup.value.interests.length !== 0) {
      for (var i=0; i < this.interestFormGroup.value.interests.length; i++) {
        all_days.push(this.interestFormGroup.value.interests[i].text);
      }
      this.schedulerService.writeScheduleToDB(all_days, this.studyTitle, this.email);
    } else {
      console.log("Please choose at least one schedule");
    }
  }
}
