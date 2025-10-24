import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDayComponent } from './delete-day.component';

describe('DeleteDayComponent', () => {
  let component: DeleteDayComponent;
  let fixture: ComponentFixture<DeleteDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
