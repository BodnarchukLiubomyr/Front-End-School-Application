import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTestResultComponent } from './get-test-result.component';

describe('GetTestResultComponent', () => {
  let component: GetTestResultComponent;
  let fixture: ComponentFixture<GetTestResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetTestResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
