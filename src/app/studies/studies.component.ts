import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit {
  /**
  * this is just a placeholder variable
  * until the backend is configured,
  * ignore
  */
  studies = [
    { title: "Study Title", study: "Not Sure", description: "TBD", time: "TBD"},
    { title: "Study Title 2", study: "Not Sure", description: "TBD", time: "11-12"},
    { title: "Study Title 3", study: "The Study of Stuff", description: "Eating Frogs", time: "TBD"},
 ];

  /**
  * title of the study being offered,
  * could potentially need to dynamically
  * scale font size depending on length of
  * title
  */
  title = "";

  /**
  * not sure what this is akshat threw
  * it in his mock up
  */
  study = "";

  /**
  * overall description of the study
  */
  description = "";

  /**
  * listed timeslots/ researcher availbility
  * this can be set as a property or chosen via
  * the calendar application
  */
  time = "";
  constructor() { }

  ngOnInit() {
  }

}
