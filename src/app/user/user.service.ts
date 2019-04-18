import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();

  // inject private http var of type HttpClient
  constructor(private http: HttpClient) {}

  getUsersUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  // this functionality is only relevant for the researcher view as they are the only class which is
  // given the privelege to add participants to the study
  login(email, password, authentication) {
    const user_obj: User = { id: null , email: email, password: password, authentication: authentication};
    console.log(user_obj);
    this.http.post<{message: string}>('http://localhost:3000/login', user_obj)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  // this functionality is only relevant for the researcher view as they are the only class which is
  // given the privelege to add participants to the study
  addUsers(email, password, authentication) {
    const user_obj: User = { id: null , email: email, password: password, authentication: authentication};
    console.log(user_obj);
    this.http.post<{message: string}>('http://localhost:3000/signup', user_obj)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.users.push(user_obj);
        this.usersUpdated.next([...this.users]);
      });
  }
}
