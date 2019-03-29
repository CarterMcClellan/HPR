import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'login',
  template: `
  <mat-card>
  <mat-card-header>
  <mat-card-title>
  <h3> Log In with Registered Credentials </h3>
  </mat-card-title>
  </mat-card-header>
  <mat-card-content>
</mat-card-content>
</mat-card>
  `,
  
})
export class LoginComponent {

    loginData = {}

    constructor(private apiService: ApiService){}
    Post(){
        this.apiService.loginUser(this.loginData);
    }
}
