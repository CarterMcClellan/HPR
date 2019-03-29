import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { idText } from 'typescript';


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

  constructor(private http: HttpClient, private route: Router){}

  /**
  * Initialize user specific variables, note that this is all dependends on
  * the authentication status of the user
  *
  *  @returns void
  */
  ngOnInit() {
  }

  /**
  * Reponsible for parsing all input provided, and filtering down all content
  * @returns boolean if the input text is already valid
  */
  validateInput() {
    return '';
  }

  path = 'http://localhost:3000';
  authPath = 'http://localhost:3000/auth';
  messages: Message[] = []
  users: Message[] = []
  TOKEN_KEY = 'token'

  onRegister(regData) {
    this.http.post<any>(this.authPath + '/register', regData).subscribe(res =>{
        console.log(res)
        localStorage.setItem(this.TOKEN_KEY, res.token)
        if(this.isAuthenticated){
            this.route.navigateByUrl("/")
        }else{
            console.log("Registration Failed")
        }
    })
  }

  onLogin(loginData) {
    this.http.post<any>(this.authPath + '/login', loginData).subscribe(res =>{
        console.log(res);
        localStorage.setItem(this.TOKEN_KEY, res.token)
        if(this.isAuthenticated){
            this.route.navigateByUrl("/")
        }else{
            console.log("Registration Failed")
        }
    })
  }

  getMessage(userId){
    this.http.get<any>(this.path +'/posts/'+userId).subscribe(res =>{
    this.messages = res;
    })
  }

  get token(){
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated(){
    return !!localStorage.getItem(this.TOKEN_KEY)
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
  }

}
