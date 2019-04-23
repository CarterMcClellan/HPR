import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStudiesComponent } from './my-studies.component';

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

describe('MyStudiesComponent', () => {
  let component: MyStudiesComponent;
  let fixture: ComponentFixture<MyStudiesComponent>;

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
      declarations: [ MyStudiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
