import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiesListComponent } from './studies-list/studies-list.component';

import {MatTabsModule,
  MatTableModule,
  MatCardModule,
  MatDividerModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatGridListModule,
  MatExpansionModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

describe('StudiesListComponent', () => {
  let component: StudiesListComponent;
  let fixture: ComponentFixture<StudiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
        HttpClientModule
      ],
      declarations: [ StudiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
