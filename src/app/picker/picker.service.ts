import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Scheduler } from '../scheduler/scheduler.model';
import { Studies } from '../studies/studies.model';
import { PartStudies } from './part-studies.model';


@Injectable({
  providedIn: 'root'
})

export class PickerService {
  // inject private http var of type HttpClient
  constructor(private http: HttpClient) {}

  getSchedulesFromDB(studyTitle) : Observable<{message: string, schedules: Scheduler[]}>{
    const study_obj: Studies = { id: null , title: studyTitle , description: null, start_time: null, end_time: null, approval: null};
    return this.http.post<{message: string, schedules: Scheduler[]}>('http://localhost:3000/allSchedule', study_obj);
  }

  writeStudyToDB(participants, studyTitle){
    const study_obj: PartStudies = { id: null, title: studyTitle, participants: participants};
    return this.http.post<{message: string}>('http://localhost:3000/partStudies', study_obj)
    .subscribe((responseData) => {
      console.log(responseData.message);
    });
  }
}
