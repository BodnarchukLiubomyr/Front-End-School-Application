import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetClassMarksComponent } from './get-class-marks.component';

describe('GetClassMarksComponent', () => {
  let component: GetClassMarksComponent;
  let fixture: ComponentFixture<GetClassMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetClassMarksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetClassMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
