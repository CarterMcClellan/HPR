// this is file where we give an interface (should be identical to what we have specified on the backend)
// to describe the data which we are getting on a given http get
export interface PartStudies {
  id: string;

  title: string;

  participants: string[];

}
