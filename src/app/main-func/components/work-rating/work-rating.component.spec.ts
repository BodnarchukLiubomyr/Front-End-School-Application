import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkRatingComponent } from './work-rating.component';

describe('WorkRatingComponent', () => {
  let component: WorkRatingComponent;
  let fixture: ComponentFixture<WorkRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkRatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
