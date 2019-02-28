import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent {
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
  constructor(private router: Router) {
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
          label: 'Home',
          link: './user',
          index: 2
        },

    ];
}
/**
  * Initialize user specific variables, note that this is all dependends on
  * the authentication status of the user
  *
  *  @returns void
  */
ngOnInit(): void {

  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
}
}
