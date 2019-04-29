import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { MyStudies } from './my-studies.model';
import { PartStudies } from '../picker/part-studies.model';

@Injectable({
  providedIn: 'root'
})

// pretty much everything working with angular and node
// is going to work in the following steps
// 1) reach out to the backend
// 2) fetch the studies
// 3) store them in the studies list
// 4) set the update listener to inform all the other
// angular components (eg the studies component)
// that new studies have been recieved

export class MyStudiesService {
  private curr_studies: MyStudies[] = [];
  private past_studies: MyStudies[] = [];
  private curr_part_studies: PartStudies[] = [];
  private slots: string[] = [];
  private titles: string[] = [];

  private pastStudiesUpdated = new Subject<MyStudies[]>();
  private currStudiesUpdated = new Subject<MyStudies[]>();
  private currPartStudiesUpdated = new Subject<PartStudies[]>();

  private slotsUpdated = new Subject<string[]>();
  private titlesUpdated = new Subject<string[]>();


  // inject private http var of type HttpClient
  constructor(private http: HttpClient) {}

  // send http request to the backend
  // this should only be used for researchers
  getPastStudies() {
    this.http.get<{message: string, curr_studies: MyStudies[], past_studies: MyStudies[]}>('http://localhost:3000/my-studies')
      .subscribe( (studyData) => {
        this.past_studies = studyData.past_studies; // store locally
        this.pastStudiesUpdated.next([...this.past_studies]); // copy it so it can't be modified in this subscription
      });
  }

  // send http request to the backend
  // this should only be used for researchers
  getCurrStudies() {
    this.http.get<{message: string, curr_studies: MyStudies[], past_studies: MyStudies[]}>('http://localhost:3000/my-studies')
    .subscribe( (studyData) => {
      this.curr_studies = studyData.curr_studies; // store locally
      this.currStudiesUpdated.next([...this.curr_studies]); // copy it so it can't be modified in this subscription
    });
  }

  // send http request to the backend
  // this should only be used for participants
  getPartStudies() {
    this.http.get<{message: string, curr_studies: PartStudies[], past_studies: MyStudies[]}>('http://localhost:3000/partStudies')
    .subscribe( (studyData) => {
      this.curr_part_studies = studyData.curr_studies; // store locally
      this.currPartStudiesUpdated.next([...this.curr_part_studies]); // copy it so it can't be modified in this subscription
    });
  }

  postPartStudies(email) {
    console.log("Call Post Part Studies " + email);
    var email_obj = { email: email };
    this.http.post<{message: string, slots: string[], titles: string[]}>('http://localhost:3000/partStudiesPost', email_obj)
      .subscribe( (response) => {
        this.slots = response.slots;
        console.log(this.slots);
        this.slotsUpdated.next([...this.slots]);
        this.titles = response.titles;
        this.titlesUpdated.next([...this.titles]);
      });
  }

  getPastStudiesUpdateListener() {
    return this.pastStudiesUpdated.asObservable();
  }

  getCurrStudiesUpdateListener() {
    return this.currStudiesUpdated.asObservable();
  }

  getCurrPartStudiesUpdateListener() {
    return this.currPartStudiesUpdated.asObservable();
  }

  getSlotsUpdateListener() {
    return this.slotsUpdated.asObservable();
  }

  getTitlesUpdateListener() {
    return this.titlesUpdated.asObservable();
  }
}
