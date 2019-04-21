import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Studies } from './studies.model';
import { Subject } from 'rxjs';

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

export class StudiesService {
  private studies: Studies[] = [];
  private studiesUpdated = new Subject<Studies[]>();

  // inject private http var of type HttpClient
  constructor(private http: HttpClient) {}

  // send http request to the backend
  // (this is using the angular http client module)
  // see: https://angular.io/api/common/http/HttpClientModule
  // TODO: add error handling
  getStudies() {
    this.http.get<{message: string, studies: Studies[]}>('http://localhost:3000/studies')
      .subscribe( (studyData) => {
        console.log(studyData);
        this.studies = studyData.studies; // store locally
        this.studiesUpdated.next([...this.studies]); // copy it so it can't be modified in this subscription
      });
  }

  getStudiesUpdateListener() {
    return this.studiesUpdated.asObservable();
  }

  // this functionality is only relevant for the researcher view as they are the only class which is
  // given the privelege to add participants to the study
  addStudies(title: string, description: string, start_time: string, end_time: string) {
    const study_obj: Studies = { id: null , title: title , description: description, start_time: start_time, end_time: end_time, approval: null};
    this.http.post<{message: string}>('http://localhost:3000/studies', study_obj)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.studies.push(study_obj);
        this.studiesUpdated.next([...this.studies]);
      });
  }
}
