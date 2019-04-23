import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from '../user/user.service';

import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})

export class HeaderComponent implements OnInit, OnDestroy {
  userStatus = "";
  email = "";
  private userStatusSub: Subscription;
  /**
   * title of router for reference later
   */
  title = 'angular-material-tab-router';

  /**
   * holds all route options
   */
  navLinks: any[];

  /**
   * holds the index of the current route
   */
  activeLinkIndex = -1;

  /**
   * sets all of the router links created
   * in the app-routing.module.ts
   */
  constructor(public userService: UsersService, private router: Router) {
    this.navLinks = [
      {
            label: 'Studies',
            link: './studies',
            index: 0
        }, {
            label: 'My Studies',
            link: './mystudies',
            index: 1
        },{
          label: 'Login',
          link: './login',
          index: 2
      },{
        label: 'Register',
        link: './signup',
        index: 3
      },

    ];
}
/**
  * Initialize user specific variables, note that this is all dependends on
  * the authentication status of the user
  *
  *  @returns void
  */
ngOnInit(){
  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
  this.userStatusSub = this.userService.getUserStatus()
  .subscribe( response => {
    this.userStatus = response.status;
    this.email = response.email;
  })
}

ngOnDestroy(){
  this.userStatusSub.unsubscribe();
}

onLogout() {
  this.userService.logout();
}

}
