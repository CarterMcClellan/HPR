import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Studies } from "../studies.model";
import { StudiesService } from "../studies.service";

@Component({
  selector: 'app-studies-list',
  templateUrl: './studies-list.component.html',
  styleUrls: ['./studies-list.component.css']
})

export class StudiesListComponent implements OnInit {
  studies: Studies[] = [];
  private postsSub: Subscription;

  constructor(public studiesService: StudiesService) {}

  ngOnInit() {
    this.studiesService.getStudies();
    this.postsSub = this.studiesService.getStudiesUpdateListener()
      .subscribe((studies: Studies[]) => {
        this.studies = studies;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
