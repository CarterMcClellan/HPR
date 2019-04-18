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

  ngOnInit() {

  }

}
