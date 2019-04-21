// this is file where we give an interface (should be identical to what we have specified on the backend)
// to describe the data which we are getting on a given http get
import { FormGroup } from '@angular/forms';
export interface Scheduler {
  id: string;
  openings: string[];
  study_title: string;
  user_email: string;
};
