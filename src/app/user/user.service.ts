import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private token: string;
  private status: string;
  private email: string;

  private userStatus = new Subject<{token: string, status: string, email: string}>();

  // inject private http var of type HttpClient
  constructor(private http: HttpClient) {}

  // whether the user is authenticated (True or False)
  getUserStatus() {
    return this.userStatus.asObservable();
  }

  getToken() {
    return this.token;
  }

  // whether the user is a admin, researcher or participant
  getStatus() {
    return this.status;
  }

  getEmail(): string {
    return this.email;
  }

  setStatus(status) {
    this.status = status;
  }

  setEmail(email) {
    this.email = email;
  }

  setToken(token){
    this.token = token;
  }
  // this functionality is only relevant for the researcher view as they are the only class which is
  // given the privelege to add participants to the study
  addUsers(email, password, authentication) {
    const user_obj: User = { id: null , email: email, password: password, authentication: authentication};
    console.log(user_obj);
    this.http.post('http://localhost:3000/signup', user_obj)
      .subscribe((responseData) => {
          console.log(responseData);
      });
  }

  // this functionality is only relevant for the researcher view as they are the only class which is
  // given the privelege to add participants to the study
  login(email, password, authentication) {
    const user_obj: User = { id: null , email: email, password: password, authentication: authentication};
    this.email = email;
    this.http.post<{token: string, status: string, email: string}>('http://localhost:3000/login', user_obj)
      .subscribe((responseData) => {
        const temp = responseData;
        this.token = temp.token;
        this.status = temp.status;
        this.userStatus.next(temp);
      });
  }

  logout(){
    this.token = null;
    this.status = null;
    this.email = null;
    this.userStatus.next({token: "", status: "", email: ""});
  }


}
