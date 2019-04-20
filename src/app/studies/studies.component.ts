import { Component, OnInit } from '@angular/core';
import { StudiesService } from './studies.service';
import { UsersService } from '../user/user.service';


@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit {
  email: string;
  status: string;

  constructor(public studiesService: StudiesService, public userService: UsersService) {}

  ngOnInit() {
    try {
      this.email = this.userService.getEmail();
      this.status = this.userService.getStatus();
    } catch (err){
      console.log(err);
    }
  }
}
