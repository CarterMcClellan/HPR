// this is file where we give an interface (should be identical to what we have specified on the backend)
// to describe the data which we are getting on a given http get
export interface MyStudies {
  id: string,
  /**
  * title of the study being offered,
  * could potentially need to dynamically
  * scale font size depending on length of
  * title
  */
  title: string,

   /**
  * not sure what this is akshat threw
  * it in his mock up
  */
  study: string,

  /**
  * overall description of the study
  */
  description: string,

  /**
  * listed timeslots/ researcher availbility
  * this can be set as a property or chosen via
  * the calendar application
  */
  time: string,

  approval: string,

  creator: string
}
