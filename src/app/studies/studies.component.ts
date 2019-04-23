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
  private userStatusSub: Subscription;

  constructor(public studiesService: StudiesService, public userService: UsersService) {}

  ngOnInit() {
    this.userStatusSub = this.userService.getUserStatus()
    .subscribe( response => {
      this.email = response.email;
    });
  }

}
