import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { idText } from 'typescript';

@Injectable()

export class ApiService {

constructor(private http: HttpClient, private route: Router){}

messages: Message[] = []
users: Message[] = []
TOKEN_KEY = 'token'


path = 'http://localhost:3000';
authPath = 'http://localhost:3000/auth';



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



  sendUserRegistration(regData) {
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


loginUser(loginData) {
  this.http.post<any>(this.authPath + '/login', loginData).subscribe(res =>{
      console.log(res);
      localStorage.setItem(this.TOKEN_KEY, res.token)
      if(this.isAuthenticated){
          this.route.navigateByUrl("/")
      }else{
          console.log("Registration Failed")
      }   
  })
};
}