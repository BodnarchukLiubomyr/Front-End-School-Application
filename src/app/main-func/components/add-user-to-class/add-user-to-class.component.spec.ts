import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToClassComponent } from './add-user-to-class.component';

describe('AddUserToClassComponent', () => {
  let component: AddUserToClassComponent;
  let fixture: ComponentFixture<AddUserToClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserToClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUserToClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
