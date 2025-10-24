import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDayLessonsForAdminComponent } from './get-day-lessons-for-admin.component';

describe('GetDayLessonsForAdminComponent', () => {
  let component: GetDayLessonsForAdminComponent;
  let fixture: ComponentFixture<GetDayLessonsForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetDayLessonsForAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetDayLessonsForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
