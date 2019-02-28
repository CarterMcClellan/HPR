import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

/**
 * ### Initialization
 * User Component can be represented using the following tag
 *
 * ```html
 * <app-user></app-user>
 * ```
 * The Component can be intialized using
 * ```typescript
 * const instance = new UserComponent();
 * ```
 */
export class UserComponent implements OnInit {
  /**
  * email should be set on initialization,
  * should not be possible to have an email
  * with a suffix other than @wisc.edu
  */
  email = "bob.schultz@wisc.edu";

  /**
  * password should correspond to each of
  * the given user emails, should be longer
  * than 8 characters in addition to symbols
  * and numbers
  */
  password =  "frogs";

  /**
  * name can be either assigned in the sign up
  * process or configured from the email address
  */
  name= "bob";

  /**
  * authentication status can either be a participant,
  * researcher, or admin each with differing CRUD priveleges
  */
  authentication_status="";

  /**
  * languages serves as a key identifier for the study
  * as certain research projects can require native
  * or non-native speakers
  */
  language="";

  /**
  * user age optionally could be validated for spam, users
  * entering illegal ages could be flagged as participants
  */
  age="";

  /**
   * again like language serves as a potential exclusionary
   * factor with certain kinds of studies
   */
  school_year="";
  constructor() { }

  /**
  * Initialize user specific variables, note that this is all dependends on
  * the authentication status of the user
  *
  *  @returns void
  */
  ngOnInit() {
    this.email = ""
    this.password = ""
    this.name = ""
    this.authentication_status = ""
    this.language = ""
    this.age = ""
    this.school_year = ""
  }

  /**
  * Reponsible for parsing all input provided, and filtering down all content
  * @returns boolean if the input text is already valid
  */
  validateInput() {
    return '';
  }

}
