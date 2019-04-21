import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scheduler } from './scheduler.model';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { Studies } from '../studies/studies.model';

@Injectable({
  providedIn: 'root'
})

export class SchedulerService {
  // inject private http var of type HttpClient
  constructor(private http: HttpClient) {}

  getStudyFromDB(studyTitle) : Observable<{message: string, studies: Studies}>{
    const study_obj: Studies = { id: null , title: studyTitle , description: null, start_time: null, end_time: null, approval: null};
    return this.http.post<{message: string, studies: Studies}>('http://localhost:3000/oneStudy', study_obj);
  }
/*
  writeScheduleToDB(openings: string[], study_title: string, user_email: string){
    // const schedule_obj: Scheduler = {id : null, openings: openings, study_title: study_title, user_email: user_email};
    const schedule_obj: Scheduler = {id : null, study_title: study_title, user_email: user_email};
    console.log(schedule_obj);
    return this.http.post<{message: string}>('http://localhost:3000/tempTest', schedule_obj);
  }*/

  writeScheduleToDB(openings: string[], studyTitle: string, userEmail: string){
    const scheduleObj: Scheduler = { id: null, openings: openings, study_title: studyTitle, user_email: userEmail};
    return this.http.post<{message: string}>('http://localhost:3000/scheduler', scheduleObj)
      .subscribe((responseData) => {
        console.log(responseData.message);
      });

  }
}
