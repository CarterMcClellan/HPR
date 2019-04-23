import { Component, OnInit } from '@angular/core';
import { StudiesService } from './studies.service';
import { UsersService } from '../user/user.service';

import { Subscription } from 'rxjs';



@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit {
  email: string;
  status: string;
  private userStatusSub: Subscription;

  constructor(public studiesService: StudiesService, public userService: UsersService) {}

  ngOnInit() {
    this.status = this.userService.getStatus();
    this.userStatusSub = this.userService.getUserStatus()
    .subscribe( response => {
      this.status = response.status;
      this.email = response.email;
    });
  }

}
