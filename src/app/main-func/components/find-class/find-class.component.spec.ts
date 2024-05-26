import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindClassComponent } from './find-class.component';

describe('FindClassComponent', () => {
  let component: FindClassComponent;
  let fixture: ComponentFixture<FindClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
