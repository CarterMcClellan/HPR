import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StudiesComponent } from './studies/studies.component';
import { StudiesListComponent } from './studies/studies-list/studies-list.component';
import { StudiesCreateComponent } from './studies/studies-create/studies-create.component';
import { MyStudiesComponent } from './my-studies/my-studies.component';
import { LoginComponent } from './user/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterTestingModule } from '@angular/router/testing';

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
  MatCheckboxModule} from '@angular/material';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// all of these forms will be used to process the registration and login process'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterTestingModule,
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
      declarations: [
        AppComponent,
        HeaderComponent,
        StudiesComponent,
        StudiesListComponent,
        StudiesCreateComponent,
        MyStudiesComponent,
        LoginComponent,
      ],
      providers: []
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('HPR');
  }));
});
