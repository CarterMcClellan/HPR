import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// all of these forms will be used to process the registration and login process'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// all of these angular material components will be used stylize the front end
import {MatTabsModule,
  MatTableModule,
  MatCardModule,
  MatDividerModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatGridListModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule } from '@angular/material';

// these are all the components which we have defined in our project ourselves
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';

import { StudiesListComponent } from './studies/studies-list/studies-list.component';
import { StudiesCreateComponent } from './studies/studies-create/studies-create.component';
import { StudiesComponent } from './studies/studies.component';

import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { UserInterceptor } from './user/user.interceptor';

import { MyStudiesComponent } from './my-studies/my-studies.component';

import { AppRoutingModule } from './app-routing.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SchedulerComponent } from './scheduler/scheduler.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudiesComponent,
    StudiesListComponent,
    StudiesCreateComponent,
    UserComponent,
    MyStudiesComponent,
    LoginComponent,
    SignupComponent,
    SchedulerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  exports: [
    MatToolbarModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

