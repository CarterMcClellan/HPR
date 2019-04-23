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
        this.timeSeries = this.generateTimeseries(delta, interval);
        this.interestFormGroup = this.formBuilder.group({
          interests: this.formBuilder.array([])
        });
      });
  }

  calcDelta(start_date, end_date) {
    var as_date_start = new Date(start_date);
    var as_date_end = new Date(end_date);
    var s_date = as_date_start.getDate();
    var e_date = as_date_end.getDate();

    var delta = e_date - s_date;

    if (delta < 0){
      console.log("date overlap occurs at the end of the month #TODO");
    } else {
      return delta;
    }
  }

  generateTimeseries(delta, interval) {
    console.log(delta);
    var tiles = [];
    for(var j=0; j < 7; j+=interval){
      for(var i=1; i < delta+1; i++){
        tiles.push({cols: 1, rows: 1, text: "Day " + i.toString() + " : " + "hour " + j.toString() });
      }
    }
    return tiles;
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

    for(var i=0; i < this.interestFormGroup.value.interests.length; i++){
      all_days.push(this.interestFormGroup.value.interests[i].text);
    }

    this.schedulerService.writeScheduleToDB(all_days, this.studyTitle, this.email);
  }
}
