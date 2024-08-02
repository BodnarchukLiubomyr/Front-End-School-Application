import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSubjectsComponent } from './get-subjects.component';

describe('GetSubjectsComponent', () => {
  let component: GetSubjectsComponent;
  let fixture: ComponentFixture<GetSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetSubjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
