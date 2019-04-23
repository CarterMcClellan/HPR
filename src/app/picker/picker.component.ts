import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user/user.service'
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
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

  interestFormGroup : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UsersService,
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
      .subscribe(schedules => {
        this.schedules = schedules.schedules;

        this.interestFormGroup = this.formBuilder.group({
          interests: this.formBuilder.array([])
        });
      });
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
    const openings = [];
    for(var i=0; i < this.interestFormGroup.value.interests.length; i++){
      const val = "|"  + this.interestFormGroup.value.interests[i].user_email + "|" + this.interestFormGroup.value.interests[i].openings;
      openings.push(val);
    }
    this.pickerService.writeStudyToDB(openings, this.studyTitle);
  }

}
