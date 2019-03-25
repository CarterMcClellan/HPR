import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-studies',
  templateUrl: './my-studies.component.html',
  styleUrls: ['./my-studies.component.css']
})
export class MyStudiesComponent implements OnInit {
  /**
  * this is just a placeholder variable
  * until the backend is configured,
  * @ignore
  */
  past_studies = [
    { title: "Study Title", study: "Not Sure", description: "TBD", time: "TBD", approval: "Approved" },
    { title: "Study Title 2", study: "Not Sure", description: "TBD", time: "11-12", approval: "Not Approved" },
    { title: "Study Title 3", study: "The Study of Stuff", description: "Eating Frogs", time: "TBD", approval: "TBD" },
    { title: "Study Title", study: "Not Sure", description: "TBD", time: "TBD", approval: "Approved" },
    { title: "Study Title 2", study: "Not Sure", description: "TBD", time: "11-12", approval: "Not Approved" },
    { title: "Study Title 3", study: "The Study of Stuff", description: "Eating Frogs", time: "TBD", approval: "TBD" },
    { title: "Study Title", study: "Not Sure", description: "TBD", time: "TBD", approval: "Approved" },
    { title: "Study Title 2", study: "Not Sure", description: "TBD", time: "11-12", approval: "Not Approved" },
    { title: "Study Title 3", study: "The Study of Stuff", description: "Eating Frogs", time: "TBD", approval: "TBD" },
    { title: "Study Title", study: "Not Sure", description: "TBD", time: "TBD", approval: "Approved" },
    { title: "Study Title 2", study: "Not Sure", description: "TBD", time: "11-12", approval: "Not Approved" },
    { title: "Study Title 3", study: "The Study of Stuff", description: "Eating Frogs", time: "TBD", approval: "TBD" }
 ];
 
/**
  * this is just a placeholder variable
  * until the backend is configured,
  * @ignore
  */
 curr_studies = [
  { title: "Study Title", study: "Not Sure", description: "TBD", time: "TBD", approval: "Approved" },
  { title: "Study Title 2", study: "Not Sure", description: "TBD", time: "11-12", approval: "Not Approved" },
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

/**
  * Initialize user specific variables, note that this is all dependends on
  * the authentication status of the user
  *
  *  @returns void
  */
  ngOnInit() {
  }

}
