import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMessageComponent } from './update-message.component';

describe('UpdateMessageComponent', () => {
  let component: UpdateMessageComponent;
  let fixture: ComponentFixture<UpdateMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
