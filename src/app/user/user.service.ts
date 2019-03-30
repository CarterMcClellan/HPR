import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudiesService {
  private user: User[] = [];
  private studiesUpdated = new Subject<User[]>();

  // inject private http var of type HttpClient
  constructor(private http: HttpClient) {}

  onRegister(email: string, password: string, authentication: string) {
    const userObj : User = {id: null, email: email, password : password, authentication : authentication};
    this.http.post<{message: string}>('http://localhost:3000/user', userObj)
      .subscribe( (res) => {
        console.log(res)
    });
  };

  onLogin(email: string, password: string) {
    const userObj : User = {id: null, email: email, password : password, authentication: null};
    this.http.post<{message: string}>('http://localhost:3000/user', userObj)
      .subscribe( (res) => {
        console.log(res)
    });
  };


}
