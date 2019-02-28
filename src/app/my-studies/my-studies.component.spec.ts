import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStudiesComponent } from './my-studies.component';

describe('MyStudiesComponent', () => {
  let component: MyStudiesComponent;
  let fixture: ComponentFixture<MyStudiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
