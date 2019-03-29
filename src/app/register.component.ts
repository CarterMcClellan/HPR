import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'register',
  template: `
  <mat-card>
  <mat-card-header>
  <mat-card-title>
  <h3> Register Yourself </h3>
  </mat-card-title>
  </mat-card-header>
  <mat-card-content>
</mat-card-content>
</mat-card>
  `,
  
})
export class RegisterComponent {

    registerData = {}

    constructor(private apiService: ApiService){}
    Post(){
        this.apiService.sendUserRegistration(this.registerData);
    }
}
