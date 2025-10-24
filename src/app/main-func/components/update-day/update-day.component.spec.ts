import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDayComponent } from './update-day.component';

describe('UpdateDayComponent', () => {
  let component: UpdateDayComponent;
  let fixture: ComponentFixture<UpdateDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
