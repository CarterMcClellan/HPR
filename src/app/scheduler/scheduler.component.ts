import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

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
  start_date = "Sat Apr 20 2019 00:00:00 GMT-0700";
  end_date = "Sat Apr 27 2019 00:00:00 GMT-0700";
  interval: number;
  delta: number;
  interestFormGroup : FormGroup;

  timeSeries: Tile[];

  constructor( private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.delta = this.calcDelta();
    this.interval = .5;
    this.timeSeries = this.generateTimeseries();
    this.interestFormGroup = this.formBuilder.group({
      interests: this.formBuilder.array([])
    });
  }

  calcDelta() {
    var as_date_start = new Date(this.start_date);
    var as_date_end = new Date(this.end_date);
    var start_date = as_date_start.getDate();
    var end_date = as_date_end.getDate();

    var delta = end_date - start_date;

    if (delta < 0){
      console.log("date overlap occurs at the end of the month #TODO");
    }
    else {
      return delta;
    }
  }

  generateTimeseries() {
    var tiles = [];
    for(var j=0; j < 7; j+=this.interval){
      for(var i=0; i < this.delta; i++){
        tiles.push({cols: 1, rows: 1, text: "Day " + i.toString() + " : " + "hour " + j.toString() });
      }
    }
    return tiles;
  }

  selectTime(event){
    console.log(event);
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
    console.log(this.interestFormGroup.value);
  }
}
