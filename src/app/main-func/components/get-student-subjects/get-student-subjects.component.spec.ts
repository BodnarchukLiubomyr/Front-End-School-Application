import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStudentSubjectsComponent } from './get-student-subjects.component';

describe('GetStudentSubjectsComponent', () => {
  let component: GetStudentSubjectsComponent;
  let fixture: ComponentFixture<GetStudentSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetStudentSubjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetStudentSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
