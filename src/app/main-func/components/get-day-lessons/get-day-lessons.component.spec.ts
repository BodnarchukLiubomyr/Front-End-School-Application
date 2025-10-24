import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDayLessonsComponent } from './get-day-lessons.component';

describe('GetDayLessonsComponent', () => {
  let component: GetDayLessonsComponent;
  let fixture: ComponentFixture<GetDayLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetDayLessonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetDayLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
