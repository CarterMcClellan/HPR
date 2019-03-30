import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { MyStudies } from './my-studies.model';
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
  private pastStudiesUpdated = new Subject<MyStudies[]>();
  private currStudiesUpdated = new Subject<MyStudies[]>();


  // inject private http var of type HttpClient
  constructor(private http: HttpClient) {}

  // send http request to the backend
  // (this is using the angular http client module)
  // see: https://angular.io/api/common/http/HttpClientModule
  // TODO: add error handling, use more dynamic solution for localhost
  getPastStudies() {
    this.http.get<{message: string, curr_studies: MyStudies[], past_studies: MyStudies[]}>('http://localhost:3000/my-studies')
      .subscribe( (studyData) => {
        this.past_studies = studyData.past_studies; // store locally
        this.pastStudiesUpdated.next([...this.past_studies]); // copy it so it can't be modified in this subscription
      });
  }

  getCurrStudies() {
    this.http.get<{message: string, curr_studies: MyStudies[], past_studies: MyStudies[]}>('http://localhost:3000/my-studies')
    .subscribe( (studyData) => {
      this.curr_studies = studyData.curr_studies; // store locally
      this.currStudiesUpdated.next([...this.curr_studies]); // copy it so it can't be modified in this subscription
    });
  }

  getPastStudiesUpdateListener() {
    return this.pastStudiesUpdated.asObservable();
  }

  getCurrStudiesUpdateListener() {
    return this.currStudiesUpdated.asObservable();
  }
}
