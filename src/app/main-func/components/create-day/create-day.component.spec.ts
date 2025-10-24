import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDayComponent } from './create-day.component';

describe('CreateDayComponent', () => {
  let component: CreateDayComponent;
  let fixture: ComponentFixture<CreateDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
