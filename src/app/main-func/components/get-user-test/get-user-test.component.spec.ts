import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserTestComponent } from './get-user-test.component';

describe('GetUserTestComponent', () => {
  let component: GetUserTestComponent;
  let fixture: ComponentFixture<GetUserTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetUserTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetUserTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
