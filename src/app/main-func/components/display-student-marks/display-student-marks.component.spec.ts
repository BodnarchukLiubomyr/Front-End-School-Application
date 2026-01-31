import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayStudentMarksComponent } from './display-student-marks.component';

describe('DisplayStudentMarksComponent', () => {
  let component: DisplayStudentMarksComponent;
  let fixture: ComponentFixture<DisplayStudentMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayStudentMarksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayStudentMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
