import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTestsComponent } from './get-tests.component';

describe('GetTestsComponent', () => {
  let component: GetTestsComponent;
  let fixture: ComponentFixture<GetTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetTestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
